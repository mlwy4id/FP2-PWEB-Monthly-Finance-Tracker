import OverviewCard from "@/components/OverviewCard";
import { FaShoppingBag, FaCalendar } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

const ExpenseOverview = () => {
  return (
    <div className="flex justify-between items-center flex-wrap">
      <OverviewCard
        title="Monthly Expense"
        logo={<FaCalendar className="text-rose-700" size={18} />}
      >
        <p className="text-red-800 text-3xl font-semibold tracking-tight">
          Rp200.000
        </p>
      </OverviewCard>

      <OverviewCard
        title="Daily Expense"
        logo={<FaShoppingBag className="text-orange-700" size={18} />}
      >
        <p className="text-3xl text-orange-800 font-semibold tracking-tight">
          Rp50.000
        </p>
      </OverviewCard>

      <OverviewCard
        title="Most Category Expense"
        logo={<FaArrowTrendUp className="text-purple-700" size={18} />}
      >
        <p className="text-3xl font-semibold text-purple-800">Housing</p>
      </OverviewCard>
    </div>
  );
};

export default ExpenseOverview;
