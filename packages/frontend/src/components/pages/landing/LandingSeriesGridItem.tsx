import GridItem from "components/auction/GridItem";
import styles from "css/pages/landing/LandingSeriesGridItem.module.css";

type Props = {
  children: any;
};

export default function LandingSeriesGridItem({ children }: Props) {
  return (
    <GridItem>
      <div className={styles.inner}>{children}</div>
    </GridItem>
  );
}
