export default class Expense {
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
    this.description = description;
    this.amount = amount;
    this.category = category;
    this.userId = userId;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.type = type; // "Entrada" ou "Saida"
    this.paymentMethod = paymentMethod;
    this.installmentCount = installmentCount;
    this.currentInstallment = currentInstallment;
  }
}
