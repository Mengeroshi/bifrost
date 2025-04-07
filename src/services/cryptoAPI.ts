import { TAPIHistoricDataItem } from "@/types";
import axios from "axios";

export const getCryptoData = async ({
  symbol,
  startDate,
  endDate,
  limit,
}: {
  symbol: string;
  startDate: string;
  endDate: string;
  limit?: number;
}) => {
  try {
    const response = await axios.get<TAPIHistoricDataItem[]>(
      `https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_${symbol}_USD/history`,
      {
        params: {
          period_id: "1DAY",
          time_start: startDate,
          time_end: endDate,
          limit: limit ? limit : 366,
          include_empty_items: false,
        },
        maxBodyLength: Infinity,
        headers: {
          Accept: "text/plain",
          "X-CoinAPI-Key": import.meta.env.VITE_COIN_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};
