import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import useModal from "@/store/useModalStore";
import { budgetSchema } from "@/schemas/budgetSchema";
import { CategoryOptions } from "@/components/FormOptions";
import { useEffect } from "react";
import { moneyFormat } from "@/utils/moneyFormat";
import { useCreateBudget, usePatchBudget } from "@/hooks/useBudget";

const BudgetForm = () => {
  const {mutate: createBudget} = useCreateBudget();
  const {mutate: updateBudget} = usePatchBudget();

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
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: "",
      amount: "",
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && item) {
      reset({
        category: item.category,
        amount: moneyFormat(item.amount),
      });
    } else if (modalMode === "add") {
      reset({
        category: "",
        amount: "",
      });
    }
  }, [modalMode, item]);

  const onSubmit = (data) => {
    if (modalMode === "add") {
      const dataWithId = {
        id: crypto.randomUUID(),
        ...data,
      };
      createBudget(dataWithId);
    } else if (modalMode === "edit" && item) {
      const dataWithId = {
        id: item.id,
        ...data,
      };
      updateBudget(dataWithId);
    }

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
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
                errors.wallet ? "border-red-500 border-2" : "border-neutral-300"
              }
              `}
              onChange={(e) => {
                register("category").onChange(e);
                if (e.target.value === "add_category") {
                  openModal("category", "category");
                  e.target.value = "";
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

        <div className="grid gap-2">
          <label htmlFor="amount" className="font-semibold">
            Budget Amount:
          </label>
          <Input
            id="amount"
            {...register("amount")}
            onChange={(e) => {
              setValue("amount", moneyFormat(e.target.value), {
                shouldDirty: true,
                shouldValidate: true,
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

        <Button
          disabled={!isValid}
          className={`mt-2 bg-blue-600 hover:bg-blue-700`}
        >
          {modalMode === "add" ? "Add Budget" : "Save Change"}
        </Button>
      </div>
    </form>
  );
};

export default BudgetForm;
