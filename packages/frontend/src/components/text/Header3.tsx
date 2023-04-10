import FontClass from "types/enums/FontClass";
import HeaderText from "components/text/HeaderText";
import type { Props } from "components/text/HeaderText";

export default function Header3(props: Omit<Props, "fontClass">) {
  return <HeaderText {...props} fontClass={FontClass.Header3} />;
}
