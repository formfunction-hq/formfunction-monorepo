import styles from "css/buttons/PrimaryAndSecondaryButtonContainerForModal.module.css";
import PrimaryAndSecondaryButtonContainer from "./PrimaryAndSecondaryButtonContainer";

type Props = {
  children: any;
};

export default function PrimaryAndSecondaryButtonContainerForModal({
  children,
}: Props) {
  return (
    <div className={styles.container}>
      <PrimaryAndSecondaryButtonContainer>
        {children}
      </PrimaryAndSecondaryButtonContainer>
    </div>
  );
}
