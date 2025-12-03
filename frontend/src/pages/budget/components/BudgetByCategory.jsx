import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useExpenseByCategory } from "@/hooks/useExpenseByCategory";
import useBudget from "@/store/useBudgetStore";
import useCategory from "@/store/useCategoryStore";
import useModal from "@/store/useModalStore";
import { moneyFormat } from "@/utils/moneyFormat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";

const BudgetByCategory = () => {
  const budgets = useBudget((state) => state.budgets);
  const categories = useCategory((state) => state.categories);
  const expenseByCategory = useExpenseByCategory();

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category.name;
  };

  const openModal = useModal((state) => state.openModal);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget by Category</CardTitle>
      </CardHeader>
      <CardContent className={`overflow-x-auto pb-4`}>
        <div className="flex gap-4">
          {budgets.map((b) => (
            <div
              key={b.id}
              className="
              relative
            flex flex-col justify-center p-4 
            bg-slate-100 rounded-lg shadow-sm min-w-52 min-h-32"
            >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BsThreeDotsVertical className="absolute right-4 top-4"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-40 rounded-lg border shadow-sm bg-white p-3"
                  align="end"
                  side="left"
                >
                  <DropdownMenuItem
                    onClick={() => openModal("budget", "edit", b)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => openModal("delete", "budget", b)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <p className="text-gray-600">{getCategoryName(b.category)}</p>
              <h1 className="text-2xl font-medium">
                Rp{moneyFormat(expenseByCategory[b.category])} / Rp
                {moneyFormat(b.amount)}
              </h1>
            </div>
          ))}
          <div className="w-2 shrink-0"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetByCategory;
