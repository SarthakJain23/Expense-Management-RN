import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { Expense, RootStackParamList } from "../configs/types";
import { GlobalStyles } from "../constants/styles";
import { useExpenses } from "../store/expenses-context";

type Props = NativeStackScreenProps<RootStackParamList, "ManageExpense">;

const ManageExpenseScreen: React.FC<Props> = ({ route, navigation }) => {
  const { addExpense, deleteExpense, updateExpense } = useExpenses();
  const { expenseId } = route.params || {};
  const isEditing = Boolean(expenseId);

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    const data: Expense = {
      id: expenseId || Math.random().toString(),
      description: "Test",
      amount: 19.99,
      date: new Date(),
    };
    if (isEditing) {
      updateExpense(expenseId!, data);
    } else {
      addExpense(data);
    }
    navigation.goBack();
  };
  const deleteExpenseHandler = () => {
    deleteExpense(expenseId!);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={cancelHandler} mode="flat">
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
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
