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
      // Protege o valor da data
      let dateStr = '';
      if (typeof editingExpense.createdAt === 'string') {
        const d = new Date(editingExpense.createdAt);
        dateStr = !isNaN(d.getTime())
          ? d.toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10);
      } else if (editingExpense.createdAt instanceof Date) {
        dateStr = !isNaN(editingExpense.createdAt.getTime())
          ? editingExpense.createdAt.toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10);
      } else {
        dateStr = new Date().toISOString().slice(0, 10);
      }
      setDate(dateStr);
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

    // Sempre envia createdAt como string ISO
    const expenseData = {
      description,
      amount: parsedAmount,
      category,
      createdAt: new Date(date).toISOString(),
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
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Selecione uma categoria</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Transporte">Transporte</option>
        <option value="Moradia">Moradia (Aluguel/Contas)</option>
        <option value="Lazer">Lazer</option>
        <option value="Saúde">Saúde</option>
        <option value="Educação">Educação</option>
        <option value="Investimentos">Investimentos</option>
        <option value="Outros">Outros</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as 'Entrada' | 'Saida')}
        className="w-full p-2 border rounded"
        required
      >
        <option value="Saida">Saída</option>
        <option value="Entrada">Entrada</option>
      </select>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Selecione o método de pagamento</option>
        <option value="Credito">Crédito</option>
        <option value="Debito">Débito</option>
        <option value="Dinheiro">Dinheiro</option>
      </select>
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
