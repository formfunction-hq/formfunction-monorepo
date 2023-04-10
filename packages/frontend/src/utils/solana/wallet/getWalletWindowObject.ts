/* eslint-disable typescript-sort-keys/interface */
import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import Network from "types/enums/Network";
import WalletName from "types/enums/WalletName";

const WALLET_WINDOW_PROPERTY: Record<WalletName, string> = {
  [WalletName.Backpack]: "backpack",
  [WalletName.Glow]: "glowSolana",
  [WalletName.Phantom]: "solana",
  [WalletName.Solflare]: "solflare",
};

type Event = "disconnect" | "connect" | "accountChanged" | "update";

export type WalletWindowObject = {
  // NOTE: this type is not accurate for Backpack or Solflare, see connectWallet
  // for more info
  connect: (args?: {
    onlyIfTrusted: boolean;
  }) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => void;
  signAllTransactions: (
    transactions: Array<Transaction>
  ) => Promise<Array<Transaction>>;
  // NOTE: this type is actually not accurate for Backpack
  signMessage: (
    data: Uint8Array,
    dataType?: "utf8" | "hex"
  ) => Promise<{ publicKey: PublicKey; signature: Uint8Array }>;

  signTransaction: (
    transaction: Transaction | VersionedTransaction,
    env?: Network
  ) => Promise<Transaction | VersionedTransaction>;

  // Backpack fields
  isConnected?: boolean;
  publicKey?: PublicKey;
  on: (event: Event, handler: (args: any) => void) => void;
};

// TODO: should make return type dependent on the value of walletName, since different
// wallets have slightly different APIs.
export default function getWalletWindowObject(
  walletName: WalletName
): Maybe<WalletWindowObject> {
  const windowProperty = WALLET_WINDOW_PROPERTY[walletName];

  if (windowProperty == null) {
    return null;
  }

  // @ts-ignore
  return window[windowProperty];
}
