import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenseByCategory } from "@/hooks/useExpenseByCategory";
import useCategory from "@/store/useCategoryStore";
import { moneyFormat } from "@/utils/moneyFormat";

const ExpenseByCategory = () => {
  const expenseByCategory = useExpenseByCategory();
  let sortedCategory = [];

  for (var category in expenseByCategory) {
    sortedCategory.push([category, expenseByCategory[category]]);
  }
  sortedCategory.sort((a, b) => b[1] - a[1]);

  const categories = useCategory((state) => state.categories);
  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category.name;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense by Category</CardTitle>
      </CardHeader>
      <CardContent className={`overflow-x-auto pb-4`}>
        <div className="flex gap-4">
          {sortedCategory.map((c) => (
            <div
              key={c}
              className="
            flex flex-col justify-center p-4 
            bg-slate-100 rounded-lg shadow-sm min-w-52 min-h-32"
            >
              <p className="text-gray-600">{getCategoryName(c[0])}</p>
              <h1 className="text-2xl font-medium">Rp{moneyFormat(c[1])}</h1>
            </div>
          ))}
          <div className="w-2 shrink-0"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseByCategory;
