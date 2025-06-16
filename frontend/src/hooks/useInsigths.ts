import { useEffect, useState } from "react";

export function useInsights(userId: string, refresh?: number) {
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`/api/insights?userId=${userId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setInsights(data.insights || []))
      .catch(() => setInsights(["Erro ao buscar insights."]))
      .finally(() => setLoading(false));
  }, [userId, refresh]);

  return { insights, loading };
}