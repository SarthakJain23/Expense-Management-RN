import { Text, View } from "react-native";
import { Expense } from "../../configs/types";

interface ExpensesSummaryProps {
  expenses: Expense[];
  periodName: string;
}

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({
  expenses,
  periodName,
}) => {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${totalAmount.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;
