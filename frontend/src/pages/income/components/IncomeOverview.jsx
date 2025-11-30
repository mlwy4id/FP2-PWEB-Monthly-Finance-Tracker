import OverviewCard from "@/components/OverviewCard";
import useIncome from "@/store/useIncomeStore";
import { dailyRecap } from "@/utils/dailyRecap";
import { monthlyRecap } from "@/utils/monthlyRecap";
import { FaDollarSign } from "react-icons/fa";
import { SunIcon, TrophyIcon } from "lucide-react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { moneyFormat } from "@/utils/moneyFormat";

const IncomeOverview = () => {
  const incomes = useIncome((state) => state.incomes);
  const monthlyIncome = monthlyRecap(incomes);
  const dailyIncome = dailyRecap(incomes);

  return (
    <div className="flex justify-between items-center flex-wrap">
      <OverviewCard
        title="Total Income"
        logo={<FaDollarSign className="text-green-600" size={18} />}
      >
        <p className="text-green-700 text-3xl font-semibold tracking-tight">
          +Rp{moneyFormat(monthlyIncome)}
        </p>
      </OverviewCard>

      <OverviewCard
        title="Income Today"
        logo={<SunIcon className="text-teal-600" size={18} />}
      >
        <p className="text-3xl text-teal-700 font-semibold tracking-tight">
          +Rp{moneyFormat(dailyIncome)}
        </p>
      </OverviewCard>

      <OverviewCard
        title="Top Source"
        logo={<TrophyIcon className="text-emerald-600" size={18} />}
      >
        <p className="text-3xl font-semibold text-emerald-700">Freelance</p>
      </OverviewCard>
    </div>
  );
};

export default IncomeOverview;
