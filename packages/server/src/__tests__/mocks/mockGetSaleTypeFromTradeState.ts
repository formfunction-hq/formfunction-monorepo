// Need to import this way in order to spy on the module
// https://stackoverflow.com/a/54245672
import * as getSaleTypeFromTradeState from "src/utils/solana/txs/parse/getSaleTypeFromTradeState";
import SaleType from "@formfunction-hq/formfunction-auction-house/dist/types/enum/SaleType";
import { PublicKey } from "@solana/web3.js";

export default function mockGetSaleTypeFromTradeState(saleType: SaleType) {
  const spy = jest.spyOn(getSaleTypeFromTradeState, "default");
  spy.mockImplementation(async (_tradeStateAccount: PublicKey) => saleType);
}
