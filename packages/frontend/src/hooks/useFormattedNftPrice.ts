import graphql from "babel-plugin-relay/macro";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";
import { useFormattedNftPrice_Price$key } from "hooks/__generated__/useFormattedNftPrice_Price.graphql";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment useFormattedNftPrice_Price on Price {
    amount
    currencyInfo {
      decimals
    }
  }
`;

/**
 * Format an NFT price given a Price object.
 */
export default function useFormattedNftPrice(
  price: MaybeUndef<useFormattedNftPrice_Price$key>
): string {
  const priceData = useFragment(fragment, price ?? null);
  if (priceData == null) {
    // TODO (@bryancho): change to return to null and handle at callsites
    return "0";
  }

  return formatDecimals(
    Number(priceData.amount),
    priceData.currencyInfo.decimals
  );
}
