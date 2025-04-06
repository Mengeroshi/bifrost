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
  return rawPrice.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
