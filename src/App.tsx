import { Link } from "react-router";
import { Button } from "./components/ui/button";
import { CRYPTOS_TO_TRACK } from "./constants";

export function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <h1 className="text-8xl text-center">Welcome to Bifrost</h1>
      <p className="text-2xl text-center text-main">
        Click in the assets to check their price performance
      </p>
      <section className="flex flex-wrap gap-2 mt-2">
        {CRYPTOS_TO_TRACK.map((crypto) => (
          <Link to={`/performance/${crypto.symbol}`} key={crypto.symbol}>
            <Button size="lg">
              <img src={crypto.img} alt={crypto.name} className="size-4" />
              {crypto.name}
            </Button>
          </Link>
        ))}
      </section>
    </div>
  );
}
