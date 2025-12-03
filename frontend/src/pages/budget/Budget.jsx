import PageLayout from "@/components/layouts/PageLayout";
import BudgetStatus from "./components/BudgetStatus";
import BudgetByCategory from "./components/BudgetByCategory";

const Budget = () => {
  return (
    <PageLayout
      title="Budgeting"
      subtitle="Set and track your spending limits"
    >
      <BudgetStatus/>
      <BudgetByCategory/>
    </PageLayout>
  );
};

export default Budget;
