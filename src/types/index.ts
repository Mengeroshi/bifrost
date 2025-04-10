export type TAPIHistoricDataItem = {
  time_period_start: string;
  time_period_end: string;
  time_open: string;
  time_close: string;
  price_open: number;
  price_high: number;
  price_low: number;
  price_close: number;
  volume_traded: number;
  trades_count: number;
};

export type TCleanedHistoricDataItem = Pick<
  TAPIHistoricDataItem,
  "time_period_start" | "price_close"
>;
