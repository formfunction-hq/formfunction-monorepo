import BodyText from "components/text/BodyText";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";

type Props = {
  children: any;
  fontClass: FontClass;
  marginTop?: number;
  textAlign?: "center" | "left";
};

export default function ErrorMessage({
  children,
  fontClass,
  marginTop = 24,
  textAlign = "center",
}: Props): JSX.Element {
  return (
    <BodyText
      colorClass={ColorClass.Error}
      fontClass={fontClass}
      style={{ marginTop }}
      textAlign={textAlign}
    >
      {children}
    </BodyText>
  );
}
