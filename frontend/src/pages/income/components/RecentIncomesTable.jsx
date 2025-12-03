import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useModal from "@/store/useModalStore";
import { dateFormat } from "@/utils/dateFormat";
import { moneyFormat } from "@/utils/moneyFormat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import useIncome from "@/store/useIncomeStore";
import useWallet from "@/store/useWalletStore";

const RecentIncomesTable = () => {
  const wallets = useWallet((state) => state.wallets);
  const incomes = useIncome((state) => state.incomes);
  const openModal = useModal((state) => state.openModal);

  const getWalletName = (id) => {
    const wallet = wallets.find((w) => w.id === id);
    return wallet.name;
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4">Title</th>
          <th className="text-left py-3 px-4">Wallet</th>
          <th className="text-left py-3 px-4">Date</th>
          <th className="text-left py-3 px-4">Amount</th>
        </tr>
      </thead>
      <tbody>
        {incomes.slice(-10).map((income) => (
          <tr
            key={income.id}
            className="hover:bg-slate-50 cursor-pointer group"
          >
            <td className="py-3 px-4">{income.title}</td>
            <td className="py-3 px-4">
              <span className="bg-slate-100 text-slate-700 px-2 py-1">
                {getWalletName(income.wallet)}
              </span>
            </td>
            <td className="py-3 px-4">{dateFormat(income.date)}</td>
            <td className="py-3 px-4 text-green-500">
              +Rp{moneyFormat(String(income.amount))}
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
                    onClick={() => openModal("income", "edit", income)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => openModal("delete", "income", income)}
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

export default RecentIncomesTable;
