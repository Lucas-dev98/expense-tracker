import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Expense } from '../../types/Expense';
import './ExpenseLineChart.scss';

interface ExpenseLineChartProps {
  expenses: Expense[];
}

const ExpenseLineChart: React.FC<ExpenseLineChartProps> = ({ expenses }) => {
  // Log para depuração
  console.log('Dados recebidos para o gráfico de linha:', expenses);

  // Agrupa por data (YYYY-MM-DD) e separa entradas e saídas
  const dailyData: Record<string, { entrada: number; saida: number }> = {};

  expenses.forEach((exp) => {
    let dateStr = '';
    if (exp.createdAt) {
      const d = new Date(exp.createdAt);
      if (!isNaN(d.getTime())) {
        dateStr = d.toISOString().slice(0, 10);
      }
    }
    const amount = Number(exp.amount) || 0;
    if (dateStr) {
      if (!dailyData[dateStr]) dailyData[dateStr] = { entrada: 0, saida: 0 };
      if (exp.type === 'Entrada') {
        dailyData[dateStr].entrada += amount;
      } else if (exp.type === 'Saida') {
        dailyData[dateStr].saida += Math.abs(amount);
      }
    }
  });

  // Ordena as datas
  const sortedDates = Object.keys(dailyData).sort();

  // Monta os dados para o gráfico
  const chartData = sortedDates.map((date) => ({
    date,
    entrada: dailyData[date].entrada,
    saida: dailyData[date].saida,
  }));

  return (
    <div className="expense-line-chart-card">
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Evolução de Entradas e Saídas
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value: number) =>
                `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
              }
            />
            <Line
              type="monotone"
              dataKey="entrada"
              name="Entrada"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 5, fill: '#fff', stroke: '#22c55e', strokeWidth: 2 }}
              activeDot={{
                r: 7,
                fill: '#22c55e',
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="saida"
              name="Saída"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 5, fill: '#fff', stroke: '#ef4444', strokeWidth: 2 }}
              activeDot={{
                r: 7,
                fill: '#ef4444',
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseLineChart;
