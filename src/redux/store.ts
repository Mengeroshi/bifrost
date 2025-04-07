import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cryptoPricesReducer from "./slices/cryptoPricesSlice";
import { persistReducer, PERSIST, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cryptoPrices"],
};

const reducers = combineReducers({
  cryptoPrices: cryptoPricesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
  devTools: true,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
