import { PublicKey } from "@solana/web3.js";
import { Maybe } from "types/UtilityTypes";

export default function getCreatorsForExecuteSale(
  creators: Maybe<
    ReadonlyArray<{
      readonly address: string;
    }>
  >
) {
  return creators?.map((creator) => ({
    isSigner: false,
    isWritable: true,
    pubkey: new PublicKey(creator.address),
  }));
}
