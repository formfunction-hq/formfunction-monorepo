// Need to import this way in order to spy on the module
// https://stackoverflow.com/a/54245672
import * as getTokenAccountOwner from "src/utils/solana/accounts/getTokenAccountOwner";
import { PublicKey } from "@solana/web3.js";

export default function mockGetTokenAccountOwner(tokenAccountOwner: string) {
  const spy = jest.spyOn(getTokenAccountOwner, "default");
  spy.mockImplementation(async (_tokenAccount: PublicKey) => tokenAccountOwner);
}
