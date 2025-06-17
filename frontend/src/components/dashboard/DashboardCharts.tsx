import React from 'react';
import ExpenseLineChart from './ExpenseLineChart';
import ExpenseDoughnutChart from './ExpenseDoughnutChart';
import ExpenseList from '../expenses/ExpenseList';
import { Expense } from '../../types/Expense';
interface DashboardChartsProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({
  expenses,
  onDelete,
  onEdit,
}) => (
  <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
    <div style={{ flex: 1 }}>
      <ExpenseLineChart expenses={expenses} />
      <ExpenseDoughnutChart expenses={expenses} />
    </div>
    <div style={{ flex: 1 }}>
      <ExpenseList expenses={expenses} onDelete={onDelete} onEdit={onEdit} />
    </div>
  </div>
);

export default DashboardCharts;