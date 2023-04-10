import graphql from "babel-plugin-relay/macro";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { useNftPriceSymbol_Price$key } from "hooks/__generated__/useNftPriceSymbol_Price.graphql";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment useNftPriceSymbol_Price on Price {
    currencyInfo {
      symbol
      shortSymbol
    }
  }
`;

/**
 * Obtain the currency symbol for the given Price object
 */
export default function useNftPriceSymbol(
  price: MaybeUndef<useNftPriceSymbol_Price$key>
): { shortSymbol: Maybe<string>; symbol: string } {
  const priceData = useFragment(fragment, price ?? null);
  const { currencyInfo } = priceData || {};

  return {
    shortSymbol: currencyInfo?.shortSymbol ?? null,
    symbol: currencyInfo?.symbol ?? "",
  };
}
