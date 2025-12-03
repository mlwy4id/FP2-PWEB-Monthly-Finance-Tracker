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
  const openModal = useModal((state) => state.openModal);

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category.name;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-lg sm:text-base">
          Budget by Category
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {budgets.map((b) => (
            <div
              key={b.id}
              className="
                relative
                flex flex-col justify-center
                p-4
                bg-slate-100
                rounded-lg shadow-sm
                min-w-[200px]
                sm:min-w-full
              "
            >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BsThreeDotsVertical className="absolute right-4 top-4 cursor-pointer"/>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-40 rounded-lg border shadow-sm bg-white p-3"
                  align="end"
                  side="left"
                >
                  <DropdownMenuItem onClick={() => openModal("budget", "edit", b)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => openModal("delete", "budget", b)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <p className="text-gray-600 text-sm">{getCategoryName(b.category)}</p>
              <h1 className="text-2xl md:text-xl sm:text-lg font-medium">
                Rp{moneyFormat(expenseByCategory[b.category] || 0)} / Rp
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
