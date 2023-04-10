import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import exhaustiveStringArray from "formfn-shared/dist/utils/array/exhaustiveStringArray";
import CurrencyNameExpress_enum from "types/relay/Currency";

const CURRENCIES = exhaustiveStringArray<CurrencyNameExpress_enum>()(
  "Ash",
  "Bonk",
  "Particles",
  "SkeletonCrew",
  "Solana",
  "UsdCoin",
  "FamousFoxFederation",
  RELAY_FUTURE_ADDED_VALUE
);

export default CURRENCIES;
