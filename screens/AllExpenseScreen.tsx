import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "../dummy-data/expenses";

const AllExpenseScreen: React.FC = () => {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} periodName="Total" />;
};

export default AllExpenseScreen;
