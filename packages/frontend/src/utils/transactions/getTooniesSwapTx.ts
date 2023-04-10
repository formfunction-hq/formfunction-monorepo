import { Transaction } from "@solana/web3.js";
import axios from "axios";
import getApiHeaders from "utils/api/getApiHeaders";
import getRestUrl from "utils/env/getRestUrl";

type SignedTxResponse = {
  tx: {
    data: Buffer;
    type: "Buffer";
  };
};

export default async function getTooniesSwapTx(
  nftToBeSwappedMint: string
): Promise<Transaction> {
  try {
    const url = getRestUrl("getTooniesSwapTx");
    const body = { nftToBeSwappedMint };
    const config = {
      headers: {
        ...getApiHeaders(),
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post<SignedTxResponse>(url, body, config);
    const tx = Transaction.from(response.data.tx.data);
    return tx;
  } catch (err: any) {
    throw new Error("An unexpected error occurred.");
  }
}
