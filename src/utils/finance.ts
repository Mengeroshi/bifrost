import { TAPIHistoricDataItem, TCleanedHistoricDataItem } from "@/types";

export const performanceData = ({
  price_close,
  time_period_start,
  initialClose,
}: {
  time_period_start: string;
  price_close: number;
  initialClose: number;
}) => {
  return {
    price: price_close,
    time: time_period_start,
    percentChange: ((price_close - initialClose) / initialClose) * 100,
  };
};

export const priceFormat = (rawPrice: number) => {
  return rawPrice.toLocaleString("en-US", {});
};

export const cleanRawHistoricalDataItems = (
  historicalDataItems: TAPIHistoricDataItem[]
) => {
  return historicalDataItems.map(({ time_period_start, price_close }) => ({
    time_period_start,
    price_close,
  }));
};

export const getPerfomanceDataFromCleanHistoricalItems = (
  cleanedRawHistoricalDataItems: TCleanedHistoricDataItem[]
) => {
  return cleanedRawHistoricalDataItems.map(
    ({ price_close, time_period_start }, _, thisArray) =>
      performanceData({
        price_close,
        time_period_start,
        initialClose: thisArray[0].price_close,
      })
  );
};
