export default class Expense {
  constructor({ description, amount, category, userId, createdAt }) {
    this.description = description;
    this.amount = amount;
    this.category = category;
    this.userId = userId;
    this.createdAt = createdAt || new Date();
  }
}