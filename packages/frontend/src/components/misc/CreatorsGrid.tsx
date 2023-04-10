import styles from "css/misc/CreatorsGrid.module.css";

type Props = {
  children: any;
};

export default function CreatorsGrid({ children }: Props): JSX.Element {
  return <div className={styles.grid}>{children}</div>;
}
