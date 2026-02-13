import { createContext, useContext, useReducer } from "react";
import { Expense } from "../configs/types";

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Expense) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

type Action =
  | { type: "ADD"; payload: Expense }
  | { type: "DELETE"; payload: string }
  | { type: "UPDATE"; payload: { id: string; expense: Expense } };

const expensesReducer = (state: Expense[], action: Action): Expense[] => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload.expense : expense,
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
  const [expenseState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expense: Expense) =>
    dispatch({ type: "ADD", payload: expense });
  const deleteExpense = (id: string) =>
    dispatch({ type: "DELETE", payload: id });
  const updateExpense = (id: string, expense: Expense) =>
    dispatch({ type: "UPDATE", payload: { id, expense } });

  const value: ExpensesContextType = {
    expenses: expenseState,
    addExpense,
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
