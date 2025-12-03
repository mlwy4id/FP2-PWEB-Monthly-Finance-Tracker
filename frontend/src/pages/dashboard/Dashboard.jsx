import PageLayout from "@/components/layouts/PageLayout";
import { getMonth } from "@/utils/getMonth";
import DashboardOverview from "./components/DashboardOverview";

const Dashboard = () => {
  const month = getMonth();
  const year = new Date().getFullYear();

  return (
    <PageLayout
      title="Dashboard"
      subtitle={`Overview of your financial status for ${month} ${year}`}
    >
      <DashboardOverview/>
    </PageLayout>
  );
};

export default Dashboard;
