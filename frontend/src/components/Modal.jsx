import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import ExpenseForm from "../pages/expense/components/ExpenseForm";
import { IoIosClose } from "react-icons/io";
import useModal from "@/store/useModalStore";
import DeleteDialog from "./DeleteDialog";
import IncomeForm from "@/pages/income/components/IncomeForm";

const MODAL_COMPONENTS = {
  expense: ExpenseForm,
  income: IncomeForm,
  delete: DeleteDialog,
};

const MODAL_TITLE = (modalMode) => ({
  expense: modalMode === "edit" ? "Edit Expense" : "Add Expense",
  income: modalMode === "edit" ? "Edit Income" : "Add Income",
  delete: "Confirm Delete",
});

const Modal = () => {
  const modalName = useModal((state) => state.name);
  const modalMode = useModal((state) => state.mode);
  const closeModal = useModal((state) => state.closeModal);
  const ModalContent = MODAL_COMPONENTS[modalName];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", duration: 0.4, bounce: 0.1 },
      }}
      className="w-xl"
    >
      <Card className={`w-full bg-[#FFFFFF]`}>
        <CardHeader>
          <CardTitle className={`text-xl flex justify-between items-center`}>
            {MODAL_TITLE(modalMode)[modalName]}
            <IoIosClose size={32} onClick={() => closeModal()} />
          </CardTitle>
        </CardHeader>
        <CardContent>{ModalContent && <ModalContent />}</CardContent>
      </Card>
    </motion.div>
  );
};

export default Modal;
