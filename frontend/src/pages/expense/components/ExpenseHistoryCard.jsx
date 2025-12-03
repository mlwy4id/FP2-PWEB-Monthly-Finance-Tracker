import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getNMonth } from "@/utils/getMonth";
import useExpense from "@/store/useExpenseStore";
import useModal from "@/store/useModalStore";
import useCategory from "@/store/useCategoryStore";
import { dateFormat } from "@/utils/dateFormat";
import { moneyFormat } from "@/utils/moneyFormat";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

const ExpenseHistoryCard = () => {
  const now = new Date();

  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const nextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  const prevMonth = () => {
    let newMonth = month - 1;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  const expenses = useExpense((state) => state.expenses);
  const filteredExpenses = expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date.getMonth() == month && date.getFullYear() == year;
  });

  const openModal = useModal((state) => state.openModal);
  const categories = useCategory((state) => state.categories);

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category.name;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4">
          <ChevronLeft onClick={() => prevMonth()} className="cursor-pointer" />
          <h1 className="min-w-28 text-center font-medium">
            {getNMonth(month)} {year}
          </h1>
          <ChevronRight
            onClick={() => nextMonth()}
            className="cursor-pointer"
          />
        </div>
      </CardHeader>

      <CardContent>
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
            {filteredExpenses.map((expense) => (
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
      </CardContent>
    </Card>
  );
};

export default ExpenseHistoryCard;
