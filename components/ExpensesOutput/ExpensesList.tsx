import { FlatList } from "react-native";
import { Expense } from "../../configs/types";
import ExpenseCard from "../ExpenseCard";

interface ExpensesListProps {
  expenses: Expense[];
}

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExpenseCard expense={item} />}
    />
  );
};

export default ExpensesList;
