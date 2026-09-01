# Vestindo Aromas - Landing Page

Landing page moderna para loja de moda e perfumaria com painel administrativo.

##  Instalação

```bash
npm install
npm run dev
```

##  Configuração

O projeto não utiliza arquivos `.env`. Toda a configuração e os dados do site são consumidos e salvos diretamente no Google Sheets.


##  Funcionalidades

-  **Painel Admin** - Edição de conteúdo em tempo real
-  **Contato Rápido** - Integração direta com WhatsApp e E-mail
- **Tema Dark/Light** - Alternância de temas

##  Painel Administrativo

Para acessar o painel admin:

1. Procure o pequeno ícone de cadeado no canto inferior direito
2. Digite a senha configurada em `src/utils/security.js`
3. Edite os textos clicando neles
4. As alterações são salvas na planilha

##  Tecnologias

- **React 19** - Framework frontend
- **Vite** - Build tool rápido
- **Framer Motion** - Animações suaves
- **Lucide React** - Ícones modernos
- **Google Sheets API** - Sincronização em tempo real de produtos e conteúdos

## Responsividade

A landing page é responsiva e funciona em:
-  Mobile
-  Desktop
-  Tablets

## Escopo e limitações

Protótipo sem servidor próprio: o Google Sheets funciona como
camada de dados e um Apps Script publicado recebe as escritas.

A senha do painel é apenas client-side — ela controla o que
aparece na interface, não o acesso aos dados. O endpoint de
escrita não valida origem nem token, então a proteção real
do conteúdo é inexistente por design nesta versão.

Para uso em produção, o caminho seria validar um token
no próprio Apps Script antes de aceitar a escrita.
