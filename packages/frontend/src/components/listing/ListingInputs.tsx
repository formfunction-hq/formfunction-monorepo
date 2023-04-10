import styles from "css/listing/ListingInputs.module.css";

type Props = {
  children: any;
};

export default function ListingInputs({ children }: Props) {
  return <div className={styles.inputs}>{children}</div>;
}
