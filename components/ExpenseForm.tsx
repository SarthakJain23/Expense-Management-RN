import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./UI/Button";
import Input from "./UI/Input";

export type ExpenseFormData = {
  amount: string;
  date: string;
  description: string;
};

interface ExpenseFormProps {
  submitButtonLabel: string;
  initialData: ExpenseFormData;
  onCancel: () => void;
  onSubmit: (data: ExpenseFormData) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  initialData,
  submitButtonLabel,
  onCancel,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ExpenseFormData>(initialData);

  const onChangeInput = (field: keyof ExpenseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          value={formData.amount}
          inputContainerStyle={styles.rowInput}
          keyboardType="decimal-pad"
          onChangeText={onChangeInput.bind(null, "amount")}
        />
        <Input
          label="Date"
          value={formData.date}
          placeholder="YYYY-MM-DD"
          maxLength={10}
          inputContainerStyle={styles.rowInput}
          onChangeText={onChangeInput.bind(null, "date")}
        />
      </View>
      <Input
        label="Description"
        value={formData.description}
        multiline
        onChangeText={onChangeInput.bind(null, "description")}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={onCancel} mode="flat">
          Cancel
        </Button>
        <Button style={styles.button} onPress={() => onSubmit(formData)}>
          {submitButtonLabel}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ExpenseForm;
