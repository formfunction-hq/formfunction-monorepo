import styles from "css/images/AssetWithShimmer.module.css";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
};

export default function AssetWithShimmer({ children, className }: Props) {
  return (
    <div
      className={joinClasses(styles.container, GlobalClass.HideText, className)}
    >
      {children}
    </div>
  );
}
