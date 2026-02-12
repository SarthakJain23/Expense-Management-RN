import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageExpenseScreen from "../screens/ManageExpenseScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ExpensesOverview">
      <Stack.Screen
        name="ExpensesOverview"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ManageExpense" component={ManageExpenseScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
