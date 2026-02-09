# 🚀 Guia Rápido de Configuração

## Passo 1: Configure o Web3Forms (2 minutos)

### O que é?
Web3Forms é um serviço **100% GRATUITO** que permite receber emails do formulário de contato sem precisar de servidor.

### Como configurar:

1. **Acesse:** [https://web3forms.com](https://web3forms.com)

2. **Crie uma conta grátis** com seu email

3. **Crie um novo formulário:**
   - Clique em "Create New Form"
   - Digite o email onde quer receber as mensagens
   - Copie o **Access Key** que aparecerá

4. **Cole no arquivo `.env`:**
   ```env
   VITE_WEB3FORMS_KEY=cole-sua-chave-aqui
   ```

5. **Pronto!** Agora o formulário já funciona ✅

---

## Passo 2: Configure o WhatsApp (1 minuto)

Abra o arquivo `src/data/storeConfig.js` e edite:

```javascript
contact: {
    phone: "(11) 99999-9999",              // Número para mostrar no site
    whatsapp: "https://wa.me/5511999999999", // Formato: 55 + DDD + número (sem espaços)
    email: "seuemail@exemplo.com",
    instagram: "@seuinstagram",
    address: "Seu endereço completo"
}
```

**Exemplo real:**
```javascript
whatsapp: "https://wa.me/5511987654321"  // (11) 98765-4321
```

---

## Passo 3: Teste Tudo!

### Testar o formulário:
1. Preencha o formulário no site
2. Clique em "Enviar Mensagem"
3. Verifique seu email ✉️

### Testar o WhatsApp:
1. Clique no botão "Fale no WhatsApp"
2. Deve abrir o WhatsApp Web com uma mensagem pronta 📱

---

## 🔐 Alterar Senha do Admin (Opcional)

Senha atual: `admin123`

Para alterar:

1. Acesse: [https://emn178.github.io/online-tools/sha256.html](https://emn178.github.io/online-tools/sha256.html)
2. Digite sua nova senha (ex: `minhasenha2024`)
3. Copie o código gerado (hash)
4. Cole no arquivo `.env`:
   ```env
   VITE_ADMIN_PASSWORD_HASH=codigo-que-voce-copiou
   ```

---

## ❓ Problemas Comuns

### "Erro ao enviar mensagem"
- ✅ Verifique se configurou o `VITE_WEB3FORMS_KEY` no `.env`
- ✅ Verifique se reiniciou o servidor (`Ctrl+C` e `npm run dev` de novo)

### "WhatsApp não abre"
- ✅ Verifique se o número está no formato correto: `https://wa.me/5511999999999`
- ✅ Não use espaços, traços ou parênteses no link do WhatsApp

### "Não consigo fazer login no admin"
- ✅ Senha padrão é `admin123`
- ✅ Se alterou, verifique se o hash está correto no `.env`

---

## 📞 Suporte

Qualquer dúvida, me chame! 🚀
