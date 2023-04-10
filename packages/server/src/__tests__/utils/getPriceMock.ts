import Typename from "src/types/enums/Typename";
import getEnvironment from "src/utils/getEnvironment";
import getAuctionHouseInfo from "src/utils/solana/getAuctionHouseInfo";
import { CurrencyNameExpress_Enum, Price } from "src/__generated__/generated";

export default function getPriceMock(
  amount: number,
  currency: CurrencyNameExpress_Enum
): Price {
  return {
    __typename: Typename.Price,
    amount,
    currencyInfo: {
      __typename: Typename.Currency,
      decimals: 1,
      id: currency,
      mint: getAuctionHouseInfo(
        currency,
        getEnvironment()
      ).treasuryMint.toString(),
      name: currency,
      symbol: currency,
    },
  };
}
