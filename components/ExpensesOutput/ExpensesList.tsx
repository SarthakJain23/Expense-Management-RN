import { FlatList, View } from "react-native";
import { Expense } from "../../configs/types";

interface ExpensesListProps {
  expenses: Expense[];
}

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
  return <FlatList data={expenses} renderItem={() => <View />} />;
};

export default ExpensesList;
