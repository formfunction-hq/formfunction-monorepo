import { WRAPPED_SOL_MINT } from "formfn-shared/dist/constants/SolanaConstants";
import CurrencyConfig from "types/CurrencyConfig";
import TextSymbol from "types/enums/TextSymbol";

const SOLANA_CURRENCY_CONFIG: CurrencyConfig = {
  decimals: 9,
  mint: WRAPPED_SOL_MINT,
  name: "Solana",
  shortSymbol: TextSymbol.SolSymbol,
  symbol: "SOL",
};

export default SOLANA_CURRENCY_CONFIG;
