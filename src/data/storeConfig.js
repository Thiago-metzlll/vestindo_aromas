export const storeConfig = {
    name: "Vestindo Aromas",
    title: "Vestindo Aromas | Moda & Perfumaria",
    tagline: "A essência da elegância em cada detalhe.",
    about: {
        title: "Nossa História",
        description: "A Vestindo Aromas nasceu da paixão por unir o estilo visual à identidade olfativa. Acreditamos que o que você veste e o perfume que usa contam uma história única sobre quem você é.",
        image: "https://images.unsplash.com/photo-1590736704728-f4730bb3c3af?auto=format&fit=crop&q=80&w=800"
    },
    hero: {
        title: "Elegância que se Veste, Fragrância que se Sente",
        subtitle: "Descubra nossa coleção exclusiva de moda fina e perfumes importados que definem sua personalidade.",
        cta: "Explorar Coleção",
        bgImage: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200"
    },
    categories: [
        {
            id: 1,
            title: "Moda Feminina",
            description: "Peças versáteis e sofisticadas para todas as ocasiões.",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: 2,
            title: "Perfumaria",
            description: "Fragrâncias que marcam presença e deixam rastro.",
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: 3,
            title: "Moda Masculina",
            description: "Estilo, sofisticação e conforto para o homem moderno.",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
        }
    ],
    products: [
        {
            id: 101,
            name: "Vestido Seda Imperial",
            description: "Vestido longo em pura seda com caimento fluído.",
            price: "R$ 899,00",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
            categoryId: 1
        },
        {
            id: 102,
            name: "Bolsa Couro Gold",
            description: "Bolsa de ombro em couro legítimo com detalhes dourados.",
            price: "R$ 650,00",
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600",
            categoryId: 1
        },
        {
            id: 201,
            name: "Essência de Ouro (Parfum)",
            description: "Fragrância marcante com notas de baunilha, sândalo e jasmim.",
            price: "R$ 450,00",
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
            categoryId: 2
        },
        {
            id: 301,
            name: "Blazer Slim Fit",
            description: "Corte italiano clássico em lã fria.",
            price: "R$ 780,00",
            image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
            categoryId: 3
        }
    ],
    contact: {
        phone: "(11) 99999-9999",
        whatsapp: "https://wa.me/5511999999999",
        email: "contato@vestindoaromas.com.br",
        instagram: "@vestindoaromas",
        address: "Rua Elegância, 123 - Jardins, São Paulo - SP"
    },
    config: {
        categoriesUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQtmQ1N8WEG_NQVTrG-AXrsF939f7tkKl9JvMidsVxdMv8G5WCQeBn84efokQk__dRtZXzF843cXN1q/pub?gid=0&single=true&output=csv",
        productsUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQtmQ1N8WEG_NQVTrG-AXrsF939f7tkKl9JvMidsVxdMv8G5WCQeBn84efokQk__dRtZXzF843cXN1q/pub?gid=915182569&single=true&output=csv",
        contentUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQtmQ1N8WEG_NQVTrG-AXrsF939f7tkKl9JvMidsVxdMv8G5WCQeBn84efokQk__dRtZXzF843cXN1q/pub?gid=993580598&single=true&output=csv",
        scriptUrl: "https://script.google.com/macros/s/AKfycbwdXTOt2aZoqDsxZObT_a3wR3YjE6vdtTxoAybs77DQNuBO99Nxhd03F5iR-vdGkHiY/exec"
    }
};
