import { useState, useEffect } from 'react';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import Reports from '../components/reports/Reports';
import { Expense } from "../types/Expense";
import { useAuth } from "../context/AuthContext";
import './Dashboard.scss';

export default function Dashboard() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    if (user) {
      fetch(`/api/expenses?userId=${user.uid}`)
        .then((res) => res.json())
        .then((data) => setExpenses(data));
    }
  }, [user]);

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    const res = await fetch('/api/add-expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...expense, userId: user?.uid }),
    });
    const newExpense = await res.json();
    setExpenses([newExpense, ...expenses]);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const updateExpense = async (expense: Expense) => {
    await fetch(`/api/expenses/${expense.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    setExpenses(expenses.map((e) => (e.id === expense.id ? expense : e)));
    setEditingExpense(null);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-left">
          {user && (
            <ExpenseForm
              user={user}
              addExpense={addExpense}
              editingExpense={editingExpense}
              updateExpense={updateExpense}
              cancelEdit={() => setEditingExpense(null)}
            />
          )}
        </div>
        <div className="dashboard-right">
          {user && <Reports userId={user.uid} />}
        </div>
      </div>
      {/* Separador visual */}
      <div className="dashboard-separator">
        <hr className="dashboard-hr" />
      </div>
      <div className="dashboard-list-center">
        <ExpenseList
          expenses={expenses}
          onDelete={async (id) => {
            await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
            setExpenses(expenses.filter((e) => e.id !== id));
          }}
          onEdit={handleEditExpense}
        />
      </div>
    </div>
  );
}