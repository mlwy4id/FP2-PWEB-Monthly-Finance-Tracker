import RecentExpensesTable from "@/pages/expense/components/RecentExpensesTable";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecentIncomesTable from "@/pages/income/components/RecentIncomesTable";

const RECENTCARD_CONTENT = {
  expense: RecentExpensesTable,
  income: RecentIncomesTable,
};

const RecentCard = ({ type, title, button, children }) => {
  const RecentCardContent = RECENTCARD_CONTENT[type];

  return (
    <Card className={`w-full`}>
      <CardHeader className={`flex justify-between items-center`}>
        <CardTitle className={`text-xl font-semibold`}>
          Recent {title}
        </CardTitle>
        {button}
      </CardHeader>
      <CardContent className={`overflow-x-auto`}>{RecentCardContent && <RecentCardContent />}</CardContent>
      <CardFooter className={`flex justify-end`}>{children}</CardFooter>
    </Card>
  );
};

export default RecentCard;
