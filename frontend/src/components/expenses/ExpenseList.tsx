import React from 'react';
import { Expense } from '../../types/Expense';
import { formatDate } from '../../utils/formatDate';
import './ExpenseList.scss';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onDelete,
  onEdit,
}) => {
  const total = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

  return (
    <div className="expense-list-card">
      <h2 className="expense-list-title">
        <span role="img" aria-label="list">
          📋
        </span>{' '}
        Lista de Gastos
      </h2>
      <div
        className="expense-list-total"
        style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}
      >
        Total:{' '}
        <span style={{ color: total < 0 ? '#ef4444' : '#22c55e' }}>
          {total < 0 ? '-' : '+'}R${Math.abs(total).toFixed(2)}
        </span>
      </div>
      <ul className="expense-list-ul">
        {expenses.length === 0 && (
          <li className="expense-list-empty">Nenhum gasto cadastrado.</li>
        )}
        {expenses.map((expense) => {
          const dateStr = formatDate(expense.createdAt);
          return (
            <li key={expense.id} className="expense-list-item">
              <div className="expense-list-main">
                <div className="expense-list-desc">{expense.description}</div>
                <div className="expense-list-value">
                  <span
                    className={expense.type === 'Saida' ? 'saida' : 'entrada'}
                  >
                    {expense.amount < 0 ? '-' : '+'}R$
                    {Math.abs(expense.amount).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="expense-list-details">
                <span>{expense.category}</span>
                <span>{dateStr}</span>
                <span>{expense.type}</span>
                <span>{expense.paymentMethod}</span>
                {typeof expense.installmentCount === 'number' &&
                  expense.installmentCount > 1 && (
                    <span>
                      Parcela {expense.currentInstallment ?? 1}/
                      {expense.installmentCount}
                    </span>
                  )}
              </div>
              <div className="expense-list-actions">
                <button
                  className="edit-btn"
                  onClick={() => onEdit(expense)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(expense.id)}
                  title="Excluir"
                >
                  🗑️
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExpenseList;