import useModal from "@/store/useModalStore";
import { Button } from "./ui/button";
import useExpense from "@/store/useExpenseStore";

const DeleteDialog = () => {
  const item = useModal((state) => state.item);
  const closeModal = useModal((state) => state.closeModal);
  const deleteExpense = useExpense((state) => state.deleteExpense);

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
            deleteExpense(item.id);
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
