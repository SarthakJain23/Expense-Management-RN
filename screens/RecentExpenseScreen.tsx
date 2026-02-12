import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../dummy-data/expenses";

const RecentExpenseScreen: React.FC = () => {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} periodName="Last 7 Days" />;
};

export default RecentExpenseScreen;
