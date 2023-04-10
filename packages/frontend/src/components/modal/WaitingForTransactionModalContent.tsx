import LoadingSpinner from "components/loading/LoadingSpinner";
import Body1 from "components/text/Body1";
import Header3 from "components/text/Header3";
import ColorClass from "types/enums/ColorClass";
import styles from "css/modal/WaitingForTransactionModalContent.module.css";
import ColorValue from "types/enums/ColorValue";
import TinyLabel from "components/text/TinyLabel";

export type WaitingForTransactionModalContentProps = {
  message?: string;
  tinyLabel?: JSX.Element | string;
  title?: JSX.Element | string;
};

export default function WaitingForTransactionModalContent({
  message,
  tinyLabel,
  title = "Please approve the transaction on your wallet.",
}: WaitingForTransactionModalContentProps) {
  return (
    <div className={styles.waitingForTransaction}>
      {typeof tinyLabel === "string" ? (
        <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
          {tinyLabel}
        </TinyLabel>
      ) : (
        tinyLabel
      )}
      {typeof title === "string" ? (
        <Header3 colorClass={ColorClass.Primary} textAlign="center">
          {title}
        </Header3>
      ) : (
        title
      )}
      {message && (
        <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
          {message}
        </Body1>
      )}
      <LoadingSpinner
        className={styles.waitingForTransactionLoadingSpinner}
        colorValue={ColorValue.BrightPurple}
        size={48}
      />
    </div>
  );
}
