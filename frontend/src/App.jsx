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
import IncomeHistory from "./pages/income/IncomeHistory";
import useIncome from "./store/useIncomeStore";
import useExpense from "./store/useExpenseStore";
import { useEffect } from "react";
import { mockIncomes } from "./mocks/incomeMock";
import { mockExpenses } from "./mocks/expenseMock";

const App = () => {
  const modalName = useModal((state) => state.name);
  const setIncomes = useIncome((state) => state.setIncomes);
  const setExpenses = useExpense((state) => state.setExpenses);

  useEffect(() => {
    setIncomes(mockIncomes);
    setExpenses(mockExpenses);
  }, []);

  return (
    <div className="flex h-screen">
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

      <div
        className={`w-full flex-1 min-h-screen bg-slate-50 ${
          modalName === "" ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/income/history" element={<IncomeHistory />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/expense/history" element={<ExpenseHistory />} />
          <Route path="/budget" element={<Budget />} />
        </Routes>

        {modalName !== "" && (
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
