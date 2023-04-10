import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";
import graphql from "babel-plugin-relay/macro";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useSolanaContext from "hooks/useSolanaContext";
import { useAuctionHouseSdkForPrice_Price$key } from "hooks/__generated__/useAuctionHouseSdkForPrice_Price.graphql";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment useAuctionHouseSdkForPrice_Price on Price {
    currencyInfo {
      name
    }
  }
`;

export default function useAuctionHouseSdkForPrice(
  price: Maybe<useAuctionHouseSdkForPrice_Price$key>
): Maybe<AuctionHouseSdk> {
  const { getAuctionHouseSdk } = useSolanaContext();
  const priceData = useFragment(fragment, price);
  if (priceData == null) {
    return null;
  }

  return getAuctionHouseSdk(priceData.currencyInfo.name);
}
