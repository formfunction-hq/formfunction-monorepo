import ButtonWithText from "components/buttons/ButtonWithText";
import useUserContext from "hooks/useUserContext";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { useState } from "react";
import { TooltipPlacement } from "antd/lib/tooltip";
import PlainButton from "components/buttons/PlainButton";
import CreateModalOrPopover from "components/modal/CreateModalOrPopover";

export default function CreateButton({
  buttonOverride,
  onClick,
  placement,
}: {
  buttonOverride?: JSX.Element;
  onClick?: () => void;
  placement?: TooltipPlacement;
}) {
  const { user } = useUserContext();
  const [isPopoverOrBottomSheetOpen, setIsPopoverOrBottomSheetOpen] =
    useState(false);
  if (user == null) {
    return null;
  }

  const button =
    buttonOverride != null ? (
      <PlainButton
        onClick={() => {
          if (onClick != null) {
            onClick();
          }
          setIsPopoverOrBottomSheetOpen(true);
        }}
      >
        {buttonOverride}
      </PlainButton>
    ) : (
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        fontClass={FontClass.NavLink}
        onClick={() => {
          if (onClick != null) {
            onClick();
          }
          setIsPopoverOrBottomSheetOpen(true);
        }}
      >
        Create
      </ButtonWithText>
    );

  return (
    <CreateModalOrPopover
      button={button}
      isShown={isPopoverOrBottomSheetOpen}
      setIsShown={setIsPopoverOrBottomSheetOpen}
      placement={placement}
    />
  );
}
