export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  createdAt: Date | string;
  userId: string;
}