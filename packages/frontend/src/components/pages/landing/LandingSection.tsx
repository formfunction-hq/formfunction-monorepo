import joinClasses from "utils/joinClasses";
import styles from "css/pages/landing/LandingSection.module.css";

type Props = {
  children: any;
  className?: string;
  disableBottomPadding?: boolean;
  disableTopPadding?: boolean;
};

/**
 * A container component used to ensure consistent vertical padding for landing page sections.
 */
export default function LandingSection({
  children,
  className,
  disableBottomPadding = false,
  disableTopPadding = false,
}: Props) {
  return (
    <div
      className={joinClasses(styles.container, className)}
      style={{
        paddingBottom: disableBottomPadding ? 0 : undefined,
        paddingTop: disableTopPadding ? 0 : undefined,
      }}
    >
      {children}
    </div>
  );
}
