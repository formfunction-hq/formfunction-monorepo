import styles from "css/banner/Banner.module.css";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import joinClasses from "utils/joinClasses";

type Props = {
  backgroundColorClass: BackgroundColorClass;
  children: any;
};

export default function Banner({ backgroundColorClass, children }: Props) {
  return (
    <div className={joinClasses(styles.container, backgroundColorClass)}>
      {children}
    </div>
  );
}
