import { mock } from "@/mock";
import { priceFormat } from "@/utils/finance";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => {
          const raw = tooltipItem.raw as {
            price: number;
            x: string;
            y: number;
          };
          return `${raw.y.toFixed(2)}%`;
        },
        footer: (tooltipItems: any) => {
          const raw = tooltipItems[0].raw as {
            price: number;
            x: string;
            y: number;
          };
          return `Price: ${priceFormat(raw.price)} USD`;
        },
      },
      displayColors: false,
    },
  },
  pointRadius: 4,
  pointBackgroundColor: "transparent",
  pointBorderColor: "trasparent",
  pointBorderWidth: 0,
  pointStyle: "rect",
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const data = {
  datasets: [
    {
      label: "BTC",
      data: mock.map(({ price, time, percentChange }) => ({
        x: formatDate(time),
        y: percentChange,
        price,
      })),
      borderColor: "#FD9745",
      backgroundColor: "#FD9745",
    },
  ],
};

export const Performance = () => {
  return (
    <div className="flex flex-items-center justify-center">
      <Line options={options} data={data} />
    </div>
  );
};
