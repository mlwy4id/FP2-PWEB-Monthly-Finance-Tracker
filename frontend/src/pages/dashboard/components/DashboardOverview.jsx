import OverviewCard from "@/components/OverviewCard";
import useExpense from "@/store/useExpenseStore";
import useIncome from "@/store/useIncomeStore";
import { monthlyRecap } from "@/utils/monthlyRecap";
import { moneyFormat } from "@/utils/moneyFormat";
import { FaCalendar } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { LucideTarget } from "lucide-react";
import { useBalance } from "@/hooks/useWalletBalance";
import useBudget from "@/store/useBudgetStore";

const DashboardOverview = () => {
  const expenses = useExpense((state) => state.expenses);
  const monthlyExpense = monthlyRecap(expenses);

  const incomes = useIncome((state) => state.incomes);
  const monthlyIncome = monthlyRecap(incomes);

  const balance = useBalance();
  const budgets = useBudget((state) => state.budgets);
  const budgetTotal = budgets.reduce((acc, item) => {
    acc += item.amount;
    return acc;
  }, 0);
  const budgetStatus = (monthlyExpense / budgetTotal) * 100;

  return (
    <div className="flex flex-wrap justify-evenly gap-2">
      <OverviewCard
        title="Monthly Expense"
        logo={<FaCalendar className="text-rose-700" size={20} />}
        width={`min-w-68`}
      >
        <p className="text-red-800 text-2xl font-semibold tracking-tight">
          -Rp{moneyFormat(monthlyExpense)}
        </p>
      </OverviewCard>

      <OverviewCard
        title="Total Income"
        logo={<FaDollarSign className="text-green-600" size={20} />}
        width={`min-w-68`}
      >
        <p className="text-green-700 text-2xl font-semibold tracking-tight">
          +Rp{moneyFormat(monthlyIncome)}
        </p>
      </OverviewCard>

      <OverviewCard
        title="Net Savings"
        logo={
          <FaWallet
            className={`${balance > 0 ? `text-blue-600` : `text-red-600`}`}
            size={20}
          />
        }
        width={`min-w-68`}
      >
        <p className="text-2xl font-semibold tracking-tight">
          {balance > 0 ? (
            <span className="text-blue-700">+Rp{moneyFormat(balance)}</span>
          ) : (
            <span className="text-red-500">-Rp{moneyFormat(balance)}</span>
          )}
        </p>
      </OverviewCard>

      <OverviewCard
        title="Budget Status"
        logo={<LucideTarget className="text-blue-600" size={20} />}
        width={`min-w-68`}
      >
        <p className="text-blue-700 text-2xl font-semibold tracking-tight">
          {budgetStatus}%
        </p>
      </OverviewCard>
    </div>
  );
};

export default DashboardOverview;
