import ProfileIcon from "components/icons/ProfileIcon";
import ColorValue from "types/enums/ColorValue";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";
import WalletAndAddressButton from "components/buttons/WalletAndAddressButton";
import CheckmarkCircleIcon from "components/icons/CheckmarkCircleIcon";
import useUserContext from "hooks/useUserContext";
import isEmployee from "utils/isEmployee";
import DisconnectWalletButton from "components/buttons/DisconnectWalletButton";
import useFlagsTyped from "hooks/useFlagsTyped";
import MailIcon from "components/icons/MailIcon";
import MegaphoneIcon from "components/icons/MegaphoneIcon";
import FlexBox from "components/layout/FlexBox";
import { AlignItems } from "flexbox-react";
import getHashlist from "utils/getHashlist";
import DownloadIcon from "components/icons/DownloadIcon";

function downloadFile(encodedUri: string) {
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "hashlist.csv");
  document.body.appendChild(link); // Required for FF
  link.click(); // This will download the data file named "my_data.csv".}
}

type Props = {
  alignItems: AlignItems;
};

export default function ProfileButtonOptions({
  alignItems,
}: Props): JSX.Element {
  const { profileHref, user } = useUserContext();
  const { enableCampaignCreator, enableHashlist } = useFlagsTyped();

  return (
    <FlexBox alignItems={alignItems} flexDirection="column" gap={32}>
      <WalletAndAddressButton />
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Primary}
        fontClass={FontClass.NavLink}
        icon={<ProfileIcon colorValue={ColorValue.Primary} size={24} />}
        href={profileHref}
        target=""
        type={
          // TODO: find cleaner solution
          // After minting NFT, we don't update local state. So page needs to be refreshed
          window.location.href.includes("/create")
            ? "link_external"
            : "link_internal"
        }
      >
        Go to profile
      </TextButton>
      {(user?.isWhitelisted || user?.isCollector || isEmployee(user?.id)) && (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.NavLink}
          href="/vote"
          icon={<CheckmarkCircleIcon colorValue={ColorValue.Primary} />}
          type="link_internal"
        >
          Community vote
        </TextButton>
      )}
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Primary}
        fontClass={FontClass.NavLink}
        href="/invites"
        icon={<MailIcon colorValue={ColorValue.Primary} />}
        type="link_internal"
      >
        Invites
      </TextButton>
      {enableCampaignCreator && (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.NavLink}
          href={`/@${user!.username}/campaigns`}
          icon={<MegaphoneIcon colorValue={ColorValue.Primary} size={24} />}
          type="link_internal"
        >
          Manage campaigns
        </TextButton>
      )}
      {enableHashlist && user?.isWhitelisted === true && (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.Primary}
          fontClass={FontClass.NavLink}
          icon={<DownloadIcon colorValue={ColorValue.Primary} />}
          onClick={async () => {
            const hashlistData = await getHashlist();
            const uriContent = `data:text/csv,${encodeURIComponent(
              hashlistData
            )}`;
            downloadFile(uriContent);
          }}
        >
          Download hashlist
        </TextButton>
      )}
      <DisconnectWalletButton buttonStyle="TextButton" />
    </FlexBox>
  );
}
