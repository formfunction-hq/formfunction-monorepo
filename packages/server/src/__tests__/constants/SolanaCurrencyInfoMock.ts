import { Decimal } from "@prisma/client/runtime";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import { WRAPPED_SOL_MINT } from "formfn-shared/dist/constants/SolanaConstants";

const SOLANA_CURRENCY_INFO_MOCK = {
  decimals: 9,
  iconSrc: null,
  id: "",
  mint: WRAPPED_SOL_MINT.toString(),
  name: CurrencyNameExpress_Enum.Solana,
  shortSymbol: "◎",
  solRate: new Decimal(1),
  symbol: "SOL",
  usdRate: new Decimal(1),
};

export default SOLANA_CURRENCY_INFO_MOCK;
