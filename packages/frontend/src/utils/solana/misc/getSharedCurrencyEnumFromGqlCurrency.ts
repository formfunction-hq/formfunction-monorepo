import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import SharedCurrency from "formfn-shared/dist/types/enums/Currency";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import Currency from "types/relay/Currency";

export default function getSharedCurrencyEnumFromGqlCurrency(
  currency: Currency
) {
  switch (currency) {
    case "Ash":
      return SharedCurrency.Ash;
    case "Bonk":
      return SharedCurrency.Bonk;
    case "Solana":
      return SharedCurrency.Solana;
    case "UsdCoin":
      return SharedCurrency.UsdCoin;
    case "FamousFoxFederation":
      return SharedCurrency.FamousFoxFederation;
    case "Particles":
      return SharedCurrency.Particles;
    case "SkeletonCrew":
      return SharedCurrency.SkeletonCrew;
    case RELAY_FUTURE_ADDED_VALUE:
      // Should never be reached
      return SharedCurrency.Solana;
    default:
      return assertUnreachable(currency);
  }
}
