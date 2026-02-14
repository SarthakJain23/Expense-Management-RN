import { NavigatorScreenParams } from "@react-navigation/native";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
};

export type ExpenseInput = Omit<Expense, "id">;

export type BottomTabParamList = {
  AllExpenses: undefined;
  RecentExpenses: undefined;
};

export type RootStackParamList = {
  ExpensesOverview: NavigatorScreenParams<BottomTabParamList>;
  ManageExpense: { expenseId: string } | undefined;
};
