import Currency from "formfn-shared/dist/types/enums/Currency";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";

export default function getSharedCurrencyEnumFromGqlCurrency(
  currency: CurrencyNameExpress_Enum
) {
  switch (currency) {
    case CurrencyNameExpress_Enum.Ash:
      return Currency.Ash;
    case CurrencyNameExpress_Enum.Bonk:
      return Currency.Bonk;
    case CurrencyNameExpress_Enum.Solana:
      return Currency.Solana;
    case CurrencyNameExpress_Enum.UsdCoin:
      return Currency.UsdCoin;
    case CurrencyNameExpress_Enum.FamousFoxFederation:
      return Currency.FamousFoxFederation;
    case CurrencyNameExpress_Enum.Particles:
      return Currency.Particles;
    case CurrencyNameExpress_Enum.SkeletonCrew:
      return Currency.SkeletonCrew;
    default:
      return assertUnreachable(currency);
  }
}
