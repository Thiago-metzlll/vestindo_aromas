# Vestindo Aromas - Landing Page

Landing page moderna para loja de moda e perfumaria com painel administrativo.

## 🚀 Instalação

```bash
npm install
npm run dev
```

## 🔐 Configuração

### 1. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

### 2. Configure o Web3Forms (Formulário de Contato)

1. Acesse [https://web3forms.com](https://web3forms.com)
2. Crie uma conta gratuita
3. Crie um novo formulário
4. Copie o **Access Key** fornecido
5. Cole no arquivo `.env` na variável `VITE_WEB3FORMS_KEY`

```env
VITE_WEB3FORMS_KEY=sua-chave-aqui
```

### 3. Alterar a Senha do Admin (Opcional)

**Senha padrão:** `admin123`

Para alterar a senha:

1. Acesse [https://emn178.github.io/online-tools/sha256.html](https://emn178.github.io/online-tools/sha256.html)
2. Digite sua nova senha
3. Copie o hash SHA-256 gerado
4. Atualize no arquivo `.env`:

```env
VITE_ADMIN_PASSWORD_HASH=seu-hash-aqui
```

### 4. Configure o WhatsApp

No arquivo `src/data/storeConfig.js`, atualize o número do WhatsApp:

```javascript
contact: {
    whatsapp: "https://wa.me/5511999999999", // Formato: 55 + DDD + número
}
```

## 📋 Funcionalidades

✅ **Hash de Senha Seguro** - Senha criptografada com SHA-256  
✅ **Web3Forms** - Formulário de contato sem backend  
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

## 📧 Como o Formulário Funciona

1. O usuário preenche o formulário
2. Os dados são enviados diretamente para o Web3Forms
3. Você recebe um email com as informações
4. Tudo sem precisar de backend próprio!

## 🛠️ Tecnologias

- **React 19** - Framework frontend
- **Vite** - Build tool rápido
- **Framer Motion** - Animações suaves
- **Lucide React** - Ícones modernos
- **Web3Forms** - Envio de emails sem backend
- **SHA-256** - Criptografia de senha

## 📱 Responsividade

A landing page é responsiva e funciona em:
- 📱 Mobile
- 💻 Desktop
- 🖥️ Tablets

## 🔒 Segurança

- Senha admin criptografada com SHA-256
- Variáveis de ambiente (nunca commit .env)
- Validação de formulário
- Proteção contra spam no Web3Forms

## 📝 Licença

Este projeto é privado e proprietário.
