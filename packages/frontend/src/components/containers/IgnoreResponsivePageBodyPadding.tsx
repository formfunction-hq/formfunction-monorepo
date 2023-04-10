import styles from "css/containers/IgnoreResponsivePageBodyPadding.module.css";
import invariant from "tiny-invariant";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  ignoreBottomPadding: boolean;
  ignoreTopPadding: boolean;
};

// Ignore padding introduced by ResponsivePageBody component
// higher up in the component tree. Since ResponsivePageBody
// adds vertical padding, it is possible to specify which
// direction to remove from.
//
// Must be kept in sync with ResponsivePageBody styling.
export default function IgnoreResponsivePageBodyPadding({
  children,
  ignoreBottomPadding,
  ignoreTopPadding,
}: Props) {
  invariant(
    ignoreTopPadding || ignoreBottomPadding,
    "One of ignoreTopPadding or ignoreBottomPadding must be true"
  );
  return (
    <div
      className={joinClasses(
        ignoreBottomPadding === true ? styles.bottom : null,
        ignoreTopPadding === true ? styles.top : null
      )}
    >
      {children}
    </div>
  );
}
