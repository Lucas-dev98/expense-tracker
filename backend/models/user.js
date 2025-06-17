// Classe User representa um usuário do sistema.
// Usada para padronizar e validar os dados do usuário antes de salvar no banco.
export default class User {
  /**
   * Cria uma nova instância de User.
   * @param {Object} params - Dados do usuário.
   * @param {string} params.uid - UID único do usuário (fornecido pelo Firebase Auth).
   * @param {string} params.email - E-mail do usuário.
   * @param {string} [params.displayName] - Nome de exibição do usuário (opcional).
   * @param {string} [params.photoURL] - URL da foto do usuário (opcional).
   * @param {Date|string} [params.createdAt] - Data de criação do usuário (opcional).
   */
  constructor({ uid, email, displayName, photoURL, createdAt }) {
    this.uid = uid; // UID único do usuário (Firebase)
    this.email = email; // E-mail do usuário
    this.displayName = displayName || ''; // Nome de exibição (opcional)
    this.photoURL = photoURL || ''; // URL da foto (opcional)
    // Usa a data informada ou a data atual se não for fornecida
    this.createdAt = createdAt || new Date();
  }
}