import { StyleSheet, View } from "react-native";
import { Expense } from "../../configs/types";
import { GlobalStyles } from "../../constants/styles";
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
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

export default ExpensesOutput;
