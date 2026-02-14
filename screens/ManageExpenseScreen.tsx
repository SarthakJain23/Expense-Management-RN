import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm, { ExpenseFormData } from "../components/ExpenseForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import { ExpenseInput, RootStackParamList } from "../configs/types";
import { GlobalStyles } from "../constants/styles";
import { useExpenses } from "../store/expenses-context";
import { getFormattedDate } from "../util/date";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";

type Props = NativeStackScreenProps<RootStackParamList, "ManageExpense">;

const ManageExpenseScreen: React.FC<Props> = ({ route, navigation }) => {
  const { expenseId } = route.params || {};
  const expensesCtx = useExpenses();
  const isEditing = Boolean(expenseId);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState({
    isSubmitting: false,
    isDeleting: false,
  });

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (values: ExpenseInput) => {
    setLoading((prev) => ({ ...prev, isSubmitting: true }));
    try {
      if (isEditing) {
        await updateExpense(expenseId!, values);
        expensesCtx.updateExpense(expenseId!, values);
      } else {
        const expense = await storeExpense(values);
        expensesCtx.addExpense(expense);
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
    } finally {
      setLoading((prev) => ({ ...prev, isSubmitting: false }));
    }
  };
  const deleteExpenseHandler = async () => {
    setLoading((prev) => ({ ...prev, isDeleting: true }));
    try {
      await deleteExpense(expenseId!);
      expensesCtx.deleteExpense(expenseId!);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
    } finally {
      setLoading((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const getExpenseData = (): ExpenseFormData => {
    if (isEditing) {
      const expense = expensesCtx.expenses.find((e) => e.id === expenseId);
      if (expense) {
        return {
          amount: {
            value: expense.amount.toString(),
            isValid: true,
          },
          date: {
            value: getFormattedDate(expense.date),
            isValid: true,
          },
          description: {
            value: expense.description,
            isValid: true,
          },
        };
      }
    }
    const initialValue = { value: "", isValid: true };
    return {
      amount: initialValue,
      date: initialValue,
      description: initialValue,
    };
  };

  if (error) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        initialData={getExpenseData()}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        isSubmitting={loading.isSubmitting}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            iconName="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
            isLoading={loading.isDeleting}
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
