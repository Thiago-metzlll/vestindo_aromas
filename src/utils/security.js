/**
 * Valida se a senha fornecida corresponde à senha padrão do administrador
 */
export async function validatePassword(password) {
    // Senha padrão em texto plano. Altere aqui se necessário.
    const ADMIN_PASSWORD = "admin123";
    return password === ADMIN_PASSWORD;
}
