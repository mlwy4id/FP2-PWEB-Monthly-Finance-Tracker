import Expense from "./pages/expense/Expense";
import ExpenseHistory from "./pages/expense/ExpenseHistory";
import Dashboard from "./pages/dashboard/Dashboard";
import Income from "./pages/income/Income";
import Budget from "./pages/budget/Budget";

import Modal from "./components/Modal";
import useModal from "./store/useModalStore";
import Sidebar from "./components/Sidebar";
import SidebarOptions from "./components/SidebarOptions";
import { Home, TrendingUp, TrendingDown, Target } from "lucide-react";

import { Routes, Route } from "react-router-dom";

const App = () => {
  document.body.className = "bg-[#F5F5F5]";

  const expenseModal = useModal((state) => state.expenseModal);
  if (expenseModal) {
    document.body.className = "overflow-hidden";
  } else {
    document.body.className = "overflow-auto";
  }

  return (
    <div className="flex">
      <Sidebar>
        <SidebarOptions icon={<Home size={24} />} text={"Dashboard"} to="/" />
        <SidebarOptions
          icon={<TrendingUp size={24} />}
          text={"Income"}
          to="/income"
        />
        <SidebarOptions
          icon={<TrendingDown size={24} />}
          text={"Expense"}
          to="/expense"
        />
        <SidebarOptions
          icon={<Target size={24} />}
          text={"Budgeting"}
          to="budget"
        />
      </Sidebar>

      <div className="w-full h-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/expense/history" element={<ExpenseHistory />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>

        {expenseModal && (
          <>
            <div className="fixed inset-0 bg-black/40 z-20" />
            <div className="fixed inset-0 flex justify-center pt-4 z-30">
              <Modal />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
