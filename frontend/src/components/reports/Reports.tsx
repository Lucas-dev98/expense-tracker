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
      <h2 className="text-xl font-semibold mb-2">Relatórios & Insights</h2>
      {loading ? (
        <p>Carregando insights...</p>
      ) : (
        <ul className="list-disc pl-5">
          {insights.map((insight, idx) => (
            <li key={idx}>{insight}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reports;