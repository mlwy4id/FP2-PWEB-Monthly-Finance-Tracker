import React from 'react';
import { Line } from 'react-chartjs-2'; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement, 
  LineElement,  
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useBalanceLastNMonth } from '@/hooks/useBalanceLastNMonth';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyFinancialChart = () => {
  const [labels, expenseAmounts, incomeAmounts] = useBalanceLastNMonth(5);

  console.log(incomeAmounts, expenseAmounts);

  const data = {
    labels,
    datasets: [
      {
        label: 'Expense',
        data: expenseAmounts,
        borderColor: '#EF4444', 
        backgroundColor: 'rgba(239, 68, 68, 0.2)', 
        fill: false,
        tension: 0.3, 
        pointRadius: 6, 
        pointHoverRadius: 8,
        pointBackgroundColor: '#EF4444',
      },
      {
        label: 'Income',
        data: incomeAmounts,
        borderColor: '#10B981', 
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: false,
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#10B981',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 14,
          },
          usePointStyle: true, 
          boxWidth: 8, 
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0, 
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true, 
          drawOnChartArea: true,
          drawTicks: false,
          color: 'rgba(200, 200, 200, 0.4)', 
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
          color: '#4B5563', 
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true, 
          drawOnChartArea: true,
          drawTicks: false,
          color: 'rgba(200, 200, 200, 0.4)',
        },
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(value); 
          },
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          },
          color: '#4B5563', 
        },
      },
    },
  };

  return (
    <Card className="w-full"> 
    <CardHeader>
      <CardTitle className={`text-xl font-semibold`}>Income vs Expense Trend</CardTitle>
    </CardHeader>
      <CardContent className="h-96"> 
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default MonthlyFinancialChart;