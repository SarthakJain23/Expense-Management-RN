import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import ExpenseForm, { ExpenseFormData } from "../components/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { Expense, RootStackParamList } from "../configs/types";
import { GlobalStyles } from "../constants/styles";
import { useExpenses } from "../store/expenses-context";
import { getFormattedDate } from "../util/date";

type Props = NativeStackScreenProps<RootStackParamList, "ManageExpense">;

const ManageExpenseScreen: React.FC<Props> = ({ route, navigation }) => {
  const { expenses, addExpense, deleteExpense, updateExpense } = useExpenses();
  const { expenseId } = route.params || {};
  const isEditing = Boolean(expenseId);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (values: Expense) => {
    if (isEditing) {
      updateExpense(expenseId!, values);
    } else {
      addExpense(values);
    }
    navigation.goBack();
  };
  const deleteExpenseHandler = () => {
    deleteExpense(expenseId!);
    navigation.goBack();
  };

  const getExpenseData = (): ExpenseFormData => {
    if (isEditing) {
      const expense = expenses.find((e) => e.id === expenseId);
      if (expense) {
        return {
          amount: expense.amount.toString(),
          date: getFormattedDate(expense.date),
          description: expense.description,
        };
      }
    }
    return {
      amount: "",
      date: "",
      description: "",
    };
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        initialData={getExpenseData()}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            iconName="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpenseScreen;
