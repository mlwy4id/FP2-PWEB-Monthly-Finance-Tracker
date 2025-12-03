import PageLayout from "@/components/layouts/PageLayout";
import ExpenseHistoryCard from "./components/ExpenseHistoryCard";

const ExpenseHistory = () => {
  return(
    <PageLayout title={`Expense History`}>
      <ExpenseHistoryCard/>
    </PageLayout>
  )
};

export default ExpenseHistory;
