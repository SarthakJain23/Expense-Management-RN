import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Expense, ExpenseInput } from "../configs/types";
import { fetchExpenses } from "../util/http";

interface ExpensesContextType {
  expenses: Expense[];
  error: string | null;
  isExpensesLoading: boolean;
  errorHandler: () => void;
  deleteExpense: (id: string) => void;
  addExpense: (expense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  updateExpense: (id: string, expense: ExpenseInput) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  error: null,
  expenses: [],
  isExpensesLoading: false,
  addExpense: () => {},
  setExpenses: () => {},
  errorHandler: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

type Action =
  | { type: "SET"; payload: Expense[] }
  | { type: "ADD"; payload: Expense }
  | { type: "DELETE"; payload: string }
  | { type: "UPDATE"; payload: { id: string; expense: ExpenseInput } };

const expensesReducer = (state: Expense[], action: Action): Expense[] => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "SET":
      return action.payload;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      return state.map((expense) =>
        expense.id === action.payload.id
          ? {
              ...expense,
              ...action.payload.expense,
            }
          : expense,
      );
    default:
      return state;
  }
};

interface ExpensesContextProviderProps {
  children: React.ReactNode;
}

const ExpensesContextProvider: React.FC<ExpensesContextProviderProps> = ({
  children,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isExpensesLoading, setIsExpensesLoading] = useState(false);
  const [expenses, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expense: Expense) =>
    dispatch({ type: "ADD", payload: expense });
  const deleteExpense = (id: string) =>
    dispatch({ type: "DELETE", payload: id });
  const updateExpense = (id: string, expense: ExpenseInput) =>
    dispatch({ type: "UPDATE", payload: { id, expense } });
  const setExpenses = (expenses: Expense[]) =>
    dispatch({ type: "SET", payload: expenses });
  const errorHandler = () => setError(null);

  const loadExpenses = async () => {
    setIsExpensesLoading(true);
    try {
      const expenses = await fetchExpenses();
      setExpenses(expenses);
    } catch (error) {
      setError("Could not fetch expenses - please try again later!");
    } finally {
      setIsExpensesLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const value: ExpensesContextType = {
    error,
    expenses,
    isExpensesLoading,
    addExpense,
    setExpenses,
    errorHandler,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error(
      "useExpenses must be used within an ExpensesContextProvider",
    );
  }
  return context;
};
