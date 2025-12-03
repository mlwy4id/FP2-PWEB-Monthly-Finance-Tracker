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

  return (
    <Card>
      <CardHeader className={`flex justify-between`}>
        <div className="flex items-center gap-3">
          <Target size={28} className="text-blue-700" />
          <CardTitle className={`text-2xl`}>{month} Budget Status</CardTitle>
        </div>
        <Button
          className={`bg-blue-600 hover:bg-blue-700`}
          size={`lg`}
          onClick={() => openModal("budget", "add")}
        >
          <FaPlus />
          Add Budget
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-semibold">
              Rp{moneyFormat(0)} / Rp
              {moneyFormat(0)}
            </h1>
            <p className="text-gray-500">
              Remaining:{" "}
              {12 < 0
                ? `-Rp${moneyFormat(0)}`
                : `Rp${moneyFormat(0)}`}
            </p>
          </div>
          <ProgressBar />
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetStatus;
