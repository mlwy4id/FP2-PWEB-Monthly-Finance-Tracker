import PageLayout from "@/components/layouts/PageLayout";
import BudgetStatus from "./components/BudgetStatus";
import ExpenseByCategory from "./components/ExpenseByCategory";
import IncomeByWallet from "./components/IncomeByWallet";

const Budget = () => {
  return (
    <PageLayout
      title="Budgeting"
      subtitle="Set and track your spending limits"
    >
      <BudgetStatus/>
      <ExpenseByCategory/>
      <IncomeByWallet/>
    </PageLayout>
  );
};

export default Budget;
