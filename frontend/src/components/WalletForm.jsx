import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import useModal from "@/store/useModalStore";
import { moneyFormat } from "@/utils/moneyFormat";
import { walletSchema } from "@/schemas/walletSchema";
import useWallet from "@/store/useWalletStore";

const WalletForm = () => {
  const closeModal = useModal((state) => state.closeModal);
  const addWallet = useWallet((state) => state.addWallet);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      name: "",
      amount: "",
    },
  });

  const onSubmit = (data) => {
    const dataWithId = {
      id: crypto.randomUUID(),
      ...data,
    };

    addWallet(dataWithId);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="font-semibold">
            Wallet Name:
          </label>
          <Input
            id="name"
            {...register("name")}
            type="text"
            className={`
              border-neutral-300 bg-[#F5F5F5]
              ${errors.name ? "border-red-500 border-2" : "border-neutral-300"}
            `}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="amount" className="font-semibold">
            Wallet Amount:
          </label>
          <Input
            id="amount"
            {...register("amount")}
            onChange={(e) => {
              setValue("amount", moneyFormat(e.target.value), {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            type="text"
            inputMode="numeric"
            className={`
              border-neutral-300 bg-[#F5F5F5]
              ${
                errors.amount ? "border-red-500 border-2" : "border-neutral-300"
              }
            `}
          />
          {errors.amount && (
            <p className="text-red-600">{errors.amount.message}</p>
          )}

          <Button
            disabled={!isValid}
            className={`mt-2 bg-blue-600 hover:bg-blue-700`}
          >
            Add Wallet
          </Button>
        </div>
      </div>
    </form>
  );
};

export default WalletForm;
