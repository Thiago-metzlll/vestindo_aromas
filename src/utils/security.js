export async function validatePassword(password) {
    const ADMIN_PASSWORD = "Vestindoaromas12@";
    return password === ADMIN_PASSWORD;
}
