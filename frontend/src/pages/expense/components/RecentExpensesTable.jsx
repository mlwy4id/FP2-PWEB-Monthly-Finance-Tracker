import useExpense from "@/store/useExpenseStore";
import { dateFormat } from "@/utils/dateFormat";

const RecentExpensesTable = () => {
  const expense = useExpense((state) => state.expenses);
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
          <tr key={expense.id} className="hover:bg-slate-50 cursor-pointer">
            <td className="py-3 px-4">{expense.title}</td>
            <td className="py-3 px-4">
              <span className="bg-slate-100 text-slate-700 px-2 py-1">
                {expense.category}
              </span>
            </td>
            <td className="py-3 px-4">{dateFormat(expense.date)}</td>
            <td className="py-3 px-4 text-red-500">-Rp{expense.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecentExpensesTable;
