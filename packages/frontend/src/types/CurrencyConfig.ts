import { PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import Currency from "types/relay/Currency";

type CurrencyConfig = {
  decimals: number;
  mint: PublicKey;
  name: Currency;
  shortSymbol: Maybe<string>;
  symbol: string;
};

export default CurrencyConfig;
