import { CRYPTOS_TO_TRACK } from "@/constants";
import { RootState } from "@/redux/store";
import { getCryptoData } from "@/services/cryptoAPI";
import { cleanRawHistoricalDataItems } from "@/utils/finance";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router";

export const useFetchCryptoData = async () => {
  const cryptoPrices = useSelector((state: RootState) => state.cryptoPrices);
  const navigate = useNavigate();
  const { baseCrypto } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const vs = searchParams.get("vs") || undefined;
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      CRYPTOS_TO_TRACK.find((crypto) => crypto.symbol === baseCrypto) ===
      undefined
    ) {
      navigate("/");
    }

    if (cryptoPrices[baseCrypto as string] === undefined) {
      getCryptoData({
        symbol: baseCrypto as string,
        startDate: new Date(
          new Date().setDate(new Date().getDate() - 366)
        ).toISOString(),
        endDate: new Date().toISOString(),
      }).then((data) => {
        console.log("baseCrypto data", data);
        dispatch({
          type: "cryptoPrices/setCryptoPrices",
          payload: {
            cryptoTicker: baseCrypto,
            newHistoricDataItems: cleanRawHistoricalDataItems(data),
          },
        });
      });
    }
  }, []);

  useEffect(() => {
    if (vs) {
      if (
        CRYPTOS_TO_TRACK.find((crypto) => crypto.symbol === vs) === undefined
      ) {
        setSearchParams({ vs: "" });
      }
      if (cryptoPrices[vs as string] === undefined) {
        getCryptoData({
          symbol: vs as string,
          startDate: new Date(
            new Date().setDate(new Date().getDate() - 366)
          ).toISOString(),
          endDate: new Date().toISOString(),
        }).then((data) => {
          console.log("vs data", data);
          dispatch({
            type: "cryptoPrices/setCryptoPrices",
            payload: {
              cryptoTicker: vs,
              newHistoricDataItems: cleanRawHistoricalDataItems(data),
            },
          });
        });
      }
    }
  }, [vs]);
};
