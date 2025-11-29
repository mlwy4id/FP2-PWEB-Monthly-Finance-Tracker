import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { motion } from "framer-motion";
import ExpenseForm from "../pages/expense/components/ExpenseForm";
import { IoIosClose } from "react-icons/io";
import useModal from "@/store/useModalStore";

const Modal = ({ name, mode }) => {
  const closeModal = useModal((state) => state.closeModal);

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
            Add New Expense
            <IoIosClose size={32} onClick={() => closeModal()} />
          </CardTitle>
        </CardHeader>
        <CardContent>{name === "expense" && <ExpenseForm />}</CardContent>
        <CardFooter></CardFooter>
      </Card>
    </motion.div>
  );
};

export default Modal;
