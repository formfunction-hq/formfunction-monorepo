import useSolanaContext from "hooks/useSolanaContext";
import ColorValue from "types/enums/ColorValue";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";
import LeaveIcon from "components/icons/LeaveIcon";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

type Props = {
  buttonStyle: "TextButton" | "ButtonWithText";
  onClick?: () => void;
};

export default function DisconnectWalletButton({
  onClick,
  buttonStyle,
}: Props): JSX.Element {
  const { disconnectWallet } = useSolanaContext();
  const onClickInner = () => {
    disconnectWallet();
    if (onClick != null) {
      onClick();
    }
  };
  switch (buttonStyle) {
    case "TextButton":
      return (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.NavLink}
          icon={<LeaveIcon colorValue={ColorValue.Primary} />}
          onClick={onClickInner}
        >
          Disconnect wallet
        </TextButton>
      );
    case "ButtonWithText":
      return (
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          onClick={onClickInner}
        >
          Disconnect Wallet
        </ButtonWithText>
      );
    default:
      assertUnreachable(buttonStyle);
  }
}
