import FontClass from "types/enums/FontClass";
import type { Props as BodyTextProps } from "components/text/BodyText";
import BodyText from "components/text/BodyText";
import joinClasses from "utils/joinClasses";
import styles from "css/text/SpotlightTitle.module.css";

type Props = Omit<BodyTextProps, "fontClass"> & {
  truncateLines?: number;
};

export default function SpotlightTitle(props: Props) {
  const { truncateLines } = props;
  const joinedClassname = joinClasses(
    truncateLines != null ? styles.truncate : null,
    props.className
  );

  return (
    <BodyText
      {...{ ...props, className: joinedClassname, truncateLines: undefined }}
      style={
        truncateLines != null
          ? { WebkitLineClamp: truncateLines, lineClamp: truncateLines }
          : undefined
      }
      fontClass={FontClass.SpotlightTitle}
    >
      {props.children}
    </BodyText>
  );
}
