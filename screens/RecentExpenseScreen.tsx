import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { Expense } from "../configs/types";
import { useExpenses } from "../store/expenses-context";

const RecentExpenseScreen: React.FC = () => {
  const { expenses, isExpensesLoading, error, errorHandler } = useExpenses();

  const getRecentExpenses = (exp: Expense[]) => {
    const today = new Date();
    const date7DaysAgo = new Date(today);
    date7DaysAgo.setDate(today.getDate() - 7);
    return exp.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= date7DaysAgo && expenseDate <= today;
    });
  };

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isExpensesLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={getRecentExpenses(expenses)}
      periodName="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenseScreen;
