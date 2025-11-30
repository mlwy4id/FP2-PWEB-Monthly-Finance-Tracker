import useModal from "@/store/useModalStore";
import { Button } from "./ui/button";
import useExpense from "@/store/useExpenseStore";
import useIncome from "@/store/useIncomeStore";

const DeleteDialog = () => {
  const mode = useModal((state) => state.mode);
  const item = useModal((state) => state.item);
  const closeModal = useModal((state) => state.closeModal);
  const deleteExpense = useExpense((state) => state.deleteExpense);
  const deleteIncome = useIncome((state) => state.deleteIncome);

  const DELETE_ITEM = {
    expense: deleteExpense,
    income: deleteIncome,
  };

  const deleteMethod = DELETE_ITEM[mode];

  return (
    <div className="flex flex-col gap-4">
      <h1>
        Are you sure you want to delete{" "}
        <span className="font-semibold">{item.title}</span>?
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
