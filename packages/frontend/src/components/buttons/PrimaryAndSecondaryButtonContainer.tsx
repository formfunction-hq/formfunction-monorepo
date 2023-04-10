import styles from "css/buttons/PrimaryAndSecondaryButtonContainer.module.css";

type Props = {
  children: any;
};

export default function PrimaryAndSecondaryButtonContainer({
  children,
}: Props) {
  return <div className={styles.buttons}>{children}</div>;
}
