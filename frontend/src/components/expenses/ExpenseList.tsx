import React from 'react';
import { Expense } from "../../types/Expense";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onDelete,
  onEdit,
}) => (
  <div className="max-w-md mx-auto">
    <h2 className="text-xl font-semibold mb-2">Lista de Gastos</h2>
  <ul className="space-y-4">
  {expenses.map((expense) => {
    let dateStr = '';
    if ((expense.createdAt as any)?.toDate) {
      dateStr = (expense.createdAt as any).toDate().toLocaleDateString('pt-BR');
    } else if (
      typeof expense.createdAt === 'string' ||
      expense.createdAt instanceof Date
    ) {
      dateStr = new Date(expense.createdAt).toLocaleDateString('pt-BR');
    }
    return (
      <li
        key={expense.id}
        className="p-4 border rounded bg-white shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
      >
        <div>
          <div className="font-semibold">{expense.description}</div>
          <div className="text-sm text-gray-500">{expense.category} • {dateStr}</div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="font-bold text-green-600">R${expense.amount.toFixed(2)}</span>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => onEdit(expense)}
          >
            Editar
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => onDelete(expense.id)}
          >
            Excluir
          </button>
        </div>
      </li>
    );
  })}
</ul>
  </div>
);

export default ExpenseList;