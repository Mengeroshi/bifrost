import { TCleanedHistoricDataItem } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { [cryptoTicker: string]: TCleanedHistoricDataItem[] } = {};

const cryptoPricesSlice = createSlice({
  name: "cryptoPrices",
  initialState,
  reducers: {
    setCryptoPrices: (
      state,
      action: {
        payload: {
          cryptoTicker: string;
          newHistoricDataItems: TCleanedHistoricDataItem[];
        };
      }
    ) => {
      const { cryptoTicker, newHistoricDataItems } = action.payload;
      state[cryptoTicker] = newHistoricDataItems;
    },
    updateDailyPrice: (
      state,
      action: {
        payload: {
          cryptoTicker: string;
          newHistoricDataItem: TCleanedHistoricDataItem;
        };
      }
    ) => {
      const { cryptoTicker, newHistoricDataItem } = action.payload;
      if (state[cryptoTicker]) {
        state[cryptoTicker].shift(); // Remove the first element
        state[cryptoTicker].push(newHistoricDataItem); // Add the new item to the end
      }
    },
    clearCryptoPrices: () => {
      return initialState; // Reset the state to the initial state
    },
  },
});

export default cryptoPricesSlice.reducer;
export const { setCryptoPrices, updateDailyPrice } = cryptoPricesSlice.actions;
