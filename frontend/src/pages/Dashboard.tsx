import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpenseList from '../components/expenses/ExpenseList';
import Reports from '../components/reports/Reports';
import { db } from '../services/firebase';
import { Timestamp } from 'firebase/firestore';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore';

export default function Dashboard() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<any[]>([]);

  // Buscar despesas do usuário ao carregar a página
  React.useEffect(() => {
    if (user) {
      const fetchExpenses = async () => {
        const q = query(
          collection(db, 'expenses'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        setExpenses(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      };
      fetchExpenses();
    }
  }, [user]);

  // Função para adicionar despesa
  const addExpense = async (expense: {
    description: string;
    amount: number;
    category: string;
    createdAt: Date;
  }) => {
    if (!user) return;
    const docRef = await addDoc(collection(db, 'expenses'), {
      ...expense,
      createdAt: Timestamp.fromDate(new Date(expense.createdAt)),
      userId: user.uid,
    });
    setExpenses([{ id: docRef.id, ...expense, userId: user.uid }, ...expenses]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Olá, {user?.email}</h1>
      {user && <ExpenseForm user={user} addExpense={addExpense} />}
      <ExpenseList expenses={expenses} />
      {user && <Reports userId={user.uid} />}
    </div>
  );
}