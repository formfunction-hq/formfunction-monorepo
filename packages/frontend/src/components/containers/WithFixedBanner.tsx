import styles from "css/containers/WithFixedBanner.module.css";
import useBottomTabsContext from "hooks/useBottomTabsContext";

type Props = {
  banner: JSX.Element;
  bannerPosition: "top" | "bottom";
  children: any;
  offset: number;
};

export default function WithFixedBanner({
  banner,
  bannerPosition,
  children,
  offset,
}: Props): JSX.Element {
  const { hasBottomTabs, bottomTabsHeight } = useBottomTabsContext();

  return (
    <div className={styles.container}>
      <div
        style={{
          borderBottom: hasBottomTabs
            ? "1px solid var(--color-ghost)"
            : undefined,
          bottom:
            bannerPosition === "bottom" ? offset + bottomTabsHeight : undefined,
          top: bannerPosition === "top" ? offset : undefined,
        }}
        className={styles.banner}
      >
        {banner}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
