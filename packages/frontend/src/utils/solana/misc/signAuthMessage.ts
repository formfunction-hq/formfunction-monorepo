import SIGN_AUTH_MESSAGE from "formfn-shared/dist/constants/SignAuthMessage";
import { MyAnchorWallet } from "context/SolanaContext";
import getSignature from "utils/local-storage/getSignature";
import WalletName from "types/enums/WalletName";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { PublicKey } from "@solana/web3.js";
import setSignature from "utils/local-storage/setSignature";

async function signMessage(
  anchorWallet: MyAnchorWallet,
  encodedMessage: Uint8Array
): Promise<{ hexString: string; publicKey: PublicKey; signature: Uint8Array }> {
  switch (anchorWallet.wallet.name) {
    case WalletName.Backpack: {
      const signature = await anchorWallet.signMessageBackpack!(
        encodedMessage,
        anchorWallet.publicKey
      );
      const hexString = Buffer.from(signature).toString("hex");
      return {
        hexString,
        publicKey: anchorWallet.publicKey,
        signature: signature as Uint8Array,
      };
    }
    case WalletName.Glow:
    case WalletName.Phantom:
    case WalletName.Solflare: {
      const signature = await anchorWallet.signMessage(encodedMessage, "utf8");
      const hexString = Buffer.from(signature.signature).toString("hex");
      return { hexString, ...signature };
    }
    default:
      return assertUnreachable(anchorWallet.wallet.name);
  }
}

export default async function signAuthMessage(
  anchorWallet: MyAnchorWallet
): Promise<boolean> {
  const existingSignature = getSignature(anchorWallet.publicKey.toString());

  if (existingSignature != null) {
    return false;
  }

  const encodedMessage = new TextEncoder().encode(SIGN_AUTH_MESSAGE);
  const { hexString } = await signMessage(anchorWallet, encodedMessage);

  setSignature(anchorWallet.publicKey, hexString);

  return true;
}
