import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CRYPTOS_TO_TRACK } from "@/constants";
import { useParams, useSearchParams } from "react-router";

export const VersusSelect = ({
  onClick,
}: {
  onClick: (symbol: string) => void;
}) => {
  const [searchParams] = useSearchParams();
  const { baseCrypto } = useParams();
  const selected = searchParams.get("vs") || undefined;
  const cryptosToTrack = CRYPTOS_TO_TRACK.filter(
    ({ symbol }) => symbol !== baseCrypto
  );
  return (
    <div className="flex flex-col items-start gap-1">
      <h3 className="text-2xl">Compare With</h3>
      <Select value={selected} onValueChange={onClick}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Compare with..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cryptos</SelectLabel>
            {cryptosToTrack.map(({ symbol, name }) => (
              <SelectItem
                key={symbol}
                value={symbol}
                onClick={() => {
                  onClick(symbol);
                }}
              >
                {name} - {symbol}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
