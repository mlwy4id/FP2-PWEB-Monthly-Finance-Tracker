import PageLayout from "@/components/layouts/PageLayout";
import ExpenseHistoryCard from "./components/ExpenseHistoryCard";

const ExpenseHistory = () => {
  return(
    <PageLayout title={`Expenses History`}>
      <ExpenseHistoryCard/>
    </PageLayout>
  )
};

export default ExpenseHistory;
