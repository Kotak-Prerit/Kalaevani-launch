import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Legend,
  Title,
  Tooltip
);

const LineGraph = () => {
  const generateDatesArray = (startDate) => {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();

      result.push(`${day}-${month}-${year}`);
    }
    return result;
  };

  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  startOfDay.setDate(startOfDay.getDate() - 6);
  const datesArray = generateDatesArray(startOfDay);

  const LineChartData = {
    labels: datesArray,
    datasets: [
      {
        label: "Sales",
        data: [2500, 10000, 5000, 15000, 2000, 7000, 27000],
        borderColor: "#10B981",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: "#10B981",
    scales: {
      x: {
        grid: {
          color: "#4a4a4a",
          borderDash: [5, 5], // Change x-axis grid line color
        },
        ticks: {
          color: "#ffffff", // Change x-axis label color
        },
      },
      y: {
        grid: {
          color: "#4a4a4a",
          borderDash: [5, 5], // Change y-axis grid line color
        },
        ticks: {
          color: "#ffffff", // Change y-axis label color
        },
      },
    },
  };
  return <Line data={LineChartData} options={options} />;
};

export default LineGraph;
