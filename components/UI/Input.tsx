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
  inputContainerStyle?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  inputContainerStyle,
  onChangeText,
  ...rest
}) => {
  return (
    <View style={[styles.inputContainer, inputContainerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, rest.multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
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
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});

export default Input;
