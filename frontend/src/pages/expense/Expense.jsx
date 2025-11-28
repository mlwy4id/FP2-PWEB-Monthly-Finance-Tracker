import PageLayout from "@/components/layouts/PageLayout";
import useModal from "@/store/useModalStore";
import RecentExpensesCard from "./components/RecentExpensesCard";

/*
  Layouting
  
  [ Expense Bulan Ini ] [ Expense Hari Ini ] [ Kategori Terbanyak ]
  [        Recent Expense (List)         ]
  [        Expense by Category (Chart)   ]
*/

const Expense = () => {
  return (
    <PageLayout
      title="Expenses"
      subtitle="Monitor and categorize your spending"
    >
      <RecentExpensesCard/>
    </PageLayout>
  );
};

export default Expense;
