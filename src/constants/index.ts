import BTC from "./assets/BTC.png";
import ETH from "./assets/ETH.png";
import DOGE from "./assets/DOGE.png";
import SOL from "./assets/SOL.png";
import XRP from "./assets/XRP.png";

export const CRYPTOS_TO_TRACK = [
  { name: "Bitcoin", symbol: "BTC", img: BTC },
  { name: "Ethereum", symbol: "ETH", img: ETH },
  { name: "Dogecoin", symbol: "DOGE", img: DOGE },
  { name: "Solana", symbol: "SOL", img: SOL },
  { name: "XRP", symbol: "XRP", img: XRP },
] as const;
