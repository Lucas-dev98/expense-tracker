import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const addExpense = (description: string, userId: string) => {
  return api.post('/add-expense', { description, userId });
};

export const getExpenses = (userId: string) => {
  return api.get(`/expenses?userId=${userId}`);
};