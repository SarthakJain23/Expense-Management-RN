import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  value: string;
  error?: string;
  inputContainerStyle?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  error,
  inputContainerStyle,
  onChangeText,
  ...rest
}) => {
  return (
    <View style={[styles.inputContainer, inputContainerStyle]}>
      <Text style={[styles.label, error && styles.errorLabel]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error && styles.errorInput,
          rest.multiline && styles.inputMultiline,
        ]}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 16,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorLabel: {
    color: GlobalStyles.colors.error500,
  },
  errorInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: GlobalStyles.colors.error500,
  },
});

export default Input;
