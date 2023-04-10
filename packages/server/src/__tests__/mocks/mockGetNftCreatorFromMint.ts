// Need to import this way in order to spy on the module
// https://stackoverflow.com/a/54245672
import * as getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import { PublicKey } from "@solana/web3.js";

export default function mockGetNftCreatorFromMint(creatorAddress: string) {
  const spy = jest.spyOn(getNftCreatorFromMint, "default");
  spy.mockImplementation(async (_mint: PublicKey) => ({
    creator: null,
    creatorAddress,
  }));
}
