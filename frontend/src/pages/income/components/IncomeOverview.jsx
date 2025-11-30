import OverviewCard from "@/components/OverviewCard";
import useIncome from "@/store/useIncomeStore";
import { dailyRecap } from "@/utils/dailyRecap";
import { monthlyRecap } from "@/utils/monthlyRecap";
import { FaShoppingBag, FaCalendar } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

const IncomeOverview = () => {
  const incomes = useIncome((state) => state.incomes);

  return (
    <div className="flex justify-between items-center flex-wrap">
      <OverviewCard
        title="Total Income"
        logo={<FaCalendar className="text-rose-700" size={18} />}
      >
        <p className="text-red-800 text-3xl font-semibold tracking-tight">
          +Rp{monthlyRecap(incomes)}
        </p>
      </OverviewCard>

      <OverviewCard
        title="Income Today"
        logo={<FaShoppingBag className="text-orange-700" size={18} />}
      >
        <p className="text-3xl text-orange-800 font-semibold tracking-tight">
          +Rp{dailyRecap(incomes)}
        </p>
      </OverviewCard>

      <OverviewCard
        title="Top Source"
        logo={<FaArrowTrendUp className="text-purple-700" size={18} />}
      >
        <p className="text-3xl font-semibold text-purple-800">Freelance</p>
      </OverviewCard>
    </div>
  );
};

export default IncomeOverview;
