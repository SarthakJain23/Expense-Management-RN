import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useExpenses } from "../store/expenses-context";

const AllExpenseScreen: React.FC = () => {
  const { expenses, isExpensesLoading, error, errorHandler } = useExpenses();

  if (error) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isExpensesLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      fallbackText="No expenses found for this period."
    />
  );
};

export default AllExpenseScreen;
