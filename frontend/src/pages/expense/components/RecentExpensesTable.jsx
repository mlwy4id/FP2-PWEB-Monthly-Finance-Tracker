import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { mockExpenses } from "@/mocks/expenseMock";
import useExpense from "@/store/useExpenseStore";
import useModal from "@/store/useModalStore";
import { dateFormat } from "@/utils/dateFormat";
import { moneyFormat } from "@/utils/moneyFormat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect } from "react";

const RecentExpensesTable = () => {
  const expense = useExpense((state) => state.expenses);
  const setExpenses = useExpense((state) => state.setExpenses);
  const openModal = useModal((state) => state.openModal);

  useEffect(() => {
    setExpenses(mockExpenses);
  }, []);

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4">Title</th>
          <th className="text-left py-3 px-4">Category</th>
          <th className="text-left py-3 px-4">Date</th>
          <th className="text-left py-3 px-4">Amount</th>
        </tr>
      </thead>
      <tbody>
        {expense.slice(-10).map((expense) => (
          <tr
            key={expense.id}
            className="hover:bg-slate-50 cursor-pointer group"
          >
            <td className="py-3 px-4">{expense.title}</td>
            <td className="py-3 px-4">
              <span className="bg-slate-100 text-slate-700 px-2 py-1">
                {expense.category}
              </span>
            </td>
            <td className="py-3 px-4">{dateFormat(expense.date)}</td>
            <td className="py-3 px-4 text-red-500">
              -Rp{moneyFormat(String(expense.amount))}
            </td>
            <td>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BsThreeDotsVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-40 rounded-lg border shadow-sm bg-white p-3"
                  align="end"
                  side="left"
                >
                  <DropdownMenuItem
                    onClick={() => openModal("expense", "edit", expense)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => openModal("delete", "expense", expense)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentExpensesTable;
