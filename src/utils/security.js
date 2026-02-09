/**
 * Função para gerar hash SHA-256 de uma string
 * Usado para validar senhas de forma segura no frontend
 */
export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Valida se a senha fornecida corresponde ao hash armazenado
 */
export async function validatePassword(password) {
    const hash = await hashPassword(password);
    const storedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH;
    return hash === storedHash;
}
