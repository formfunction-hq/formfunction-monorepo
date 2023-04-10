import {
  Context,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import AnchorWallet from "types/AnchorWallet";
import SolanaNetworkHealth from "formfn-shared/dist/types/enums/SolanaNetworkHealth";
import getSolanaNetworkHealth from "formfn-shared/dist/utils/solana/health/getSolanaNetworkHealth";
import getRpcHostFromNetwork from "utils/solana/misc/getRpcHostFromNetwork";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import flattenArrayOfObjectsToObject from "formfn-shared/dist/utils/object/flattenArrayOfObjectsToObject";
import {
  Connection,
  PublicKey,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import LocalStoragePrefix from "types/enums/LocalStoragePrefix";
import Network from "types/enums/Network";
import {
  AuctionHouseSdk,
  loadAuctionHouseProgramWithWallet,
} from "@formfunction-hq/formfunction-auction-house";
import FormfnGumdropSdk from "@formfunction-hq/formfunction-gumdrop";
import getSolanaNetwork from "utils/env/getSolanaNetwork";
import getAuctionHouseInfo from "utils/solana/misc/getAuctionHouseInfo";
import getSignature from "utils/local-storage/getSignature";
import useFlagsTyped from "hooks/useFlagsTyped";
import axios from "axios";
import getRestUrl from "utils/env/getRestUrl";
import removeWithPrefix from "utils/local-storage/removeWithPrefix";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import { message } from "components/toast/messages";
import getEnvironment from "utils/getEnvironment";
import setLocalStorage from "utils/local-storage/setLocalStorage";
import LocalStorageKey from "types/enums/LocalStorageKey";
import getWalletWindowObject, {
  WalletWindowObject,
} from "utils/solana/wallet/getWalletWindowObject";
import getLocalStorage from "utils/local-storage/getLocalStorage";
import getGlowWallet from "utils/solana/wallet/getGlowWallet";
import useRpcRetryUrls from "hooks/useRpcRetryUrls";
import shouldUseJwtAuth from "utils/auth/shouldUseJwtAuth";
import useColorModeContext from "hooks/useColorModeContext";
import removeLocalStorage from "utils/local-storage/removeLocalStorage";
import trackMixpanelEvent from "utils/mixpanel/trackMixpanelEvent";
import MixpanelEvent from "types/enums/MixpanelEvent";
import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";
import Currency from "types/relay/Currency";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import CURRENCIES from "constants/Currencies";
import getAuctionHouseConstants from "utils/solana/misc/getAuctionHouseConstants";
import getPhantomWallet from "utils/solana/wallet/getPhantomWallet";
import getSolflareWallet from "utils/solana/wallet/getSolflareWallet";
import WalletName from "types/enums/WalletName";
import FormfnCandyMachineSdk from "@formfunction-hq/formfunction-candy-machine";
import getProgramSdkEnvironment from "utils/env/getProgramSdkEnvironment";
import getBackpackWallet from "utils/solana/wallet/getBackpackWallet";
import connectWallet from "utils/solana/connectWallet";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import NotifyErrorDescription from "types/enums/NotifyErrorDescription";
import getIsColdWallet from "utils/local-storage/getIsColdWallet";
import removeSignature from "utils/local-storage/removeSignature";

const defaultNetwork = getSolanaNetwork();
const defaultRpcHost = getRpcHostFromNetwork(defaultNetwork);
const defaultConnection = new Connection(
  defaultRpcHost,
  getLdBootstrap()?.frontendConnectionConfig ?? {}
);
const txTimeout = 240 * 1000; // milliseconds (confirm this works for your project)
// Determined by trial and error
const NUM_AUTOCONNECT_ATTEMPTS = 7;

export type FormfunctionWallet = {
  icon: string;
  name: WalletName;
  url: string;
};

export type MyAnchorWallet = AnchorWallet & {
  disconnect: () => void;
  signMessage: (
    data: Uint8Array,
    dataType: "utf8" | "hex"
  ) => Promise<{ publicKey: PublicKey; signature: Uint8Array }>;
  // Backpack's signMessage function takes different args and returns a
  // different type than Phantom/Glow/Solflare.
  signMessageBackpack?: (
    data: Uint8Array,
    publicKey: PublicKey
  ) => Promise<Uint8Array>;
  wallet: FormfunctionWallet;
};

export type SolanaContextData = {
  anchorWallet: MaybeUndef<MyAnchorWallet>;
  connection: Connection;
  disconnectWallet: () => void;
  getAuctionHouseSdk: (currency: Currency) => Maybe<AuctionHouseSdk>;
  getCandyMachineSdk: () => Maybe<FormfnCandyMachineSdk>;
  gumdropSdk: Maybe<FormfnGumdropSdk>;
  network: Network;
  networkHealth: Maybe<SolanaNetworkHealth>;
  setAnchorWallet: (val: MaybeUndef<MyAnchorWallet>) => void;
  setNetwork: (val: Network) => void;
  txTimeout: number;
  wallets: Array<FormfunctionWallet>;
};

export const SolanaContext: Context<SolanaContextData> =
  createContext<SolanaContextData>({
    anchorWallet: null,
    connection: defaultConnection,
    disconnectWallet: emptyFunction,
    getAuctionHouseSdk: (_currency: Currency) => null,
    getCandyMachineSdk: () => null,
    gumdropSdk: null,
    network: defaultNetwork,
    networkHealth: null,
    setAnchorWallet: emptyFunction,
    setNetwork: emptyFunction,
    txTimeout,
    wallets: [],
  });

const DEFAULT_AUCTION_HOUSE_SDKS = {
  Ash: null,
  Bonk: null,
  FamousFoxFederation: null,
  Particles: null,
  [RELAY_FUTURE_ADDED_VALUE]: null,
  SkeletonCrew: null,
  Solana: null,
  UsdCoin: null,
};

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function SolanaContextProvider(props: ProviderProps): JSX.Element {
  const { isDarkMode } = useColorModeContext();
  // For anchorWallet undefined is treated as loading/initialization state
  // and null is treated as error/could not load the wallet state.
  const [anchorWallet, setAnchorWalletOriginal] =
    useState<MaybeUndef<MyAnchorWallet>>(undefined);
  const [gumdropSdk, setGumdropSdk] = useState<Maybe<FormfnGumdropSdk>>(null);
  const [candyMachineSdk, setCandyMachineSdk] =
    useState<Maybe<FormfnCandyMachineSdk>>(null);
  const [networkHealth, setNetworkHealth] =
    useState<Maybe<SolanaNetworkHealth>>(null);
  const [auctionHouseSdks, setAuctionHouseSdks] = useState<
    Record<Currency, Maybe<AuctionHouseSdk>>
  >(DEFAULT_AUCTION_HOUSE_SDKS);
  const flags = useFlagsTyped();
  const [network, setNetwork] = useState(defaultNetwork);
  const connection = useMemo(
    () =>
      new Connection(getRpcHostFromNetwork(network, flags), {
        ...(getLdBootstrap()?.frontendConnectionConfig ?? {}),
        confirmTransactionInitialTimeout:
          flags.frontendConfirmTransactionInitialTimeout ?? 240 * 1000,
      }),
    [network, flags]
  );
  const rpcRetryUrls = useRpcRetryUrls();
  const env = getEnvironment();

  useEffect(() => {
    async function run() {
      const connections = rpcRetryUrls?.map(
        (rpc) => new Connection(rpc, { commitment: "confirmed" })
      ) ?? [connection];
      const health = await getSolanaNetworkHealth(
        connections,
        flags.solanaTpsLookbackInMinutes,
        // ? needed when running locally without Wrangler, to avoid errors in the browser console
        flags.solanaTpsCutoffs?.solanaDownTpsCutoff,
        flags.solanaTpsCutoffs?.solanaSlowTpsCutoff
      );

      setNetworkHealth(health.health);
    }

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAnchorWallet = useCallback(
    (initialWallet: MaybeUndef<MyAnchorWallet>) => {
      async function initializeAuctionHouseWithWallet(wallet: AnchorWallet) {
        const sdks = flattenArrayOfObjectsToObject(
          await Promise.all(
            CURRENCIES.map(async (currency) => {
              const { treasuryMint } = getAuctionHouseInfo(currency, env);
              const { programId, antiBotAuthority, authority } =
                getAuctionHouseConstants();
              const program = loadAuctionHouseProgramWithWallet(
                programId.toString(),
                wallet,
                network,
                getRpcHostFromNetwork(network, flags)
              );
              const sdk = AuctionHouseSdk.init(program, {
                antiBotAuthority,
                treasuryMint,
                walletAuthority: authority,
                walletCreator: authority,
              });
              return { [currency as Currency]: sdk };
            })
          )
        );

        setAuctionHouseSdks(sdks);

        // Comment out for now to make bundle smaller, since we're not using this
        // if (flags.enableFirebaseLogin) {
        //   await loginFirebase(wallet.publicKey.toString());
        // }
      }

      const walletWithPublicKey =
        initialWallet == null
          ? initialWallet
          : {
              ...initialWallet,
              publicKey: new PublicKey(initialWallet.publicKey),
            };

      if (walletWithPublicKey == null) {
        setAnchorWalletOriginal(walletWithPublicKey);
        return;
      }

      // Note: Need to update local storage first to avoid race conditions with queries.
      setLocalStorage(
        LocalStorageKey.PublicKey,
        walletWithPublicKey.publicKey.toString()
      );
      setAnchorWalletOriginal(walletWithPublicKey);
      initializeAuctionHouseWithWallet(walletWithPublicKey);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  useEffect(() => {
    const wallet = anchorWallet;
    if (wallet != null) {
      const environment = getProgramSdkEnvironment(env);
      setGumdropSdk(new FormfnGumdropSdk({ connection, environment, wallet }));
    }
  }, [anchorWallet, connection, env]);

  useEffect(() => {
    const wallet = anchorWallet;
    if (wallet != null) {
      const environment = getProgramSdkEnvironment(env);
      setCandyMachineSdk(
        new FormfnCandyMachineSdk({ connection, environment, wallet })
      );
    }
  }, [anchorWallet, connection, env]);

  const pubkeyToVerify = anchorWallet?.publicKey?.toString();
  useEffect(() => {
    if (pubkeyToVerify == null) {
      return;
    }

    async function run() {
      const signature = getSignature(pubkeyToVerify!);
      if (signature == null || signature === "") {
        return;
      }

      const headers = {
        "X-Solana-Public-Key": pubkeyToVerify!,
        "X-Solana-Sig": signature,
      };
      const [verifiedResponse, _loginResponse] = await Promise.all([
        axios.get(getRestUrl("verifySignature"), {
          headers,
        }),
        shouldUseJwtAuth(env, flags.enableJwtAuth)
          ? axios.get(getRestUrl("login"), {
              headers,
              // Needed to set cookie
              withCredentials: true,
            })
          : Promise.resolve(),
      ]);
      const { verified } = verifiedResponse.data;
      if (verified === false) {
        logError(
          AnalyticsEvent.VerificationError,
          `Public key ${pubkeyToVerify} and signature ${signature} failed to verify`,
          { pubkeyToVerify, signature }
        );
        notifyUnexpectedError(
          NotifyErrorDescription.UnexpectedErrorPleaseRefresh
        );
        setAnchorWallet(null);
        // Clear signature, it is not valid
        removeWithPrefix(LocalStoragePrefix.Signature, pubkeyToVerify!);
      }
    }

    run();
  }, [pubkeyToVerify, setAnchorWallet, env, flags]);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getGlowWallet(isDarkMode),
      getBackpackWallet(),
    ],
    [isDarkMode]
  );

  useEffect(() => {
    let tries = 0;

    async function run() {
      const lastUsedWalletName =
        getLocalStorage(LocalStorageKey.LastUsedWalletName) ??
        WalletName.Phantom;
      const walletWindowObject = getWalletWindowObject(
        lastUsedWalletName as WalletName
      );

      if (walletWindowObject == null && tries < NUM_AUTOCONNECT_ATTEMPTS) {
        tries++;
        setTimeout(() => run(), 50);
        return;
      }

      // If walletWindowObject is still null we couldn't connect to the wallet.
      if (walletWindowObject == null) {
        setAnchorWallet(null);
        return;
      }

      async function trySetAnchorWallet(
        walletWindow: WalletWindowObject,
        publicKey: Maybe<PublicKey>
      ) {
        let connectedPublicKey: Maybe<PublicKey> = publicKey;
        try {
          if (connectedPublicKey == null) {
            // Will either automatically connect to the wallet, or do nothing.
            connectedPublicKey = await connectWallet(walletWindow, {
              onlyIfTrusted: true,
            });
          }

          if (getIsColdWallet(connectedPublicKey) == null) {
            // We need to know if the connected wallet is a ledger. If we do
            // not already have this info for the connected pubkey, then force them
            // to go through the "sign auth message" flow again.
            removeSignature(connectedPublicKey);
          }

          const signature = getSignature(connectedPublicKey.toString());
          if (signature == null || signature.length === 0) {
            walletWindow.disconnect();
            setAnchorWallet(null);
            return;
          }

          setAnchorWallet({
            disconnect: walletWindow.disconnect,
            publicKey: new PublicKey(connectedPublicKey.toString()),
            signAllTransactions: walletWindow.signAllTransactions,
            signMessage: walletWindow.signMessage,
            signTransaction: (tx: Transaction) =>
              walletWindow.signTransaction(
                tx,
                getSolanaNetwork()
              ) as Promise<Transaction>,
            signVersionedTransaction: (tx: VersionedTransaction) =>
              walletWindow.signTransaction(
                tx,
                getSolanaNetwork()
              ) as Promise<VersionedTransaction>,
            wallet:
              [...wallets, getGlowWallet(isDarkMode)].find(
                (wallet) => wallet.name === lastUsedWalletName
              ) ?? getPhantomWallet(),
          });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          // Do nothing
          setAnchorWallet(null);
        }
      }

      trySetAnchorWallet(walletWindowObject, null);

      const accountChangedHandler = (publicKey: PublicKey) => {
        trySetAnchorWallet(walletWindowObject, publicKey);
      };

      window.glowSolana?.on("accountChanged", accountChangedHandler);
      window.solana?.on("accountChanged", accountChangedHandler);
      // Currently solflare doesn't support this event
    }

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAnchorWallet, wallets]);

  const disconnectWallet = () => {
    if (anchorWallet != null) {
      anchorWallet.disconnect();
    }

    trackMixpanelEvent(MixpanelEvent.WalletDisconnectedByUser, {
      wallet: anchorWallet?.wallet?.name,
    });
    setAnchorWallet(null);
    // Note: We don't clear the LocalStoragePrefix.Signature here to provide
    // a better UX for the user if they re-connect the same wallet.
    removeLocalStorage(LocalStorageKey.PublicKey);
    message({ content: "Wallet disconnected" });
  };

  return (
    <SolanaContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        anchorWallet,
        connection,
        disconnectWallet,
        getAuctionHouseSdk: (currency: Currency) => auctionHouseSdks[currency],
        getCandyMachineSdk: () => candyMachineSdk,
        gumdropSdk,
        network,
        networkHealth,
        setAnchorWallet,
        setNetwork,
        txTimeout,
        wallets,
      }}
    >
      {props.children}
    </SolanaContext.Provider>
  );
}
