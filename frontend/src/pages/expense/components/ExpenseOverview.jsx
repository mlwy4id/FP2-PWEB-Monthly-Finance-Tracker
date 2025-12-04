import OverviewCard from "@/components/OverviewCard";
import { useExpenseByCategory } from "@/hooks/useExpenseByCategory";
import useCategory from "@/store/useCategoryStore";
import useExpense from "@/store/useExpenseStore";
import { dailyRecap } from "@/utils/dailyRecap";
import { moneyFormat } from "@/utils/moneyFormat";
import { monthlyRecap } from "@/utils/monthlyRecap";
import { FaShoppingBag, FaCalendar } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

const ExpenseOverview = () => {
  const expenses = useExpense((state) => state.expenses);
  const monthlyExpense = monthlyRecap(expenses);
  const dailyExpense = dailyRecap(expenses);

  const expenseByCategory = useExpenseByCategory();
  const sortedExpenseByCategory = Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1]);

  const categories = useCategory((state) => state.categories);
  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category.name;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-1">
      <OverviewCard
        title="Monthly Expense"
        logo={<FaCalendar className="text-rose-700" size={18} />}
      >
        <p className="text-red-800 text-3xl font-semibold tracking-tight">
          -Rp{moneyFormat(monthlyExpense)}
        </p>
      </OverviewCard>

      <OverviewCard
        title="Daily Expense"
        logo={<FaShoppingBag className="text-orange-700" size={18} />}
      >
        <p className="text-3xl text-orange-800 font-semibold tracking-tight">
          -Rp{moneyFormat(dailyExpense)}
        </p>
      </OverviewCard>

      <OverviewCard
        title="Most Category Expense"
        logo={<FaArrowTrendUp className="text-purple-700" size={18} />}
      >
        <p className="text-3xl font-semibold text-purple-800">{getCategoryName(sortedExpenseByCategory[0][0])}</p>
      </OverviewCard>
    </div>
  );
};

export default ExpenseOverview;
