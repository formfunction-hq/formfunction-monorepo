import { NftListing } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import Typename from "src/types/enums/Typename";
import bigintToNumber from "src/utils/bigintToNumber";
import {
  EditionPriceInfo,
  PriceFunctionTypeExpress_Enum,
} from "src/__generated__/generated";

export default function getEditionPriceInfo(
  nftListing: NftListing
): Maybe<EditionPriceInfo> {
  if (
    nftListing.editionPriceFunctionType == null ||
    nftListing.editionPriceFunctionParams == null ||
    nftListing.editionPriceFunctionStartingPriceInLamports == null
  ) {
    return null;
  }

  return {
    __typename: Typename.EditionPriceInfo,
    allowlistPriceInFullDecimals: bigintToNumber(
      nftListing.editionAllowlistPrice
    ),
    priceFunctionType:
      nftListing.editionPriceFunctionType as PriceFunctionTypeExpress_Enum,
    priceParams: nftListing.editionPriceFunctionParams as Array<number>,
    startingPriceInLamports: bigintToNumber(
      nftListing.editionPriceFunctionStartingPriceInLamports
    )!,
  };
}
