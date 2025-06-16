import React from "react";
import ExpenseForm from "../expenses/ExpenseForm";
import { Expense } from "../../types/Expense";

interface DashboardLeftProps {
  user: { uid: string };
  addExpense: (expense: Omit<Expense, "id">) => void;
  editingExpense: Expense | null;
  updateExpense: (expense: Expense) => void;
  cancelEdit: () => void;
}

const DashboardLeft: React.FC<DashboardLeftProps> = ({
  user,
  addExpense,
  editingExpense,
  updateExpense,
  cancelEdit,
}) => (
  <div className="dashboard-left">
    <ExpenseForm
      user={user}
      addExpense={addExpense}
      editingExpense={editingExpense}
      updateExpense={updateExpense}
      cancelEdit={cancelEdit}
    />
  </div>
);

export default DashboardLeft;