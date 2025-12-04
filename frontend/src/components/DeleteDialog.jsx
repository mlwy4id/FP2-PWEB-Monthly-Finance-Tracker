import useModal from "@/store/useModalStore";
import { Button } from "./ui/button";
import useCategory from "@/store/useCategoryStore";
import { useDeleteIncome } from "@/hooks/useIncome";
import { useDeleteExpense } from "@/hooks/useExpense";
import { useDeleteBudget } from "@/hooks/useBudget";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const DeleteDialog = () => {
  const mode = useModal((state) => state.mode);
  const item = useModal((state) => state.item);
  const closeModal = useModal((state) => state.closeModal);
  
  const { mutate: deleteExpense, isPending: isExpensePending, isSuccess: isExpenseSuccess } = useDeleteExpense();
  const { mutate: deleteIncome, isPending: isIncomePending, isSuccess: isIncomeSuccess } = useDeleteIncome();
  const { mutate: deleteBudget, isPending: isBudgetPending, isSuccess: isBudgetSuccess } = useDeleteBudget();

  const categories = useCategory((state) => state.categories);

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category?.name || "Unknown Category";
  };

  const DELETE_CONFIG = {
    expense: {
      mutate: deleteExpense,
      isPending: isExpensePending,
      isSuccess: isExpenseSuccess,
    },
    income: {
      mutate: deleteIncome,
      isPending: isIncomePending,
      isSuccess: isIncomeSuccess,
    },
    budget: {
      mutate: deleteBudget,
      isPending: isBudgetPending,
      isSuccess: isBudgetSuccess,
    },
  };

  const currentConfig = DELETE_CONFIG[mode];
  const isPending = currentConfig?.isPending || false;
  const isSuccess = currentConfig?.isSuccess || false;

  // Close modal automatically when deletion succeeds
  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  const handleDelete = () => {
    if (!currentConfig || !item?.id) return;
    
    currentConfig.mutate({ id: item.id });
  };

  const getItemName = () => {
    if (item?.title) return item.title;
    if (item?.category) return getCategoryName(item.category);
    return "this item";
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg">
        Are you sure you want to delete{" "}
        <span className="font-semibold">{getItemName()}</span>?
      </h1>
      
      <p className="text-sm text-gray-600">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={closeModal}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DeleteDialog;