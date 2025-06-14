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
  const [type, setType] = useState<'Entrada' | 'Saida'>('Saida');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [installmentCount, setInstallmentCount] = useState('');
  const [currentInstallment, setCurrentInstallment] = useState('');

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
      setType(editingExpense.type);
      setPaymentMethod(editingExpense.paymentMethod || '');
      setInstallmentCount(editingExpense.installmentCount?.toString() || '');
      setCurrentInstallment(
        editingExpense.currentInstallment?.toString() || ''
      );
    } else {
      setDescription('');
      setAmount('');
      setCategory('');
      setDate(new Date().toISOString().slice(0, 10));
      setType('Saida');
      setPaymentMethod('');
      setInstallmentCount('');
      setCurrentInstallment('');
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !description ||
      !amount ||
      !category ||
      !date ||
      !type ||
      !paymentMethod
    )
      return;

    let parsedAmount = parseFloat(amount);
    if (type === 'Saida' && parsedAmount > 0) parsedAmount = -parsedAmount;
    if (type === 'Entrada' && parsedAmount < 0)
      parsedAmount = Math.abs(parsedAmount);

    const expenseData = {
      description,
      amount: parsedAmount,
      category,
      createdAt: date,
      type,
      paymentMethod,
      installmentCount: installmentCount ? parseInt(installmentCount) : 1,
      currentInstallment: currentInstallment ? parseInt(currentInstallment) : 1,
      userId: user.uid,
    };

    if (editingExpense && updateExpense && editingExpense.id) {
      updateExpense({
        ...editingExpense,
        ...expenseData,
      });
    } else {
      addExpense(expenseData);
    }
    

    setDescription('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().slice(0, 10));
    setType('Saida');
    setPaymentMethod('');
    setInstallmentCount('');
    setCurrentInstallment('');
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
      <select
        value={type}
        onChange={(e) => setType(e.target.value as 'Entrada' | 'Saida')}
        className="w-full p-2 border rounded"
      >
        <option value="Saida">Saída</option>
        <option value="Entrada">Entrada</option>
      </select>
      <input
        type="text"
        placeholder="Forma de Pagamento"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Parcelamento (total de parcelas)"
        value={installmentCount}
        onChange={(e) => setInstallmentCount(e.target.value)}
        className="w-full p-2 border rounded"
        min={1}
      />
      <input
        type="number"
        placeholder="Parcela Atual"
        value={currentInstallment}
        onChange={(e) => setCurrentInstallment(e.target.value)}
        className="w-full p-2 border rounded"
        min={1}
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
