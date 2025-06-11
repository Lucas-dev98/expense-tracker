import { useAuth } from '../context/AuthContext';
import ExpenseForm from '../components/expenses/ExpenseForm';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Olá, {user?.email}</h1>
      <ExpenseForm onAddExpense={(description: string) => {
        // TODO: handle the new expense (e.g., send to API or update state)
        console.log('New expense:', description);
      }} />
    </div>
  );
}