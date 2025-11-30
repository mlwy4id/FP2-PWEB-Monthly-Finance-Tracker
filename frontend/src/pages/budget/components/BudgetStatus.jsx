import ProgressBar from "@/components/ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useBudget from "@/store/useBudgetStore";
import useExpense from "@/store/useExpenseStore";
import { getMonth } from "@/utils/getMonth";
import { moneyFormat } from "@/utils/moneyFormat";
import { monthlyRecap } from "@/utils/monthlyRecap";
import { Target } from "lucide-react";

const BudgetStatus = () => {
  const month = getMonth();
  const expenses = useExpense((state) => state.expenses);
  const thisMonthExpense = monthlyRecap(expenses);
  const thisMonthBudget = useBudget((state) => state.budget);
  const remaining = thisMonthBudget.amount - Number(thisMonthExpense);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Target size={28} className="text-blue-700" />
          <CardTitle className={`text-2xl`}>{month} Budget Status</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-semibold">
              Rp{moneyFormat(thisMonthExpense)} / Rp
              {moneyFormat(thisMonthBudget.amount)}
            </h1>
            <p className="text-gray-500">
              Remaining:{" "}
              {remaining < 0
                ? `-Rp${moneyFormat(remaining)}`
                : `Rp${moneyFormat(remaining)}`}
            </p>
          </div>
          <ProgressBar />
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetStatus;
