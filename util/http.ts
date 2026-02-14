import axios from "axios";

import { Expense, ExpenseInput } from "../configs/types";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_FIREBASE_URL,
});

export const storeExpense = async (expense: ExpenseInput): Promise<Expense> => {
  try {
    const { data } = await api.post("/expenses.json", expense);
    console.log(JSON.stringify(data));
    return { id: data.name, ...expense };
  } catch (error) {
    console.error("Error storing expense:", error);
    throw error;
  }
};

export const fetchExpenses = async (): Promise<Expense[]> => {
  try {
    const { data } = await api.get("/expenses.json");
    const expenses: Expense[] = [];
    for (const key in data) {
      expenses.push({ id: key, ...data[key] });
    }
    return expenses.reverse();
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

export const updateExpense = async (
  id: string,
  expense: ExpenseInput,
): Promise<void> => {
  try {
    await api.put(`/expenses/${id}.json`, expense);
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

export const deleteExpense = async (id: string): Promise<void> => {
  try {
    await api.delete(`/expenses/${id}.json`);
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};
