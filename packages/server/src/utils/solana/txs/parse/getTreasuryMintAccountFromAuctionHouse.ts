import { PublicKey } from "@solana/web3.js";
import getTreasuryMintForCurrency from "formfn-shared/dist/utils/auction-house/getTreasuryMintForCurrency";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import getEnvironment from "src/utils/getEnvironment";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import getSharedCurrencyEnumFromGqlCurrency from "src/utils/solana/getSharedCurrencyEnumFromGqlCurrency";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";

export default async function getTreasuryMintAccountFromAuctionHouse(
  auctionHouse: PublicKey
): Promise<PublicKey> {
  const auctionHousesByCurrency = await Promise.all(
    Object.values(CurrencyNameExpress_Enum).map(async (cur) => ({
      auctionHouse: getAuctionHouseSdk(cur).auctionHouse,
      currencyName: cur,
    }))
  );
  const currencyForAuctionHouse = auctionHousesByCurrency.find(
    (item) => arePublicKeysEqual(item.auctionHouse, auctionHouse)
    // As long as valid auction house account is provided, should be non-null
  )!.currencyName;

  return getTreasuryMintForCurrency(
    getEnvironment(),
    getSharedCurrencyEnumFromGqlCurrency(currencyForAuctionHouse)
  );
}
