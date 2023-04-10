import GenericModal from "components/modal/GenericModal";
import styles from "css/modal/WaitingForTransactionModal.module.css";
import { notify } from "components/toast/notifications";
import WaitingForTransactionModalContent, {
  WaitingForTransactionModalContentProps,
} from "components/modal/WaitingForTransactionModalContent";

type Props = {
  isShown: boolean;
} & WaitingForTransactionModalContentProps;

export default function WaitingForTransactionModal({
  isShown,
  message,
  tinyLabel,
  title = "Please approve the transaction on your wallet.",
}: Props) {
  return (
    <GenericModal
      className={styles.waitingForTransactionModal}
      isShown={isShown}
      onHide={() =>
        notify({
          duration: 2,
          message: "Please wait until the transaction is confirmed",
          type: "info",
        })
      }
    >
      <WaitingForTransactionModalContent
        title={title}
        message={message}
        tinyLabel={tinyLabel}
      />
    </GenericModal>
  );
}
