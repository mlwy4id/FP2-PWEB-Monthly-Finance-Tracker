import OverviewCard from "@/components/OverviewCard";
import useIncome from "@/store/useIncomeStore";
import { dailyRecap } from "@/utils/dailyRecap";
import { monthlyRecap } from "@/utils/monthlyRecap";
import { FaDollarSign } from "react-icons/fa";
import { SunIcon, TrophyIcon } from "lucide-react";
import { moneyFormat } from "@/utils/moneyFormat";
import { useEffect, useState } from "react";

const IncomeOverview = () => {
  const [biggestIncome, setBiggestIncome] = useState("-");

  const incomes = useIncome((state) => state.incomes);
  const monthlyIncome = monthlyRecap(incomes);
  const dailyIncome = dailyRecap(incomes);

  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredIncomes = incomes
      .filter((income) => {
        const date = new Date(income.date);
        return date.getMonth() == month && date.getFullYear() == year;
      })
      .sort((a, b) => b.amount - a.amount);

    if (filteredIncomes.length > 0) {
      setBiggestIncome(filteredIncomes[0].title);
    } else {
      setBiggestIncome("-");
    }
  }, [incomes]);

  return (
    <div
      className="
    grid gap-4
    lg:grid-cols-3
    md:grid-cols-1
    "
    >
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
        <p className="text-3xl font-semibold text-emerald-700">
          {biggestIncome}
        </p>
      </OverviewCard>
    </div>
  );
};

export default IncomeOverview;
