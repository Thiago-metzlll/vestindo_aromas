/**
 * Utilitário para buscar dados do Google Sheets
 * A aba deve estar "Publicada na Web" como CSV
 */

// Em produção usa o proxy da Vercel para evitar CORS.
// Em desenvolvimento local acessa diretamente (sem restrições de CORS).
const isDev = import.meta.env.DEV;

const buildFetchUrl = (sheetUrl) => {
    if (isDev) {
        // Dev: acesso direto com cache-busting
        return `${sheetUrl}${sheetUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`;
    }
    // Produção: passa pelo proxy serverless da Vercel
    return `/api/sheet?url=${encodeURIComponent(sheetUrl)}`;
};

export const fetchGoogleSheetData = async (sheetUrl) => {
    if (!sheetUrl) return [];
    try {
        const fetchUrl = buildFetchUrl(sheetUrl);
        console.log("Buscando dados em:", fetchUrl);

        const response = await fetch(fetchUrl, { cache: 'no-store' });

        // Se o Google redirecionou para login, a aba não está publicada publicamente
        if (response.url && response.url.includes('accounts.google.com')) {
            throw new Error('Planilha não está publicada publicamente. Vá em Arquivo → Compartilhar → Publicar na web → selecione "Documento inteiro".');
        }

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }


        const csvText = await response.text();

        // Divide linhas e remove \r residual do Windows
        const lines = csvText
            .split('\n')
            .map(l => l.replace(/\r$/, ''))
            .filter(l => l.trim() !== '');

        if (lines.length < 1) return [];

        // Detecta o separador (vírgula ou ponto-e-vírgula) baseado na primeira linha
        const firstLine = lines[0];
        const separator = firstLine.includes(';') && !firstLine.includes(',') ? ';' : ',';

        const firstCols = splitCsvLine(firstLine, separator);

        // Detecta se é planilha de CATEGORIAS (cabeçalho tem "id", "title" ou "titulo")
        const isCategories = firstCols.some(h => ['id', 'title', 'titulo', 'name', 'nome'].includes(h.toLowerCase().trim()));

        if (isCategories) {
            // Planilha de categorias: primeira linha = headers, demais = dados
            const headers = firstCols.map(h => h.toLowerCase().trim());
            return lines.slice(1).map(line => {
                const values = splitCsvLine(line, separator);
                const obj = {};
                headers.forEach((header, i) => {
                    if (header) {
                        // Mapeamento automático de 'nome'/'title'/'name'/'titulo' para facilitar
                        let normalizedHeader = header;
                        if (['name', 'nome', 'titulo'].includes(header)) {
                            normalizedHeader = 'title';
                        }
                        obj[normalizedHeader] = values[i] ?? '';
                    }
                });
                return obj;
            }).filter(item => item.id || item.title);
        } else {
            // Planilha de conteúdo: formato chave/valor
            return lines.map(line => {
                const cols = splitCsvLine(line, separator);

                // Encontra o primeiro índice que tem algo (chave)
                const chaveIdx = cols.findIndex(c => c && c.trim() !== '');
                if (chaveIdx === -1) return null;

                // O valor deve estar na próxima coluna
                let valorIdx = cols.findIndex((c, i) => i > chaveIdx && c && c.trim() !== '');
                if (valorIdx === -1) valorIdx = chaveIdx + 1;

                const chave = cols[chaveIdx]?.trim() || '';
                const valor = cols[valorIdx]?.trim() || '';

                // Ignora se for o cabeçalho "chave" ou se a chave estiver vazia
                if (['chave', 'key', 'id'].includes(chave.toLowerCase()) || chave === '') return null;

                return { chave, valor };
            }).filter(item => item !== null);
        }
    } catch (error) {
        console.error("Erro ao buscar dados do Google Sheets:", error);
        return [];
    }
};

/** Divide uma linha CSV respeitando campos entre aspas e suportando múltiplos separadores */
function splitCsvLine(line, separator = ',') {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            inQuotes = !inQuotes;
        } else if (ch === separator && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += ch;
        }
    }
    result.push(current.trim());
    return result;
}

/**
 * Converte uma lista de chave/valor em objeto estruturado para o site.
 * Suporta chaves simples (ex: name) ou objetos aninhados (ex: hero_title).
 */
export const parseGlobalContent = (data) => {
    const content = {};

    data.forEach(item => {
        if (!item.chave) return;

        const chave = item.chave.trim();
        const valor = item.valor.trim();

        // Tenta separar em seção_chave (ex: hero_title)
        const parts = chave.split('_');

        if (parts.length >= 2) {
            const section = parts[0];
            const key = parts.slice(1).join('_');

            if (!content[section]) content[section] = {};
            content[section][key] = valor;
        } else {
            // Chave simples (ex: name, title, tagline)
            content[chave] = valor;
        }
    });
    return content;
};

/**
 * Converte o objeto de conteúdo do site de volta para linhas chave/valor
 * para escrever na aba Conteudo da planilha
 */
export const contentToRows = (content) => {
    const rows = [];

    // Chaves raiz simples
    const rootKeys = ['name', 'title', 'tagline'];
    rootKeys.forEach(key => {
        if (content[key] !== undefined) {
            rows.push({ chave: key, valor: content[key] });
        }
    });

    // Seções aninhadas
    const sections = ['hero', 'about', 'contact'];
    sections.forEach(section => {
        if (!content[section]) return;
        Object.entries(content[section]).forEach(([key, value]) => {
            rows.push({ chave: `${section}_${key}`, valor: value });
        });
    });
    return rows;
};

/**
 * Envia dados para o Google Apps Script que escreve na planilha.
 */
export const writeToSheet = async (scriptUrl, type, rows) => {
    if (!scriptUrl) throw new Error('URL do Apps Script não configurada');

    await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ type, rows })
    });

    return true;
};
