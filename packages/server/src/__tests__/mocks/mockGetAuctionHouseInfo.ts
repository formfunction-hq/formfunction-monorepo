// Need to import this way in order to spy on the module
// https://stackoverflow.com/a/54245672
import * as getAuctionHouseInfo from "src/utils/solana/getAuctionHouseInfo";
import getAuctionHouseInfoImpl from "src/utils/solana/getAuctionHouseInfoImpl";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import getEnvironment from "src/utils/getEnvironment";

export default function mockGetAuctionHouseInfo() {
  const spy = jest.spyOn(getAuctionHouseInfo, "default");
  spy.mockImplementation((currency, environment) =>
    getAuctionHouseInfoImpl(
      currency ?? CurrencyNameExpress_Enum.Solana,
      environment ?? getEnvironment()
    )
  );
}
