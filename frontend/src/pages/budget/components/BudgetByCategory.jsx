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
import { useMemo } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const BudgetByCategory = () => {
  const budgets = useBudget((state) => state.budgets);
  const categories = useCategory((state) => state.categories);
  const expenseByCategory = useExpenseByCategory();
  const openModal = useModal((state) => state.openModal);

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category?.name || "Unknown Category";
  };

  const budgetData = useMemo(() => {
    return budgets.map((budget) => ({
      ...budget,
      categoryName: getCategoryName(budget.category),
      spent: expenseByCategory[budget.category] || 0,
      percentage: ((expenseByCategory[budget.category] || 0) / budget.amount) * 100,
    }));
  }, [budgets, categories, expenseByCategory]);

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return "text-red-600";
    if (percentage >= 80) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-lg sm:text-base">
          Budget by Category
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        {budgetData.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No budgets set yet. Create one to start tracking!
          </p>
        ) : (
          <div className="flex gap-4 pb-2">
            {budgetData.map((budget) => (
              <div
                key={budget.id}
                className="
                  relative
                  flex flex-col justify-center
                  p-4
                  bg-slate-100
                  rounded-lg shadow-sm
                  min-w-[200px]
                  max-w-[250px]
                "
              >
                <DropdownMenu>
                  <DropdownMenuTrigger
                    aria-label={`Budget options for ${budget.categoryName}`}
                    className="absolute right-4 top-4 cursor-pointer hover:bg-slate-200 rounded p-1 transition-colors"
                  >
                    <BsThreeDotsVertical />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="w-40 rounded-lg border shadow-sm bg-white p-1 z-20"
                    align="end"
                    side="right"
                  >
                    <DropdownMenuItem
                      onClick={() => openModal("budget", "edit", budget)}
                      className="cursor-pointer hover:bg-slate-100 rounded px-2 py-1.5"
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openModal("delete", "budget", budget)}
                      className="cursor-pointer hover:bg-slate-100 rounded px-2 py-1.5 text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <p className="text-gray-600 text-sm mb-1">
                  {budget.categoryName}
                </p>
                
                <h2 className="text-2xl md:text-xl sm:text-lg font-medium mb-2">
                  <span className={getProgressColor(budget.percentage)}>
                    Rp{moneyFormat(budget.spent)}
                  </span>
                  <span className="text-gray-500"> / </span>
                  Rp{moneyFormat(budget.amount)}
                </h2>

                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      budget.percentage >= 100
                        ? "bg-red-600"
                        : budget.percentage >= 80
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                  />
                </div>
                
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {budget.percentage.toFixed(0)}% used
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetByCategory;