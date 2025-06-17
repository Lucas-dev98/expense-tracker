// Classe Insight representa um conjunto de insights automáticos gerados para um usuário.
// Usada para armazenar e padronizar os dados de insights no banco de dados.
export default class Insight {
  /**
   * Cria uma nova instância de Insight.
   * @param {Object} params - Dados do insight.
   * @param {string} params.userId - ID do usuário ao qual os insights pertencem.
   * @param {string[]} params.insights - Array de strings com os insights gerados.
   * @param {Date|string} [params.createdAt] - Data de criação dos insights (opcional).
   */
  constructor({ userId, insights, createdAt }) {
    this.userId = userId; // ID do usuário dono dos insights
    this.insights = insights; // Array de insights (strings)
    // Usa a data informada ou a data atual se não for fornecida
    this.createdAt = createdAt || new Date();
  }
}