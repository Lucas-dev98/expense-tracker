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
    <ul className="space-y-2">
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
            className="p-2 border rounded bg-gray-50 flex justify-between items-center"
          >
            <span>
              {expense.description} - R${expense.amount.toFixed(2)} (
              {expense.category}) - {dateStr}
            </span>
            <span>
              <button
                className="text-blue-500 mr-2"
                onClick={() => onEdit(expense)}
              >
                Editar
              </button>
              <button
                className="text-red-500"
                onClick={() => onDelete(expense.id)}
              >
                Excluir
              </button>
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

export default ExpenseList;