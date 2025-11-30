import PageLayout from "@/components/layouts/PageLayout";
import RecentCard from "@/components/RecentCard";
import ExpenseOverview from "./components/ExpenseOverview";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useModal from "@/store/useModalStore";

const Expense = () => {
  const openModal = useModal((state) => state.openModal);

  return (
    <PageLayout
      title="Expenses"
      subtitle="Monitor and categorize your spending"
    >
      <ExpenseOverview />
      <RecentCard
        type="expense"
        title="Expenses"
        button={
          <Button
            className={`bg-blue-600 hover:bg-blue-700`}
            size={`lg`}
            onClick={() => openModal("expense", "add")}
          >
            <FaPlus />
            Add Expense
          </Button>
        }
      >
        <NavLink
          to="/expense/history"
          className="flex items-center gap-2 text-blue-600 underline"
        >
          View All
        </NavLink>
      </RecentCard>
    </PageLayout>
  );
};

export default Expense;
