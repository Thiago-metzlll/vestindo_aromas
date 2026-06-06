# Vestindo Aromas - Landing Page

Landing page moderna para loja de moda e perfumaria com painel administrativo.

## 🚀 Instalação

```bash
npm install
npm run dev
```

## 🔐 Configuração

O projeto foi simplificado e não utiliza mais arquivos `.env`. Toda a configuração e dados do site são consumidos e salvos diretamente no Google Sheets.

### 1. Alterar a Senha do Admin (Opcional)

**Senha padrão:** `admin123`

Para alterar a senha de acesso ao Painel Admin:

1. Abra o arquivo `src/utils/security.js`
2. Altere o valor da constante `ADMIN_PASSWORD`:
   ```javascript
   const ADMIN_PASSWORD = "sua-nova-senha-aqui";
   ```

### 2. Configure o WhatsApp

No arquivo `src/data/storeConfig.js` ou diretamente pelo Painel Admin no site (salvando na planilha), atualize as informações de contato:

```javascript
contact: {
    phone: "(11) 99999-9999",
    whatsapp: "https://wa.me/5511999999999", // Formato: 55 + DDD + número
}
```

## 📋 Funcionalidades

✅ **Painel Admin Integrado** - Autenticação simples e segura  
✅ **Contato Rápido** - Integração direta com WhatsApp e E-mail  
✅ **WhatsApp Integrado** - Botão de contato direto  
✅ **Painel Admin** - Edição de conteúdo em tempo real  
✅ **Tema Dark/Light** - Alternância de temas  
✅ **Design Glassmorphism** - Estética moderna e premium  

## 🎨 Painel Administrativo

Para acessar o painel admin:

1. Procure o pequeno ícone de cadeado (🔒) no canto inferior direito
2. Digite a senha: `admin123` (padrão)
3. Edite os textos clicando neles
4. As alterações são salvas automaticamente no navegador



## 🛠️ Tecnologias

- **React 19** - Framework frontend
- **Vite** - Build tool rápido
- **Framer Motion** - Animações suaves
- **Lucide React** - Ícones modernos
- **Google Sheets API** - Sincronização em tempo real de produtos e conteúdos

## 📱 Responsividade

A landing page é responsiva e funciona em:
- 📱 Mobile
- 💻 Desktop
- 🖥️ Tablets

## 🔒 Segurança

- Acesso administrativo simplificado
- Validação de formulários e campos no Painel Admin

