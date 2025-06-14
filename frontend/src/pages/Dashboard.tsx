import { useState, useEffect } from 'react';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import Reports from '../components/reports/Reports';
import { Expense } from "../types/Expense";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [user, setUser] = useState<{ uid: string; email: string } | null>(null);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    setUser({ uid: 'EyBG0qfroETZ5cKL67aXRJyN8tS2', email: 'seu@email.com' });
  }, []);

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
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Olá, {user?.email}</h1>
      {user && (
        <ExpenseForm
          user={user}
          addExpense={(expense) => { void addExpense(expense); }}
          editingExpense={editingExpense}
          updateExpense={(expense) => { void updateExpense(expense); }}
          cancelEdit={() => setEditingExpense(null)}
        />
      )}
      <ExpenseList
        expenses={expenses}
        onDelete={async (id) => {
          await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
          setExpenses(expenses.filter((e) => e.id !== id));
        }}
        onEdit={handleEditExpense}
      />
      {user && <Reports userId={user.uid} />}
    </div>
  );
}