import useModal from "@/store/useModalStore";
import { Button } from "./ui/button";
import useExpense from "@/store/useExpenseStore";
import useIncome from "@/store/useIncomeStore";
import useBudget from "@/store/useBudgetStore";
import useCategory from "@/store/useCategoryStore";

const DeleteDialog = () => {
  const mode = useModal((state) => state.mode);
  const item = useModal((state) => state.item);
  const closeModal = useModal((state) => state.closeModal);
  const deleteExpense = useExpense((state) => state.deleteExpense);
  const deleteIncome = useIncome((state) => state.deleteIncome);
  const deleteBudget = useBudget((state) => state.deleteBudget);
  const categories = useCategory((state) => state.categories);

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category.name;
  };

  const DELETE_ITEM = {
    expense: deleteExpense,
    income: deleteIncome,
    budget: deleteBudget,
  };

  const deleteMethod = DELETE_ITEM[mode];

  return (
    <div className="flex flex-col gap-4">
      <h1>
        Are you sure you want to delete{" "}
        <span className="font-semibold">
          {item.title || getCategoryName(item.category)}
        </span>
        ?
      </h1>
      <div className="flex justify-end gap-4">
        <Button variant={`outline`} onClick={() => closeModal()}>
          Cancel
        </Button>
        <Button
          variant={`destructive`}
          onClick={() => {
            deleteMethod(item.id);
            closeModal();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteDialog;
