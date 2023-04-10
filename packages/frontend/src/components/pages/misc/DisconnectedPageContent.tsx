import ConnectWalletButton from "components/buttons/ConnectWalletButton";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import Header3 from "components/text/Header3";
import styles from "css/pages/common/DisconnectedPage.module.css";
import ColorClass from "types/enums/ColorClass";
import getImgixUrl from "utils/getImgixUrl";

type Props = {
  disconnectedMessage?: string;
};

export default function DisconnectedPageContent({
  disconnectedMessage = "Sign in with your wallet to continue",
}: Props): JSX.Element {
  return (
    <ResponsivePageBody>
      <div className={styles.body}>
        <img
          className={styles.image}
          src={getImgixUrl("illustrations/wallet-cropped.png")}
        />
        <Header3
          className={styles.title}
          colorClass={ColorClass.Primary}
          textAlign="center"
        >
          {disconnectedMessage}
        </Header3>
        <div className={styles.connectWalletButton}>
          <ConnectWalletButton />
        </div>
      </div>
    </ResponsivePageBody>
  );
}
