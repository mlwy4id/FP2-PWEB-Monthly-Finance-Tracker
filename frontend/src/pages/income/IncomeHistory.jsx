import PageLayout from "@/components/layouts/PageLayout";
import IncomeHistoryCard from "./components/IncomeHistoryCard";

const IncomeHistory = () => {
  console.log("test");
  return (
    <PageLayout title={"Incomes History"}>
      <IncomeHistoryCard />
    </PageLayout>
  );
};

export default IncomeHistory;
