import RecentExpensesTable from "./RecentExpensesTable";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink } from "react-router-dom";
import useModal from "@/store/useModalStore";

const RecentExpensesCard = () => {
  const openModal = useModal((state) => state.openModal);
  return (
    <Card>
      <CardHeader className={`flex justify-between items-center`}>
        <CardTitle className={`text-xl`}>Recent Expenses</CardTitle>
        <Button
          className={`bg-blue-600`}
          size={`lg`}
          onClick={() => openModal("expenseModal")}
        >
          <FaPlus />
          Add Expense
        </Button>
      </CardHeader>
      <CardContent>
        <RecentExpensesTable />
      </CardContent>
      <CardFooter className={`flex justify-end`}>
        <NavLink
          to="/expense/history"
          className="flex items-center gap-2 text-blue-600 underline"
        >
          View All
        </NavLink>
      </CardFooter>
    </Card>
  );
};

export default RecentExpensesCard;
