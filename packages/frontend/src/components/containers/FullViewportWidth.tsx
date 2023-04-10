import styles from "css/containers/FullViewportWidth.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
};

// Make the wrapped component to span the full viewport width
// and ignore padding introduced by components higher up in the
// component tree.
export default function FullViewportWidth({ children, className }: Props) {
  return (
    <div className={joinClasses(styles.container, className)}>{children}</div>
  );
}
