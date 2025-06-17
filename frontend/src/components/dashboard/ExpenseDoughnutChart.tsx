import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Expense } from '../../types/Expense';
import './ExpenseDoughnutChart.scss';

Chart.register(ArcElement, Tooltip, Legend, Title);

interface DoughnutChartProps {
  expenses: Expense[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ expenses }) => {
  // Agrupa por categoria
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((exp) => {
    if (!categoryTotals[exp.category]) categoryTotals[exp.category] = 0;
    categoryTotals[exp.category] += Number(exp.amount) || 0;
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Total por categoria',
        data: Object.values(categoryTotals).map(Math.abs),
        backgroundColor: [
          '#22c55e', '#ef4444', '#3b82f6', '#f59e42', '#a855f7', '#fbbf24', '#14b8a6', '#6366f1'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gastos por Categoria',
      },
    },
  };

  return (
    <div className="expense-doughnut-chart-card">
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Gastos por Categoria</h3>
        <div className="doughnut-container">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;