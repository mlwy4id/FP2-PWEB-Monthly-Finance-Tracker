import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import useExpense from "@/store/useExpenseStore";
import useModal from "@/store/useModalStore";
import { expenseSchema } from "@/schemas/expenseSchema";
import { moneyFormat } from "@/utils/moneyFormat";
import { useEffect } from "react";
import { CategoryOptions, WalletOptions } from "@/components/FormOptions";

const ExpenseForm = () => {
  const addExpenses = useExpense((state) => state.addExpense);
  const updateExpense = useExpense((state) => state.updateExpense);
  const openModal = useModal((state) => state.openModal);
  const closeModal = useModal((state) => state.closeModal);
  const modalMode = useModal((state) => state.mode);
  const item = useModal((state) => state.item);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(expenseSchema),
    shouldFocusError: true,
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      title: "",
      amount: "",
      wallet: "",
      category: "",
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && item) {
      reset({
        date: item.date,
        title: item.title,
        amount: moneyFormat(item.amount),
        wallet: item.wallet,
        category: item.category,
      });
    } else if (modalMode === "add") {
      reset({
        date: new Date().toISOString().split("T")[0],
        title: "",
        amount: "",
        wallet: "",
        category: "",
      });
    }
  }, [modalMode, item]);

  const onSubmit = (data) => {
    if (modalMode === "add") {
      const dataWithId = {
        id: crypto.randomUUID(),
        ...data,
      };
      addExpenses(dataWithId);
    } else if (modalMode === "edit" && item) {
      updateExpense(item.id, data);
    }

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <label htmlFor="date" className="font-semibold">
            Date:
          </label>
          <Input
            id="date"
            {...register("date")}
            type="date"
            className={`
             bg-[#F5F5F5]
              ${errors.date ? "border-red-500 border-2" : "border-neutral-300"}
            `}
          />
          {errors.date && <p className="text-red-600">{errors.date.message}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="title" className="font-semibold">
            Expense Title:
          </label>
          <Input
            id="title"
            {...register("title")}
            type="text"
            className={`
              border-neutral-300 bg-[#F5F5F5]
              ${errors.title ? "border-red-500 border-2" : "border-neutral-300"}
            `}
          />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="amount" className="font-semibold">
            Expense Amount:
          </label>
          <Input
            id="amount"
            {...register("amount")}
            onChange={(e) => {
              setValue("amount", moneyFormat(e.target.value), {
                shouldValidate: true,
                shouldDirty: true
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
        </div>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <label htmlFor="wallet" className="font-semibold">
              Wallet:
            </label>
            <select
              id="wallet"
              {...register("wallet")}
              className={`
              file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
              border-neutral-300 bg-[#F5F5F5]
              ${
                errors.wallet ? "border-red-500 border-2" : "border-neutral-300"
              }
              `}
              onChange={(e) => {
                register("wallet").onChange(e);
                if (e.target.value === "add_wallet") {
                  openModal("wallet", "wallet");
                }
              }}
            >
              <WalletOptions />
            </select>
            {errors.wallet && (
              <p className="text-red-600">{errors.wallet.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label htmlFor="category" className="font-semibold">
              Category:
            </label>
            <select
              id="category"
              {...register("category")}
              className={`
              file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
              border-neutral-300 bg-[#F5F5F5]
              ${
                errors.category
                  ? "border-red-500 border-2"
                  : "border-neutral-300"
              }
            `}
              onChange={(e) => {
                register("wallet").onChange(e);
                if (e.target.value === "add_category") {
                  openModal("category", "category");
                }
              }}
            >
              <CategoryOptions />
            </select>
            {errors.category && (
              <p className="text-red-600">{errors.category.message}</p>
            )}
          </div>
        </div>
        
        <Button
         disabled={!isValid}
          className={`mt-2 bg-blue-600 hover:bg-blue-700`}
        >
          {modalMode === "add" ? "Add Expense" : "Save Change"}
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
