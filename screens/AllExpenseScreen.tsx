import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenses } from "../store/expenses-context";

const AllExpenseScreen: React.FC = () => {
  const { expenses } = useExpenses();

  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      fallbackText="No expenses found for this period."
    />
  );
};

export default AllExpenseScreen;
