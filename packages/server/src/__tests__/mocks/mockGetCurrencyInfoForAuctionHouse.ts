// Need to import this way in order to spy on the module
// https://stackoverflow.com/a/54245672
import * as getCurrencyInfoForAuctionHouse from "src/utils/solana/txs/parse/getCurrencyInfoForAuctionHouse";
import { PublicKey } from "@solana/web3.js";
import getAuctionHouseInfo from "src/utils/solana/getAuctionHouseInfo";
import Environment from "formfn-shared/dist/types/Environment";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import SOLANA_CURRENCY_INFO_MOCK from "src/__tests__/constants/SolanaCurrencyInfoMock";
import USDC_CURRENCY_INFO_MOCK from "src/__tests__/constants/UsdcCurrencyInfoMock";

export default function mockGetCurrencyInfoForAuctionHouse() {
  const spy = jest.spyOn(getCurrencyInfoForAuctionHouse, "default");
  const solanaAuctionHouse = getAuctionHouseInfo(
    CurrencyNameExpress_Enum.Solana,
    Environment.Development
  );
  const usdcAuctionHouse = getAuctionHouseInfo(
    CurrencyNameExpress_Enum.UsdCoin,
    Environment.Development
  );

  spy.mockImplementation(async (auctionHouse: PublicKey) => {
    if (arePublicKeysEqual(auctionHouse, solanaAuctionHouse.auctionHouse)) {
      return SOLANA_CURRENCY_INFO_MOCK;
    }

    if (arePublicKeysEqual(auctionHouse, usdcAuctionHouse.auctionHouse)) {
      return USDC_CURRENCY_INFO_MOCK;
    }

    throw new Error("Unsupported auction house");
  });
}
