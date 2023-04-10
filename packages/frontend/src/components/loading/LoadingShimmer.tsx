import styles from "css/loading/LoadingShimmer.module.css";

type Props = {
  borderRadius?: number;
  height?: number | string;
  minHeight?: number | string;
  position?: "static" | "relative" | "absolute" | "sticky" | "fixed";
};

export default function LoadingShimmer({
  borderRadius = 0,
  height = "100%",
  minHeight = "auto",
  position = "relative",
}: Props) {
  return (
    <div
      className={styles.shimmer}
      style={{ borderRadius, height, minHeight, position }}
    />
  );
}
