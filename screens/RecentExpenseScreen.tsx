import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { Expense } from "../configs/types";
import { useExpenses } from "../store/expenses-context";

const RecentExpenseScreen: React.FC = () => {
  const { expenses } = useExpenses();

  const getRecentExpenses = (exp: Expense[]) => {
    const today = new Date();
    const date7DaysAgo = new Date(today);
    date7DaysAgo.setDate(today.getDate() - 7);
    return exp.filter(
      (expense) => expense.date >= date7DaysAgo && expense.date <= today,
    );
  };

  return (
    <ExpensesOutput
      expenses={getRecentExpenses(expenses)}
      periodName="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenseScreen;
