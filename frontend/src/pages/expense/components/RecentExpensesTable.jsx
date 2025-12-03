import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useExpense from "@/store/useExpenseStore";
import useModal from "@/store/useModalStore";
import useWallet from "@/store/useWalletStore";
import { dateFormat } from "@/utils/dateFormat";
import { moneyFormat } from "@/utils/moneyFormat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

const RecentExpensesTable = () => {
  const wallets = useWallet((state) => state.wallets)
  const expense = useExpense((state) => state.expenses);
  const openModal = useModal((state) => state.openModal);

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category.name;
  }

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
                {getCategoryName(expense.category)}
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
