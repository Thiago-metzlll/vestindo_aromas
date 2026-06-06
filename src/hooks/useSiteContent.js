import { useState, useEffect } from 'react';
import { storeConfig as defaultContent } from '../data/storeConfig';
import { fetchGoogleSheetData, parseGlobalContent, writeToSheet, contentToRows } from '../services/googleSheets';

// Chave do cache de conteúdo no localStorage
const CONTENT_CACHE_KEY = 'vestindoAromasContentCache';
const CONFIG_CACHE_KEY = 'vestindoAromasSheetConfig';

// Utilitário para merge profundo de objetos simples
const deepMerge = (target, source) => {
    const output = { ...target };
    if (source && typeof source === 'object') {
        Object.keys(source).forEach(key => {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!(key in target)) {
                    output[key] = source[key];
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                output[key] = source[key];
            }
        });
    }
    return output;
};

export const useSiteContent = () => {
    const [content, setContent] = useState(() => {
        const savedConfigStr = localStorage.getItem(CONFIG_CACHE_KEY);
        const savedConfig = savedConfigStr ? JSON.parse(savedConfigStr) : {};

        // PRIORIDADE: usa o cache da última busca bem-sucedida para não exibir vazio após reload
        const cachedStr = localStorage.getItem(CONTENT_CACHE_KEY);
        const cachedContent = cachedStr ? (() => { try { return JSON.parse(cachedStr); } catch { return null; } })() : null;

        // Base: conteúdo em cache (se existir) ou os defaults do storeConfig.js
        const base = cachedContent || defaultContent;

        return {
            ...base,
            // Config sempre usa os valores mais atualizados do storeConfig.js + localStorage
            config: {
                categoriesUrl: "",
                contentUrl: "",
                scriptUrl: "",
                ...defaultContent.config,
                ...savedConfig
            }
        };
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastSync, setLastSync] = useState(null);

    // Função central que busca e aplica dados da planilha
    const fetchAndApply = async (config) => {
        const { categoriesUrl, contentUrl, productsUrl } = config || content.config;
        if (!categoriesUrl && !contentUrl && !productsUrl) return false;

        let sheetParsedContent = null;
        let sheetCategories = null;
        let sheetProducts = null;

        console.log("🔄 Sincronizando com as planilhas da Vestindo Aromas...");

        if (contentUrl) {
            const globalData = await fetchGoogleSheetData(contentUrl);
            console.log(`📄 Conteúdo retornado: ${globalData.length} linha(s)`);

            if (globalData && globalData.length > 0) {
                const parsedContent = parseGlobalContent(globalData);
                if (Object.keys(parsedContent).length > 0) {
                    sheetParsedContent = parsedContent;
                }
            }
        }

        if (categoriesUrl) {
            const categoriesData = await fetchGoogleSheetData(categoriesUrl);
            console.log(`📦 Categorias retornadas: ${categoriesData.length}`);

            if (categoriesData && categoriesData.length > 0) {
                const validCategories = categoriesData
                    .map(c => ({
                        ...c,
                        id: c.id ? (Number(c.id) || c.id) : `new_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
                    }))
                    .filter(c => c.title);

                if (validCategories.length > 0) {
                    sheetCategories = validCategories;
                }
            }
        }

        if (productsUrl) {
            const productsData = await fetchGoogleSheetData(productsUrl);
            console.log(`🛍️ Produtos retornados: ${productsData.length}`);

            if (productsData && productsData.length > 0) {
                const validProducts = productsData
                    .map(p => {
                        const productName = p.name_products || p.name || p.title || '';
                        const productDesc = p.description_products || p.description || '';
                        const productImage = p.image_products || p.image || '';
                        const catId = p.categoryId || p.categoryid;
                        return {
                            ...p,
                            id: p.id ? (Number(p.id) || p.id) : `new_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                            name: productName,
                            description: productDesc,
                            image: productImage,
                            categoryId: catId ? (Number(catId) || catId) : ''
                        };
                    })
                    .filter(p => p.name);

                if (validProducts.length > 0) {
                    sheetProducts = validProducts;
                }
            }
        }

        const hasChanges = sheetParsedContent !== null || sheetCategories !== null || sheetProducts !== null;

        if (hasChanges) {
            setContent(prev => {
                let updated = { ...prev };
                if (sheetParsedContent) {
                    updated = deepMerge(updated, sheetParsedContent);
                }
                if (sheetCategories) {
                    updated.categories = sheetCategories;
                }
                if (sheetProducts) {
                    updated.products = sheetProducts;
                }
                // Garante que a config nunca seja sobrescrita pela planilha
                updated.config = prev.config;

                // Salva no localStorage para persistir entre reloads
                try {
                    const toCache = { ...updated };
                    delete toCache.config; // config é gerenciada separadamente
                    localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(toCache));
                } catch (e) { /* ignora */ }

                return updated;
            });
            setLastSync(new Date());
        }
        return hasChanges;
    };

    // Carregamento inicial — exibe a tela de loading
    const loadAllData = async (config) => {
        const { categoriesUrl, contentUrl, productsUrl } = config || content.config;
        if (!categoriesUrl && !contentUrl && !productsUrl) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            await fetchAndApply(config);
        } catch (err) {
            console.error("Erro ao sincronizar:", err);
            setError("Erro de conexão.");
        } finally {
            setIsLoading(false);
        }
    };

    // Refresh silencioso
    const silentRefresh = async (config) => {
        try {
            await fetchAndApply(config);
        } catch (err) {
            console.warn("Auto-refresh falhou silenciosamente:", err);
        }
    };

    useEffect(() => {
        loadAllData(content.config);

        // Auto-refresh silencioso a cada 60 segundos se não for admin logado
        const interval = setInterval(() => {
            if (localStorage.getItem('isAdminAuthenticated') === 'true') {
                return;
            }
            silentRefresh(content.config);
        }, 60000);

        return () => clearInterval(interval);
    }, [content.config.categoriesUrl, content.config.contentUrl, content.config.productsUrl]);

    // Atualiza estado local (para edição visual no site)
    const updateContent = (section, key, value) => {
        setContent(prev => {
            const nextContent = {
                ...prev,
                [section]: { ...prev[section], [key]: value }
            };
            // Salva rascunho no localstorage para evitar perda acidental antes de salvar na planilha
            localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(nextContent));
            return nextContent;
        });
    };

    // Permite atualizar propriedades raiz simples (ex: name, title, tagline)
    const updateRootContent = (key, value) => {
        setContent(prev => {
            const nextContent = {
                ...prev,
                [key]: value
            };
            localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(nextContent));
            return nextContent;
        });
    };

    const updateCategory = (id, field, value) => {
        setContent(prev => {
            const nextContent = {
                ...prev,
                categories: prev.categories.map(c => c.id === id ? { ...c, [field]: value } : c)
            };
            localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(nextContent));
            return nextContent;
        });
    };

    const addCategory = () => {
        const newCategory = {
            id: `new_${Date.now()}`,
            title: 'Nova Coleção',
            description: 'Descrição da coleção',
            image: 'https://images.unsplash.com/photo-1590736704728-f4730bb3c3af?auto=format&fit=crop&q=80&w=800'
        };
        setContent(prev => {
            const nextContent = { ...prev, categories: [...prev.categories, newCategory] };
            localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(nextContent));
            return nextContent;
        });
    };

    const deleteCategory = (id) => {
        if (!confirm('Deseja realmente remover esta coleção?')) return;
        setContent(prev => {
            const nextContent = { ...prev, categories: prev.categories.filter(c => c.id !== id) };
            localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(nextContent));
            return nextContent;
        });
    };

    const updateProduct = (id, field, value) => {
        setContent(prev => {
            const nextContent = {
                ...prev,
                products: (prev.products || []).map(p => p.id === id ? { ...p, [field]: value } : p)
            };
            localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(nextContent));
            return nextContent;
        });
    };

    const addProduct = (categoryId) => {
        const newProduct = {
            id: `new_${Date.now()}`,
            name: 'Novo Produto',
            description: 'Descrição do produto',
            price: 'R$ 0,00',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800',
            categoryId: categoryId
        };
        setContent(prev => {
            const nextContent = { ...prev, products: [...(prev.products || []), newProduct] };
            localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(nextContent));
            return nextContent;
        });
    };

    const deleteProduct = (id) => {
        if (!confirm('Deseja realmente remover este produto?')) return;
        setContent(prev => {
            const nextContent = {
                ...prev,
                products: (prev.products || []).filter(p => p.id !== id)
            };
            localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(nextContent));
            return nextContent;
        });
    };

    // Atualiza config E salva no localStorage
    const updateSheetConfig = (key, value) => {
        setContent(prev => {
            const newConfig = { ...prev.config, [key]: value };
            localStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify(newConfig));
            return { ...prev, config: newConfig };
        });
    };

    // Atualiza o objeto inteiro de conteúdo (compatibilidade com componentes existentes)
    const updateWholeConfig = (newConfig) => {
        setContent(prev => {
            const updated = {
                ...newConfig,
                config: prev.config
            };
            localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const [isSaving, setIsSaving] = useState(false);

    const saveContent = async () => {
        const scriptUrl = content.config?.scriptUrl;

        if (!scriptUrl) {
            alert('⚠️ Configure a URL do Apps Script no Painel Admin para salvar na planilha.');
            return;
        }

        setIsSaving(true);
        try {
            await Promise.all([
                writeToSheet(scriptUrl, 'content', contentToRows(content)),
                writeToSheet(scriptUrl, 'categories', content.categories.map((c, i) => ({
                    id: c.id || i + 1,
                    title: c.title || '',
                    description: c.description || '',
                    image: c.image || ''
                }))),
                writeToSheet(scriptUrl, 'products', (content.products || []).map((p, i) => ({
                    id: p.id || i + 1,
                    name_products: p.name || '',
                    description_products: p.description || '',
                    price: p.price || '',
                    image_products: p.image || '',
                    categoryId: p.categoryId || ''
                })))
            ]);

            alert('✅ Dados salvos com sucesso na planilha!\n\nNota: A planilha publicada pode levar até 5 minutos para refletir de forma pública, mas você já verá as alterações aqui.');

            // Atualiza o cache local principal
            localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(content));
            setLastSync(new Date());
        } catch (err) {
            console.error('Erro ao salvar:', err);
            alert(`❌ Erro ao salvar: ${err.message}\n\nVerifique se a URL do Apps Script está correta.`);
        } finally {
            setIsSaving(false);
        }
    };

    const resetContent = () => {
        if (confirm('Deseja descartar as alterações locais e recarregar os dados da planilha?')) {
            localStorage.removeItem(CONTENT_CACHE_KEY);
            localStorage.removeItem(CONFIG_CACHE_KEY);
            window.location.reload();
        }
    };

    return {
        content,
        updateContent,
        updateRootContent,
        updateSheetConfig,
        updateWholeConfig,
        updateCategory,
        addCategory,
        deleteCategory,
        updateProduct,
        addProduct,
        deleteProduct,
        saveContent,
        resetContent,
        isLoading,
        isSaving,
        lastSync,
        error
    };
};
