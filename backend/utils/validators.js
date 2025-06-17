/**
 * Valida se o e-mail informado possui formato válido.
 * @param {string} email - E-mail a ser validado.
 * @returns {boolean} true se for válido, false caso contrário.
 */
export function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Valida se a senha possui pelo menos 6 caracteres.
 * @param {string} password - Senha a ser validada.
 * @returns {boolean} true se for válida, false caso contrário.
 */
export function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

/**
 * Valida os campos obrigatórios de um gasto (expense).
 * @param {Object} param0 - Objeto contendo os dados do gasto.
 * @param {string} param0.description - Descrição do gasto.
 * @param {number} param0.amount - Valor do gasto.
 * @param {string} param0.category - Categoria do gasto.
 * @param {string} param0.userId - ID do usuário.
 * @returns {boolean} true se todos os campos forem válidos, false caso contrário.
 */
export function isValidExpense({ description, amount, category, userId }) {
  return (
    typeof description === 'string' &&
    description.trim() !== '' &&
    typeof amount === 'number' &&
    !isNaN(amount) &&
    typeof category === 'string' &&
    category.trim() !== '' &&
    typeof userId === 'string' &&
    userId.trim() !== ''
  );
}