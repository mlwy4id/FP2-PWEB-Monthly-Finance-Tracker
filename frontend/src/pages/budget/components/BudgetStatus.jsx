import ProgressBar from "@/components/ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useBudget from "@/store/useBudgetStore";
import useExpense from "@/store/useExpenseStore";
import { getMonth } from "@/utils/getMonth";
import { moneyFormat } from "@/utils/moneyFormat";
import { monthlyRecap } from "@/utils/monthlyRecap";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import useModal from "@/store/useModalStore";
import { FaPlus } from "react-icons/fa";

const BudgetStatus = () => {
  const month = getMonth();
  const expenses = useExpense((state) => state.expenses);
  const thisMonthExpense = monthlyRecap(expenses);
  const openModal = useModal((state) => state.openModal);

  const budgets = useBudget((state) => state.budgets);
  const budgetTotal = budgets.reduce((acc, item) => acc + item.amount, 0);

  const balance = budgetTotal - thisMonthExpense;
  const percentage = budgetTotal
    ? ((thisMonthExpense / budgetTotal) * 100).toFixed(1)
    : 0;

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Target size={28} className="text-blue-700" />
          <CardTitle className="text-lg md:text-xl lg:text-2xl">
            {month} Budget Status
          </CardTitle>
        </div>

        <Button
          className="
            bg-blue-600 hover:bg-blue-700
            w-auto md:w-auto sm:w-full
            flex items-center justify-center gap-2
          "
          size="lg"
          onClick={() => openModal("budget", "add")}
        >
          <FaPlus />
          Add Budget
        </Button>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold">
              Rp{moneyFormat(thisMonthExpense)} / Rp
              {moneyFormat(budgetTotal)}
            </h1>

            <p className="text-gray-500 text-sm">
              Remaining:
              {balance < 0
                ? ` -Rp${moneyFormat(balance)}`
                : ` Rp${moneyFormat(balance)}`}
            </p>
          </div>

          <ProgressBar dividend={thisMonthExpense} divisor={budgetTotal} />

          <p
            className={`mt-2 text-sm ${
              percentage < 90 ? "text-gray-500" : "text-red-600"
            }`}
          >
            {percentage < 100
              ? `${percentage}% of total budget used`
              : `You excess the budget limit!`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetStatus;