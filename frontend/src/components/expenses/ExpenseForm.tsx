import React, { useState } from 'react';

interface ExpenseFormProps {
  user: { uid: string };
  addExpense: (expense: { description: string; amount: number; category: string; createdAt: Date }) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ user, addExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10)); // yyyy-mm-dd

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) return;
    addExpense({
      description,
      amount: parseFloat(amount),
      category,
      createdAt: new Date(date)
    });
    setDescription('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Adicionar Gasto
      </button>
    </form>
  );
};

export default ExpenseForm;