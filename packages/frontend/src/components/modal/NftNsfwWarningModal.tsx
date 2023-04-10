import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import FlexBox from "components/layout/FlexBox";
import GenericModal from "components/modal/GenericModal";
import Body1 from "components/text/Body1";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import useUserContext from "hooks/useUserContext";
import BackgroundOverlayTheme from "types/enums/BackgroundOverlayTheme";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function NftNsfwWarningModal({
  isShown,
  onHide,
}: Props): JSX.Element {
  const { user } = useUserContext();

  return (
    <GenericModal
      hideCloseButton
      isShown={isShown}
      backgroundOverlayTheme={BackgroundOverlayTheme.SensitiveContent}
      maxWidth={800}
      onHide={emptyFunction}
      title="This piece is NSFW"
      description={
        "The creator has marked this piece as NSFW (not safe for work)." +
        " Are you sure you want to see this piece?"
      }
    >
      <FlexBox flexDirection="column" alignItems="center" gap={24}>
        {user != null && (
          <div style={{ textAlign: "center" }}>
            <Body1 colorClass={ColorClass.Secondary} display="inline">
              You can turn this setting off{" "}
            </Body1>
            <TextButton
              fontClass={FontClass.Body1}
              buttonThemeOrColorClass={ColorClass.BrightPurple}
              display="inline"
              href="/profile/edit"
              type="link_internal"
            >
              in your profile settings.
            </TextButton>
          </div>
        )}
        <ButtonWithText
          fontClass={FontClass.NavLink}
          buttonTheme={ButtonTheme.PurpleGradient}
          onClick={onHide}
        >
          Continue to piece
        </ButtonWithText>
      </FlexBox>
    </GenericModal>
  );
}
