import { View } from "react-native";
import { Expense } from "../../configs/types";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

interface ExpensesOutputProps {
  expenses: Expense[];
  periodName: string;
}

const ExpensesOutput: React.FC<ExpensesOutputProps> = ({
  expenses,
  periodName,
}) => {
  return (
    <View>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default ExpensesOutput;
