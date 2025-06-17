// Classe Expense representa um gasto individual no sistema.
// Usada para padronizar e validar os dados de gastos antes de salvar no banco.
export default class Expense {
  /**
   * Cria uma nova instância de Expense.
   * @param {Object} params - Dados do gasto.
   * @param {string} params.description - Descrição do gasto.
   * @param {number} params.amount - Valor do gasto (positivo para entrada, negativo para saída).
   * @param {string} params.category - Categoria do gasto.
   * @param {string} params.userId - ID do usuário dono do gasto.
   * @param {Date|string} [params.createdAt] - Data de criação do gasto.
   * @param {string} params.type - Tipo do gasto ("Entrada" ou "Saida").
   * @param {string} params.paymentMethod - Método de pagamento.
   * @param {number} [params.installmentCount] - Total de parcelas (opcional).
   * @param {number} [params.currentInstallment] - Parcela atual (opcional).
   */
  constructor({
    description,
    amount,
    category,
    userId,
    createdAt,
    type,
    paymentMethod,
    installmentCount,
    currentInstallment
  }) {
    this.description = description; // Descrição do gasto
    this.amount = amount; // Valor do gasto
    this.category = category; // Categoria (ex: Alimentação, Transporte)
    this.userId = userId; // ID do usuário
    // Se informado, converte createdAt para Date; senão, usa data atual
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.type = type; // "Entrada" ou "Saida"
    this.paymentMethod = paymentMethod; // Método de pagamento
    this.installmentCount = installmentCount; // Total de parcelas (opcional)
    this.currentInstallment = currentInstallment; // Parcela atual (opcional)
  }
}