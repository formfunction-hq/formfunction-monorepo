import styles from "css/containers/IgnoreResponsiveContainerPadding.module.css";

type Props = {
  children: any;
};

export default function IgnoreResponsiveContainerPadding({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
