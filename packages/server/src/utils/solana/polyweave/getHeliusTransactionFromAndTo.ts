import { PublicKey } from "@solana/web3.js";
import HeliusTransactionType from "src/types/enums/helius/HeliusTransactionType";
import HeliusTransaction from "src/types/HeliusTransaction";

export default function getHeliusTransactionFromAndTo(tx: HeliusTransaction): {
  from: PublicKey;
  to: PublicKey;
} {
  switch (tx.type) {
    case HeliusTransactionType.NftSale:
      return {
        from: new PublicKey(tx.seller),
        to: new PublicKey(tx.buyer),
      };
    case HeliusTransactionType.NftBid:
    default:
      // NOTE: we do not use assertUnreachable because HeliusTransactionType is not exhaustive,
      // and there are other cases which are covered by "default".
      return {
        from: new PublicKey(tx.buyer),
        to: new PublicKey(tx.seller),
      };
  }
}
