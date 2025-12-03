import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpenseByCategory } from "@/hooks/useExpenseByCategory";
import useCategory from "@/store/useCategoryStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = () => {
  const expenseByCategory = useExpenseByCategory();
  const expenseByCategoryKeys = Object.keys(expenseByCategory);
  const amounts = Object.values(expenseByCategory);

  const categories = useCategory((state) => state.categories);
  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category.name;
  };

  const formattedLabel = expenseByCategoryKeys.map((c) => getCategoryName(c));

  const expenseData = {
    category: formattedLabel,
    amounts: amounts,
    colors: ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#6366F1"],
  };

  const data = {
    labels: expenseData.category,
    datasets: [
      {
        label: "Expense Amounts",
        data: expenseData.amounts,
        backgroundColor: expenseData.colors.map((color) => `${color}B3`),
        borderColor: expenseData.colors,
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return (
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(value / 1000000) + " Millions"
            );
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className={`text-xl font-semibold`}>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
