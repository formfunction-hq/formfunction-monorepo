import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";
import { AccountInfo, Commitment, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getBalanceForMint from "formfn-shared/dist/utils/solana/getBalanceForMint";
import getConnection from "src/utils/solana/getConnection";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

export default async function getBuyerEscrowBalance(
  auctionHouseSdk: AuctionHouseSdk,
  userId: string,
  mint: string,
  commitment?: Commitment
): Promise<{
  balance: number;
  escrowPaymentAccount: PublicKey;
  escrowPaymentAccountInfo: Maybe<AccountInfo<Buffer>>;
}> {
  const [escrowPaymentAccount] = await auctionHouseSdk.findBuyerEscrow(
    new PublicKey(userId),
    new PublicKey(mint as string)
  );

  const [escrowPaymentAccountInfo, escrowPaymentAccountBalance] =
    await Promise.all([
      ConnectionWrapper.getAccountInfo(escrowPaymentAccount, commitment),
      getBalanceForMint(
        getConnection(),
        auctionHouseSdk.treasuryMint,
        escrowPaymentAccount,
        false
      ),
    ]);

  return {
    balance: escrowPaymentAccountBalance ?? 0,
    escrowPaymentAccount,
    escrowPaymentAccountInfo,
  };
}
