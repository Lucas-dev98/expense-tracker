import React, { useEffect, useState } from 'react';

interface ReportsProps {
  userId: string;
}

const Reports: React.FC<ReportsProps> = ({ userId }) => {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/insights?userId=${userId}`, { cache: "no-store" });
        const data = await res.json();
        setInsights(data.insights || []);
        console.log('Insights recebidos do backend:', data.insights);
      } catch {
        setInsights(['Erro ao buscar insights.']);
      }
      setLoading(false);
    };
    fetchInsights();
  }, [userId]);

return (
  <div className="max-w-md mx-auto mt-4">
    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
      <span role="img" aria-label="lightbulb">💡</span>
      Relatórios & Insights
    </h2>
    {loading ? (
      <p>Carregando insights...</p>
    ) : (
      <ul className="space-y-3">
        {insights.map((insight, idx) => (
          <li key={idx} className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded shadow flex items-start gap-2">
            <span className="text-yellow-500 text-xl">💡</span>
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default Reports;