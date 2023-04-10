import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import flattenArrayOfObjectsToObject from "formfn-shared/dist/utils/object/flattenArrayOfObjectsToObject";
import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";
import loadAuctionHouseSdk from "src/utils/solana/loadAuctionHouseSdk";

let sdks: Maybe<Record<CurrencyNameExpress_Enum, AuctionHouseSdk>> = null;

export default function getAuctionHouseSdk(
  currency: CurrencyNameExpress_Enum
): AuctionHouseSdk {
  if (sdks != null) {
    return sdks[currency]!;
  }

  sdks = flattenArrayOfObjectsToObject(
    Object.values(CurrencyNameExpress_Enum).map(
      (currencyVal: CurrencyNameExpress_Enum) => ({
        [currencyVal]: loadAuctionHouseSdk(currencyVal),
      })
    )
  );

  return sdks[currency]!;
}
