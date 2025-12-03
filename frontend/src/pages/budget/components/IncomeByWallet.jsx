import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenseByCategory } from "@/hooks/useExpenseByCategory";
import { useIncomeByWallet } from "@/hooks/useIncomeByWallet";
import useCategory from "@/store/useCategoryStore";
import useWallet from "@/store/useWalletStore";
import { moneyFormat } from "@/utils/moneyFormat";

const IncomeByWallet = () => {
  const incomeByWallet = useIncomeByWallet();
  let sortedWallet = [];

  for (var wallet in incomeByWallet) {
    sortedWallet.push([wallet, incomeByWallet[wallet]]);
  }
  sortedWallet.sort((a, b) => b[1] - a[1]);

  const wallets = useWallet((state) => state.wallets);
  const getWalletsName = (id) => {
    const wallet = wallets.find((w) => w.id === id);
    return wallet.name;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income by Wallet</CardTitle>
      </CardHeader>
      <CardContent className={`overflow-x-auto pb-4`}>
        <div className="flex gap-4">
          {sortedWallet.map((w) => (
            <div
              key={w}
              className="
            flex flex-col justify-center p-4 
            bg-slate-100 rounded-lg shadow-sm min-w-52 min-h-32"
            >
              <p className="text-gray-600">{getWalletsName(w[0])}</p>
              <h1 className="text-2xl font-medium">Rp{moneyFormat(w[1])}</h1>
            </div>
          ))}
          <div className="w-2 shrink-0"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeByWallet;