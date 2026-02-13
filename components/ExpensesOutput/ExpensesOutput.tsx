import { StyleSheet, Text, View } from "react-native";
import { Expense } from "../../configs/types";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

interface ExpensesOutputProps {
  periodName: string;
  fallbackText: string;
  expenses: Expense[];
}

const ExpensesOutput: React.FC<ExpensesOutputProps> = ({
  expenses,
  periodName,
  fallbackText,
}) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      {expenses.length === 0 ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{fallbackText}</Text>
        </View>
      ) : (
        <ExpensesList expenses={expenses} />
      )}
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
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

export default ExpensesOutput;
