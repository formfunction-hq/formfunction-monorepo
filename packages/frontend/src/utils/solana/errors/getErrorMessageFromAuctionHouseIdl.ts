import { AUCTION_HOUSE_IDL } from "@formfunction-hq/formfunction-auction-house";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

/**
 * The Auction house IDL contains error messages for all the
 * custom program errors.
 *
 * This tries to fetch the error message from the IDL based on the
 * error code.
 *
 * TODO[@][AuctionHouseSdk] (https://app.asana.com/0/1201632739634044/1202270777490371)
 */
export default function getErrorMessageFromAuctionHouseIdl(
  errorCode: number
): Maybe<string> {
  // Custom error messages for the frontend
  switch (errorCode) {
    case 6015:
      return "Make sure you own this NFT";
    case 6027:
      return "Your bid was too low, please refresh the page";
    case 6029:
      return "A new bid was placed, please refresh the page";
    default:
      break;
  }

  const idlError = AUCTION_HOUSE_IDL.errors?.find(
    ({ code }) => code === errorCode
  );

  return idlError?.msg ?? null;
}
