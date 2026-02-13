import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../configs/types";
import { GlobalStyles } from "../constants/styles";
import ManageExpenseScreen from "../screens/ManageExpenseScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ExpensesOverview"
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpenseScreen}
        options={({ route }) => {
          const { expenseId } = route.params || {};
          const isEditing = Boolean(expenseId);

          return {
            presentation: "modal",
            headerTitle: isEditing ? "Edit Expense" : "Add Expense",
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
