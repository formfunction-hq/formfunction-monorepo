import ButtonWithPopover from "components/buttons/ButtonWithPopover";
import TextButton from "components/buttons/TextButton";
import ImageThinIcon from "components/icons/ImageThinIcon";
import MegaphoneIcon from "components/icons/MegaphoneIcon";
import SeriesIcon from "components/icons/SeriesIcon";
import FlexBox from "components/layout/FlexBox";
import useUserContext from "hooks/useUserContext";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import styles from "css/modal/CreateModalOrPopover.module.css";
import useFlagsTyped from "hooks/useFlagsTyped";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import ProfileUrlParamKey from "formfn-shared/dist/types/enums/ProfileUrlParamKey";
import ProfileTabType from "types/enums/ProfileTabType";
import GiftIcon from "components/icons/GiftIcon";
import { useNavigate } from "react-router-dom";
import useBreakpoint from "hooks/useBreakpoint";
import BottomDrawer from "components/drawers/BottomDrawer";
import { TooltipPlacement } from "antd/lib/tooltip";
import isMobile from "utils/isMobile";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

function Button({
  children,
  href,
  icon,
  onClick,
}: {
  children: string;
  href?: string;
  icon: JSX.Element;
  onClick?: () => void;
}) {
  return (
    <TextButton
      className={styles.button}
      buttonThemeOrColorClass={ColorClass.Primary}
      fontClass={FontClass.NavLink}
      href={href}
      onClick={onClick}
      icon={icon}
      type={href != null ? "link_internal" : undefined}
    >
      {children}
    </TextButton>
  );
}

function PopoverOrModalContent({
  setIsPopoverOrBottomSheetOpen,
}: {
  setIsPopoverOrBottomSheetOpen: (val: boolean) => void;
}) {
  const { user } = useUserContext();
  const { enableCampaignCreator } = useFlagsTyped();
  const navigate = useNavigate();
  const shouldShowCreatorOnlyButtons = user != null && user.isWhitelisted;

  return (
    <FlexBox flexDirection="column" gap={32}>
      <Button
        href="/create"
        icon={<ImageThinIcon size={24} colorValue={ColorValue.Primary} />}
      >
        NFT
      </Button>
      {shouldShowCreatorOnlyButtons && (
        <Button
          icon={<SeriesIcon colorValue={ColorValue.Primary} />}
          onClick={() => {
            setIsPopoverOrBottomSheetOpen(false);
            navigate(
              `${getUserProfileLinkRelative(user!.username, {
                [ProfileUrlParamKey.CreateSeries]: "1",
                [ProfileUrlParamKey.Tab]: ProfileTabType.Series,
              })}`
            );
          }}
        >
          Series
        </Button>
      )}
      {enableCampaignCreator && (
        <Button
          href={`/@${user!.username}/campaigns`}
          icon={<MegaphoneIcon size={24} colorValue={ColorValue.Primary} />}
        >
          Campaign
        </Button>
      )}
      {shouldShowCreatorOnlyButtons && (
        <Button
          onClick={() => {
            setIsPopoverOrBottomSheetOpen(false);
            navigate(
              `${getUserProfileLinkRelative(user!.username, {
                [ProfileUrlParamKey.CreateAirdrop]: "1",
                [ProfileUrlParamKey.Tab]: ProfileTabType.Created,
              })}`
            );
          }}
          icon={<GiftIcon size={24} colorValue={ColorValue.Primary} />}
        >
          Airdrop
        </Button>
      )}
    </FlexBox>
  );
}

type Props = {
  button: Maybe<JSX.Element>;
  isShown: boolean;
  placement?: TooltipPlacement;
  setIsShown: (val: boolean) => void;
};

export default function CreateModalOrPopover({
  button,
  isShown,
  placement,
  setIsShown,
}: Props) {
  const { isDesktopBreakpoint } = useBreakpoint();
  const defaultPlacement: TooltipPlacement = isMobile()
    ? "bottom"
    : "bottomLeft";

  if (!isDesktopBreakpoint) {
    return (
      <ButtonWithPopover
        popoverOpen={isShown}
        popoverOnOpenChange={(open: boolean) => setIsShown(open)}
        popoverContent={
          <PopoverOrModalContent setIsPopoverOrBottomSheetOpen={setIsShown} />
        }
        placement={placement ?? defaultPlacement}
      >
        {button}
      </ButtonWithPopover>
    );
  }

  return (
    <>
      <BottomDrawer isShown={isShown} onHide={() => setIsShown(false)}>
        <PopoverOrModalContent setIsPopoverOrBottomSheetOpen={setIsShown} />
      </BottomDrawer>
      {button}
    </>
  );
}
