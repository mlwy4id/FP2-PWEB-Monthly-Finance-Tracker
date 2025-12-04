import useExpense from "@/store/useExpenseStore";
import useIncome from "@/store/useIncomeStore";
import { getNMonth } from "@/utils/getMonth";
import { monthNRecap } from "@/utils/monthlyRecap";

export const useBalanceLastNMonth = (n) => {
  const expenses = useExpense((state) => state.expenses);
  const incomes = useIncome((state) => state.incomes);
  const thisMonth = new Date().getMonth();

  let month = [];
  let expense = [];
  let income = [];

  for (let i = n - 1; i >= 0; i--) {
    const targetDate = new Date();

    targetDate.setMonth(thisMonth - i);

    const targetMonthIndex = targetDate.getMonth();
    const targetYearIndex = targetDate.getFullYear();

    const label = getNMonth(targetMonthIndex);
    month.push(label);

    const mExpense = monthNRecap(targetMonthIndex, targetYearIndex, expenses);
    const mIncome = monthNRecap(targetMonthIndex, targetYearIndex, incomes);

    expense.push(mExpense);
    income.push(mIncome);
  }

  return [month, expense, income];
};
