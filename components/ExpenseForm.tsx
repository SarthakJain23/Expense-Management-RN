import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ExpenseInput } from "../configs/types";
import Button from "./UI/Button";
import Input from "./UI/Input";
import LoadingOverlay from "./UI/LoadingOverlay";

type InputField<T> = {
  value: T;
  isValid: boolean;
};

export type ExpenseFormData = {
  amount: InputField<string>;
  date: InputField<string>;
  description: InputField<string>;
};

interface ExpenseFormProps {
  isSubmitting: boolean;
  submitButtonLabel: string;
  initialData: ExpenseFormData;
  onCancel: () => void;
  onSubmit: (data: ExpenseInput) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  isSubmitting,
  initialData,
  submitButtonLabel,
  onCancel,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ExpenseFormData>(initialData);

  const onChangeInput = (field: keyof ExpenseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: { value, isValid: true } }));
  };

  const onSubmitHandler = () => {
    const data: ExpenseInput = {
      amount: parseFloat(formData.amount.value),
      date: new Date(formData.date.value),
      description: formData.description.value,
    };

    const amountIsValid = !isNaN(data.amount) && data.amount > 0;
    const dateIsValid = data.date.toString() !== "Invalid Date";
    const descriptionIsValid = data.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setFormData((prev) => ({
        amount: { value: prev.amount.value, isValid: amountIsValid },
        date: { value: prev.date.value, isValid: dateIsValid },
        description: {
          value: prev.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(data);
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          value={formData.amount.value}
          error={
            !formData.amount.isValid ? "Please enter a valid amount" : undefined
          }
          inputContainerStyle={styles.rowInput}
          keyboardType="decimal-pad"
          onChangeText={onChangeInput.bind(null, "amount")}
        />
        <Input
          label="Date"
          value={formData.date.value}
          error={
            !formData.date.isValid ? "Please enter a valid date" : undefined
          }
          placeholder="YYYY-MM-DD"
          maxLength={10}
          inputContainerStyle={styles.rowInput}
          onChangeText={onChangeInput.bind(null, "date")}
        />
      </View>
      <Input
        label="Description"
        value={formData.description.value}
        error={
          !formData.description.isValid
            ? "Please enter a valid description"
            : undefined
        }
        multiline
        onChangeText={onChangeInput.bind(null, "description")}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} onPress={onCancel} mode="flat">
          Cancel
        </Button>
        <Button style={styles.button} onPress={onSubmitHandler}>
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
