import useCategory from "@/store/useCategoryStore";
import useWallet from "@/store/useWalletStore";

export const WalletOptions = () => {
  const wallets = useWallet((state) => state.wallets);

  return (
    <>
      <option value="">Select wallet</option>
      {wallets.map((wallet) => (
        <option key={wallet.id} value={wallet.id}>
          {wallet.name}
        </option>
      ))}
      <option className="text-blue-500" value="add_wallet">
        + Add New Wallet
      </option>
    </>
  );
};

export const CategoryOptions = () => {
  const categories = useCategory((state) => state.categories);

  return (
    <>
      <option value="">Select category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
      <option className="text-blue-500" value="add_category">
        + Add New Category
      </option>
    </>
  );
};
