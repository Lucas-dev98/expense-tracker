import { useState, useEffect } from 'react';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import Reports from '../components/reports/Reports';
import { Expense } from "../types/Expense";
import { useAuth } from "../context/AuthContext";
import './Dashboard.scss';
import ExpenseLineChart from '../components/expenses/ExpenseLineChart';

export default function Dashboard() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [insightsRefresh, setInsightsRefresh] = useState(0); // NOVO

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
    setInsightsRefresh((r) => r + 1); // Atualiza insights
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const updateExpense = async (expense: Expense) => {
    const amountNumber =
      typeof expense.amount === "string"
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
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    await fetch(`/api/expenses/${expense.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
          {user && <Reports userId={user.uid} refresh={insightsRefresh} />}
        </div>
      </div>
      {/* Separador visual */}
      <div className="dashboard-separator">
        <hr className="dashboard-hr" />
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <ExpenseLineChart expenses={expenses} />
        </div>
        <div style={{ flex: 1 }}>
          <ExpenseList
            expenses={expenses}
            onDelete={async (id) => {
              await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
              setExpenses(expenses.filter((e) => e.id !== id));
              setInsightsRefresh((r) => r + 1); // Atualiza insights
            }}
            onEdit={handleEditExpense}
          />
        </div>
      </div>
    </div>
  );
}