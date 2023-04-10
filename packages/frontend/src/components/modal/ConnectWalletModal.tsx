import GenericModal from "components/modal/GenericModal";
import Header3 from "components/text/Header3";
import ColorClass from "types/enums/ColorClass";
import styles from "css/modal/ConnectWalletModal.module.css";
import PlainButton from "components/buttons/PlainButton";
import Price from "components/text/Price";
import joinClasses from "utils/joinClasses";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import Body1 from "components/text/Body1";
import { useState } from "react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import FontClass from "types/enums/FontClass";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import { message } from "components/toast/messages";
import useSolanaContext from "hooks/useSolanaContext";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import signAuthMessage from "utils/solana/misc/signAuthMessage";
import logEvent from "utils/analytics/logEvent";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import { FormfunctionWallet } from "context/SolanaContext";
import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getWalletWindowObject, {
  WalletWindowObject,
} from "utils/solana/wallet/getWalletWindowObject";
import setLocalStorage from "utils/local-storage/setLocalStorage";
import LocalStorageKey from "types/enums/LocalStorageKey";
import getSolanaNetwork from "utils/env/getSolanaNetwork";
import trackMixpanelEvent from "utils/mixpanel/trackMixpanelEvent";
import MixpanelEvent from "types/enums/MixpanelEvent";
import signAuthMessageForLedger from "utils/solana/misc/signAuthMessageForLedger";
import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import PlainExternalLink from "components/link/PlainExternalLink";
import WalletName from "types/enums/WalletName";
import connectWallet from "utils/solana/connectWallet";
import setWalletType from "utils/local-storage/setWalletType";
import getIsColdWallet from "utils/local-storage/getIsColdWallet";
import removeSignature from "utils/local-storage/removeSignature";

declare global {
  interface Window {
    backpack: WalletWindowObject;
    glowSolana: WalletWindowObject;
    solana: WalletWindowObject;
    solflare: WalletWindowObject;
  }
}

export enum WalletType {
  ColdWallet = "ColdWallet",
  HotWallet = "HotWallet",
}

enum ConnectWalletStep {
  ChooseWalletStep = "ChooseWalletStep",
  ConnectWalletStep = "ConnectWalletStep",
}

const WALLET_LINKS: Record<WalletName, string> = {
  [WalletName.Backpack]: "https://www.backpack.app/",
  [WalletName.Glow]: "https://glow.app/download",
  [WalletName.Phantom]: "https://phantom.app/download",
  [WalletName.Solflare]: "https://solflare.com/#devices-available",
};

const WALLET_STYLES: Record<WalletName, string> = {
  [WalletName.Backpack]: styles.walletBackpack,
  [WalletName.Glow]: styles.walletGlow,
  [WalletName.Phantom]: styles.walletPhantom,
  [WalletName.Solflare]: styles.walletSolflare,
};

function WalletButton({
  colorClass,
  onClick,
  wallet,
}: {
  colorClass?: ColorClass;
  onClick: () => void;
  wallet: FormfunctionWallet;
}): JSX.Element {
  return (
    <PlainButton
      className={joinClasses(styles.wallet, WALLET_STYLES[wallet.name])}
      onClick={onClick}
    >
      <img className={styles.icon} src={wallet.icon} />
      <Price colorClass={colorClass ?? ColorClass.White}>{wallet.name}</Price>
    </PlainButton>
  );
}

function ConnectWalletBody({
  walletType,
}: {
  walletType: WalletType;
}): JSX.Element {
  const ledgerDescription = (
    <>
      . Since you are using a hardware wallet, this will look like a regular
      transaction, because{" "}
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.BrightPurple}
        display="inline"
        href="https://help.formfunction.xyz/en/articles/6474245-using-formfunction-with-a-ledger"
        type="link_external"
      >
        Ledger does not support signing messages
      </TextButton>
      . Note that the transaction will not be sent, and you will <b>NOT</b> be
      charged for it
    </>
  );

  return (
    <div className={styles.body}>
      <Header3
        className={styles.bodyTitle}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        Please connect your wallet to continue.
      </Header3>
      <Body1
        className={styles.connectWalletDescription}
        colorClass={ColorClass.Secondary}
        textAlign="center"
      >
        Formfunction uses your wallet as your account—just follow these steps to
        start using Formfunction:
        <ol className={styles.ol}>
          <li>
            Press &ldquo;Connect&rdquo; on your browser&apos;s wallet extension.
          </li>
          <li>
            Approve the signature request
            {walletType === WalletType.ColdWallet && ledgerDescription}.
          </li>
        </ol>
        <i />
      </Body1>
      <LoadingSpinner
        className={styles.loadingSpinner}
        colorValue={ColorValue.BrightPurple}
        size={48}
      />
    </div>
  );
}

function NeedToInstall({
  href,
  name,
  nameLong,
  onBack,
}: {
  href: string;
  name: string;
  nameLong?: string;
  onBack: () => void;
}): JSX.Element {
  return (
    <div className={styles.needInstall}>
      <Header3
        className={styles.bodyTitle}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        You need to install {name}
      </Header3>
      <Body1
        className={styles.connectWalletDescription}
        colorClass={ColorClass.Secondary}
        textAlign="center"
      >
        You need to install {nameLong ?? name} before using it to connect to
        Formfunction. Go{" "}
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Secondary}
          display="inline"
          fontClass={FontClass.Body1}
          href={href}
          textDecoration="underline"
          type="link_external"
        >
          here
        </TextButton>{" "}
        to install it.
      </Body1>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        className={styles.backButton}
        fontClass={FontClass.NavLink}
        onClick={onBack}
      >
        Back
      </ButtonWithText>
    </div>
  );
}

function NeedToInstallWallet({
  onBack,
  wallet,
}: {
  onBack: () => void;
  wallet: FormfunctionWallet;
}): JSX.Element {
  return (
    <NeedToInstall
      href={WALLET_LINKS[wallet.name]}
      name={wallet.name}
      onBack={onBack}
    />
  );
}

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function ConnectWalletModal({
  isShown,
  onHide,
}: Props): JSX.Element {
  const [step, setStep] = useState(ConnectWalletStep.ChooseWalletStep);
  const [isInstallNeeded, setIsInstallNeeded] =
    useState<Maybe<FormfunctionWallet>>(null);
  const { connection, setAnchorWallet, wallets } = useSolanaContext();
  const [selectedWalletType, setSelectedWalletType] = useState<WalletType>(
    WalletType.HotWallet
  );

  const onHideAndResetStep = () => {
    setStep(ConnectWalletStep.ChooseWalletStep);
    setIsInstallNeeded(null);
    onHide();
  };

  const onSelectWallet = async (wallet: FormfunctionWallet) => {
    const windowObject = getWalletWindowObject(wallet.name);
    if (windowObject == null) {
      setIsInstallNeeded(wallet);
      return;
    }

    setStep(ConnectWalletStep.ConnectWalletStep);

    const catchFn = () => {
      setStep(ConnectWalletStep.ChooseWalletStep);
    };

    const cleanupFn = () => {
      message({ content: "Wallet connected!" });
      onHideAndResetStep();
    };

    try {
      const publicKey = await connectWallet(windowObject);
      const anchorWallet = {
        disconnect: windowObject.disconnect,
        publicKey,
        signAllTransactions: windowObject.signAllTransactions,
        signMessage: windowObject.signMessage,
        signMessageBackpack: (msg: Uint8Array, pubkey: PublicKey) =>
          window.backpack.signMessage(msg, pubkey as any) as any,
        signTransaction: (tx: Transaction) =>
          windowObject.signTransaction(
            tx,
            wallet.name === WalletName.Glow ? getSolanaNetwork() : undefined
          ) as Promise<Transaction>,
        signVersionedTransaction: (tx: VersionedTransaction) =>
          windowObject.signTransaction(
            tx,
            wallet.name === WalletName.Glow ? getSolanaNetwork() : undefined
          ) as Promise<VersionedTransaction>,
        wallet,
      };
      let didSignAuthMessage = false;

      if (getIsColdWallet(publicKey) == null) {
        // We need to know if the connected wallet is a ledger. If we do
        // not already have this info for the connected pubkey, then force them
        // to go through the "sign auth message" flow again.
        removeSignature(publicKey);
      }

      switch (selectedWalletType) {
        case WalletType.ColdWallet:
          didSignAuthMessage = await signAuthMessageForLedger(
            anchorWallet,
            connection
          );
          break;
        case WalletType.HotWallet:
          didSignAuthMessage = await signAuthMessage(anchorWallet);
          break;
        default:
          assertUnreachable(selectedWalletType);
      }
      setWalletType(publicKey, selectedWalletType);
      // Make sure to set this after signAuthMessage finishes, otherwise modal will disappear
      setAnchorWallet(anchorWallet);
      setLocalStorage(LocalStorageKey.LastUsedWalletName, wallet.name);
      trackMixpanelEvent(MixpanelEvent.WalletConnectedByUser, {
        // Log this because if it is false, then we can't trust the value of walletType
        didSignAuthMessage,
        wallet: wallet.name,
        walletType: selectedWalletType,
      });
      cleanupFn();

      logEvent(AnalyticsEvent.ConnectWallet, {
        publicKey: publicKey.toString(),
        walletName: wallet.name,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      catchFn();
    }
  };

  const chooseWallet = (
    <>
      <Header3 colorClass={ColorClass.Primary} textAlign="center">
        Welcome! Sign in with your wallet.
      </Header3>
      <div className={styles.wallets}>
        <CheckboxButtonWithLabel
          colorClass={ColorClass.Secondary}
          columnGap={12}
          fontClass={FontClass.Body2}
          label={
            <>
              Are you using a{" "}
              <PlainExternalLink href="https://help.formfunction.xyz/en/articles/6474268-why-should-i-use-a-hardware-wallet">
                hardware wallet
              </PlainExternalLink>
              ? (e.g. Ledger)
            </>
          }
          isActive={selectedWalletType === WalletType.ColdWallet}
          noBorder
          onClick={() =>
            setSelectedWalletType(
              selectedWalletType === WalletType.ColdWallet
                ? WalletType.HotWallet
                : WalletType.ColdWallet
            )
          }
        />
        {wallets.map((wallet) => (
          <WalletButton
            colorClass={wallet.name === "Glow" ? ColorClass.Primary : undefined}
            key={wallet.name}
            onClick={() => onSelectWallet(wallet)}
            wallet={wallet}
          />
        ))}
      </div>
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Secondary}
        className={styles.firstTimeButton}
        display="block"
        href="https://help.formfunction.xyz/en/articles/5870325-setting-up-your-phantom-wallet"
        textDecoration="underline"
        type="link_external"
      >
        First time using a wallet?
      </TextButton>
    </>
  );

  const getModalBodyForStep = () => {
    switch (step) {
      case ConnectWalletStep.ChooseWalletStep:
        return chooseWallet;
      case ConnectWalletStep.ConnectWalletStep:
        return <ConnectWalletBody walletType={selectedWalletType!} />;
      default:
        return assertUnreachable(step);
    }
  };

  return (
    <GenericModal isShown={isShown} onHide={onHideAndResetStep}>
      {isInstallNeeded != null ? (
        <NeedToInstallWallet
          onBack={() => setIsInstallNeeded(null)}
          wallet={isInstallNeeded!}
        />
      ) : (
        getModalBodyForStep()
      )}
    </GenericModal>
  );
}
