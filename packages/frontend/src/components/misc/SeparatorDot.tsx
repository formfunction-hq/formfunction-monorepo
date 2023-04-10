import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";
import FontClass from "types/enums/FontClass";

type Props = {
  colorClass: ColorClass;
  fontClass: FontClass;
};

export default function SeparatorDot({ colorClass, fontClass }: Props) {
  return <div className={joinClasses(colorClass, fontClass)}>•</div>;
}
