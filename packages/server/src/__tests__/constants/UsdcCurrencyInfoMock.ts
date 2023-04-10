import { Decimal } from "@prisma/client/runtime";
import { DEVNET_USDC_MINT } from "formfn-shared/dist/constants/SolanaConstants";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";

const USDC_CURRENCY_INFO_MOCK = {
  decimals: 6,
  iconSrc: null,
  id: "",
  mint: DEVNET_USDC_MINT.toString(),
  name: CurrencyNameExpress_Enum.UsdCoin,
  shortSymbol: null,
  solRate: new Decimal(1),
  symbol: "USDC",
  usdRate: new Decimal(1),
};

export default USDC_CURRENCY_INFO_MOCK;
