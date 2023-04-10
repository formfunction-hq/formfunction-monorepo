import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";

type Props = {
  children: any;
  href: string;
};

export default function ActivityNotificationActionButton({
  children,
  href,
}: Props) {
  return (
    <ButtonWithText
      buttonTheme={ButtonTheme.PurpleGradient}
      fontClass={FontClass.Body1Medium}
      href={href}
      type="link_internal"
    >
      {children}
    </ButtonWithText>
  );
}
