import { PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

export type TokenAccountInfo = {
  delegate: string;
  delegatedAmount: {
    amount: string;
    decimals: number;
    uiAmount: number;
    uiAmountString: string;
  };
  isNative: boolean;
  mint: string;
  owner: string;
  state: string;
  tokenAmount: {
    amount: string;
    decimals: number;
    uiAmount: number;
    uiAmountString: string;
  };
};

export default async function getTokenAccountInfo(
  tokenAccount: PublicKey
): Promise<Maybe<TokenAccountInfo>> {
  const parsedAccountInfo = await ConnectionWrapper.getParsedAccountInfo(
    tokenAccount
  );

  const data = parsedAccountInfo.value?.data;

  if (data != null && "parsed" in data) {
    return data.parsed.info;
  }

  return null;
}
