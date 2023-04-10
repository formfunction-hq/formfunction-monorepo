import { PublicKey } from "@solana/web3.js";
import { WalletWindowObject } from "utils/solana/wallet/getWalletWindowObject";

export default async function connectWallet(
  windowObject: WalletWindowObject,
  args?: {
    onlyIfTrusted: boolean;
  }
): Promise<PublicKey> {
  if (windowObject.isConnected === true && windowObject.publicKey != null) {
    return windowObject.publicKey;
  }

  const res = await windowObject.connect(args);
  if (res?.publicKey != null) {
    return res.publicKey;
  }

  return windowObject.publicKey!;
}
