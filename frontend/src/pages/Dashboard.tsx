import { useState } from 'react';
import { Expense } from '../types/Expense';
import { useExpenses } from '../hooks/useExpenses';
import { useAuth } from '../context/AuthContext';
import './Dashboard.scss';
import DashboardLeft from '../components/dashboard/DashboardLeft';
import DashboardRight from '../components/dashboard/DashboardRight';
import DashboardCharts from '../components/dashboard/DashboardCharts';

export default function Dashboard() {
  const { user } = useAuth();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [insightsRefresh, setInsightsRefresh] = useState(0);
  const [expenses, setExpenses] = useExpenses(user?.uid);

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    const res = await fetch('/api/add-expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...expense, userId: user?.uid }),
    });
    const newExpense = await res.json();
    setExpenses([newExpense, ...expenses]);
    setInsightsRefresh((r) => r + 1); // Atualiza insights
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const updateExpense = async (expense: Expense) => {
    const amountNumber =
      typeof expense.amount === 'string'
        ? Number(expense.amount)
        : expense.amount;

    const createdAtISO =
      expense.createdAt && !isNaN(new Date(expense.createdAt).getTime())
        ? new Date(expense.createdAt).toISOString()
        : new Date().toISOString();

    if (
      !expense.description ||
      !amountNumber ||
      !expense.category ||
      !expense.type ||
      !expense.paymentMethod
    ) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    await fetch(`/api/expenses/${expense.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...expense,
        amount: amountNumber,
        createdAt: createdAtISO,
        paymentMethod: expense.paymentMethod,
        category: expense.category,
      }),
    });

    setExpenses(
      expenses.map((e) =>
        e.id === expense.id
          ? { ...expense, amount: amountNumber, createdAt: createdAtISO }
          : e
      )
    );
    setEditingExpense(null);
    setInsightsRefresh((r) => r + 1); // Atualiza insights
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {user && (
          <DashboardLeft
            user={user}
            addExpense={addExpense}
            editingExpense={editingExpense}
            updateExpense={updateExpense}
            cancelEdit={() => setEditingExpense(null)}
          />
        )}
        {user && (
          <DashboardRight userId={user.uid} refresh={insightsRefresh} />
        )}
      </div>
      <div className="dashboard-separator">
        <hr className="dashboard-hr" />
      </div>
      <DashboardCharts
        expenses={expenses}
        onDelete={async (id) => {
          await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
          setExpenses(expenses.filter((e) => e.id !== id));
          setInsightsRefresh((r) => r + 1);
        }}
        onEdit={handleEditExpense}
      />
    </div>
  );
}