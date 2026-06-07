/**
 * Vercel Serverless Function — proxy para Google Sheets CSV
 * Busca a planilha no servidor (sem restrições CORS) e repassa ao frontend.
 */
export default async function handler(req, res) {
    // Permite requisições do frontend (CORS para o próprio domínio)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Parâmetro "url" é obrigatório.' });
    }

    // Só permite URLs do Google Sheets para segurança
    if (!url.startsWith('https://docs.google.com/spreadsheets/')) {
        return res.status(403).json({ error: 'URL não permitida.' });
    }

    try {
        const response = await fetch(url, { redirect: 'follow' });

        // Se o Google redirecionou para login, a aba não está publicada
        if (response.url && response.url.includes('accounts.google.com')) {
            return res.status(403).json({
                error: 'Planilha não está publicada publicamente.',
                hint: 'Vá em Arquivo → Compartilhar → Publicar na web → selecione "Documento inteiro".'
            });
        }

        if (response.status === 401 || response.status === 403) {
            return res.status(403).json({
                error: `Google retornou ${response.status} — aba não está publicada publicamente.`,
                hint: 'No Google Sheets: Arquivo → Compartilhar → Publicar na web → "Documento inteiro" → Publicar.'
            });
        }

        if (!response.ok) {
            return res.status(response.status).json({ error: `Erro HTTP: ${response.status}` });
        }

        const csvText = await response.text();

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).send(csvText);
    } catch (err) {
        console.error('Erro no proxy de planilha:', err);
        return res.status(500).json({ error: err.message });
    }
}
