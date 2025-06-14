export default class Insight {
  constructor({ userId, insights, createdAt }) {
    this.userId = userId;
    this.insights = insights; // array de strings
    this.createdAt = createdAt || new Date();
  }
}