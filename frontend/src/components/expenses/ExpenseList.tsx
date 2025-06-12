import React from 'react';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  createdAt: any; // Pode ser Timestamp, Date ou string
}

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => (
  <div className="max-w-md mx-auto">
    <h2 className="text-xl font-semibold mb-2">Lista de Gastos</h2>
    <ul className="space-y-2">
      {expenses.map((expense) => {
        let dateStr = '';
        if (expense.createdAt?.toDate) {
          dateStr = expense.createdAt.toDate().toLocaleDateString('pt-BR');
        } else if (typeof expense.createdAt === 'string' || expense.createdAt instanceof Date) {
          dateStr = new Date(expense.createdAt).toLocaleDateString('pt-BR');
        }
        return (
          <li key={expense.id} className="p-2 border rounded bg-gray-50">
            {expense.description} - R${expense.amount.toFixed(2)} ({expense.category}) - {dateStr}
          </li>
        );
      })}
    </ul>
  </div>
);

export default ExpenseList;