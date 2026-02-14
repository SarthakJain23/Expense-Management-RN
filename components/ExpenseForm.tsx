import { StyleSheet, Text, View } from "react-native";
import Input from "./UI/Input";

interface ExpenseFormProps {}

const ExpenseForm: React.FC<ExpenseFormProps> = () => {
  const onChangeAmount = (text: string) => {};
  const onChangeDate = (text: string) => {};
  const onChangeDescription = (text: string) => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          value=""
          inputContainerStyle={styles.rowInput}
          keyboardType="decimal-pad"
          onChangeText={onChangeAmount}
        />
        <Input
          label="Date"
          value=""
          placeholder="YYYY-MM-DD"
          maxLength={10}
          inputContainerStyle={styles.rowInput}
          onChangeText={onChangeDate}
        />
      </View>
      <Input
        label="Description"
        value=""
        multiline
        onChangeText={onChangeDescription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
});

export default ExpenseForm;
