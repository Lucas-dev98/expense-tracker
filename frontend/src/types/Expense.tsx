export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  createdAt: string | Date;
  userId: string;
  type: 'Entrada' | 'Saida';
  paymentMethod?: string;
  installmentCount?: number;
  currentInstallment?: number;
}