import { useEffect, useState } from "react";
import { Expense } from "../types/Expense";

export function useExpenses(userId?: string) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  useEffect(() => {
    if (userId) {
      fetch(`/api/expenses?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setExpenses(Array.isArray(data) ? data : [])); // <-- aqui!
    }
  }, [userId]);
  return [expenses, setExpenses] as const;
}