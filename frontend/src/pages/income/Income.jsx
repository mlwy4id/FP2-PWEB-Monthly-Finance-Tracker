import PageLayout from "@/components/layouts/PageLayout";
import IncomeOverview from "./components/IncomeOverview";
import RecentCard from "@/components/RecentCard";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useModal from "@/store/useModalStore";

const Income = () => {
  return (
    <PageLayout title="Income" subtitle="Track and manage your income sources">
      <IncomeOverview />
      <RecentCard
        type="income"
        title="Incomes"
        button={
          <Button
            className={`bg-green-600 hover:bg-green-700`}
            size={`lg`}
            onClick={() => openModal("income", "add")}
          >
            <FaPlus />
            Add Income
          </Button>
        }
      >
        <NavLink
          to="/income/history"
          className="flex items-center gap-2 text-blue-600 underline"
        >
          View All
        </NavLink>
      </RecentCard>
    </PageLayout>
  );
};

export default Income;
