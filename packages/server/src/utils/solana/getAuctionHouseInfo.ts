import getEnvironment from "src/utils/getEnvironment";
import AuctionHouseInfo from "formfn-shared/dist/types/AuctionHouseInfo";
import getAuctionHouseInfoImpl from "src/utils/solana/getAuctionHouseInfoImpl";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";

export default function getAuctionHouseInfo(
  currency: CurrencyNameExpress_Enum,
  environment = getEnvironment()
): AuctionHouseInfo {
  return getAuctionHouseInfoImpl(currency, environment);
}
