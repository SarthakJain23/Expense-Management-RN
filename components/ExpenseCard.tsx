import { Text } from "react-native";
import { Expense } from "../configs/types";

interface ExpenseCardProps {
  expense: Expense;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense }) => {
  return (
    <Text>
      {expense.description} - ${expense.amount.toFixed(2)} on{" "}
      {expense.date.toDateString()}
    </Text>
  );
};

export default ExpenseCard;
