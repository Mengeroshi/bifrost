import { Button } from "@/components/ui/button";
import { VersusSelect } from "@/components/VersusSelect";
import { mock } from "@/mock";
import { RootState } from "@/redux/store";
import { TCleanedHistoricDataItem } from "@/types";
import { formatDate } from "@/utils/date";
import {
  getPerfomanceDataFromCleanHistoricalItems,
  priceFormat,
} from "@/utils/finance";
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
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const newMock = cleanRawHistoricalDataItems(mock);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
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

const getDataset = (
  cleanedHistoricalItems: TCleanedHistoricDataItem[],
  symbol: string,
  color: string
) => {
  if (!cleanedHistoricalItems) {
    return {
      label: symbol,
      data: [],
      borderColor: color,
      backgroundColor: color,
    };
  }
  const data = getPerfomanceDataFromCleanHistoricalItems(
    cleanedHistoricalItems
  ).map(({ price, time, percentChange }) => ({
    x: formatDate(time),
    y: percentChange,
    price,
  }));

  return {
    label: symbol,
    data,
    borderColor: color,
    backgroundColor: color,
  };
};

const dateOptions = [
  { label: "Year", key: "year" },
  { label: "Month", key: "month" },
  { label: "Week", key: "week" },
];

export const Performance = () => {
  const { baseCrypto } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date") || "year";
  const vs = searchParams.get("vs") || undefined;
  const dispatch = useDispatch();
  const cryptoPrices = useSelector((state: RootState) => state.cryptoPrices);
  const baseHistoricDataItems = cryptoPrices[baseCrypto as string];

  return (
    <div className="flex flex-col flex-items-center justify-center">
      <h1 className=" text-center text-4xl font-bold">
        {baseCrypto} {vs ? `vs ${vs}` : ""} performace
      </h1>
      <div className=" flex justify-between gap-2">
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-2xl">Timespan</h3>
          <div className="flex gap-2 ">
            {dateOptions.map((option) => (
              <Button
                key={option.key}
                variant={option.key === date ? "default" : "neutral"}
                onClick={() => {
                  setSearchParams({ date: option.key, vs: vs || "" });
                }}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        <VersusSelect
          onClick={(symbol) => {
            setSearchParams({ vs: symbol, date });
          }}
        />
      </div>

      <Line
        options={options}
        data={{
          datasets: [
            getDataset(baseHistoricDataItems, baseCrypto as string, "#FD9745"),

            ...(vs ? [getDataset(cryptoPrices[vs], vs, "#3B82F6")] : []),
          ],
        }}
      />
      <Button
        onClick={() => {
          // dispatch({
          //   type: "cryptoPrices/setCryptoPrices",
          //   payload: { cryptoTicker: "BTC", newHistoricDataItems: newMock },
          // });
          dispatch({ type: "cryptoPrices/clearCryptoPrices" });
        }}
      >
        Clear Prices
      </Button>
    </div>
  );
};
