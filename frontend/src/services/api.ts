import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const analyzeExpense = async (description: string) => {
  const response = await api.post('/analyze-expense', { description });
  return response.data;
};

export const addExpense = async (description: string, userId: string) => {
  try {
    const response = await api.post('/expenses', {
      description,
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar gasto:', error);
    throw error;
  }
};