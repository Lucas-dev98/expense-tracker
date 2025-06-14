import React, { useState, useEffect } from 'react';
import { Expense } from '../../types/Expense';

interface ExpenseFormProps {
  user: { uid: string };
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  editingExpense?: Expense | null;
  updateExpense?: (expense: Expense) => void;
  cancelEdit?: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  user,
  addExpense,
  editingExpense,
  updateExpense,
  cancelEdit,
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(
        typeof editingExpense.createdAt === 'string'
          ? editingExpense.createdAt.slice(0, 10)
          : new Date(editingExpense.createdAt).toISOString().slice(0, 10)
      );
    } else {
      setDescription('');
      setAmount('');
      setCategory('');
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) return;

    if (editingExpense && updateExpense && editingExpense.id) {
      updateExpense({
        ...editingExpense,
        description,
        amount: parseFloat(amount),
        category,
        createdAt: new Date(date),
      });
    } else {
      addExpense({
        description,
        amount: parseFloat(amount),
        category,
        createdAt: new Date(date),
        userId: user.uid,
      });
    }

    setDescription('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().slice(0, 10));
    if (cancelEdit) cancelEdit();
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
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {editingExpense ? 'Salvar Alterações' : 'Adicionar Gasto'}
      </button>
      {editingExpense && cancelEdit && (
        <button
          type="button"
          onClick={cancelEdit}
          className="w-full bg-gray-300 text-black p-2 rounded mt-2"
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default ExpenseForm;