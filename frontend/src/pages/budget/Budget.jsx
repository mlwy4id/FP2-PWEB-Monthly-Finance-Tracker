import PageLayout from "@/components/layouts/PageLayout";
import BudgetStatus from "./components/BudgetStatus";

const Budget = () => {
  return (
    <PageLayout
      title="Budgeting"
      subtitle="Set and track your spending limits"
    >
      <BudgetStatus/>
    </PageLayout>
  );
};

export default Budget;
