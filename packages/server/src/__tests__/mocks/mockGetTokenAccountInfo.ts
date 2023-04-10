// Need to import this way in order to spy on the module
// https://stackoverflow.com/a/54245672
import * as getTokenAccountInfo from "src/utils/solana/getTokenAccountInfo";
import { PublicKey } from "@solana/web3.js";
import { TokenAccountInfo } from "src/utils/solana/getTokenAccountInfo";

export default function mockGetTokenAccountInfo(
  tokenAccountInfo: Partial<TokenAccountInfo>
) {
  const spy = jest.spyOn(getTokenAccountInfo, "default");
  spy.mockImplementation(async (_tokenAccount: PublicKey) => ({
    delegate: "",
    delegatedAmount: {
      amount: "",
      decimals: 1,
      uiAmount: 1,
      uiAmountString: "",
    },
    isNative: true,
    mint: "",
    owner: "",
    state: "",
    tokenAmount: {
      amount: "",
      decimals: 1,
      uiAmount: 1,
      uiAmountString: "",
    },
    ...tokenAccountInfo,
  }));
}
