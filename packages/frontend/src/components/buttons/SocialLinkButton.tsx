import ShadowButton from "components/buttons/ShadowButton";
import DiscordIcon from "components/icons/DiscordIcon";
import GlobeIcon from "components/icons/GlobeIcon";
import InstagramIcon from "components/icons/InstagramIcon";
import TwitterIcon from "components/icons/TwitterIcon";
import styles from "css/buttons/SocialLinkButton.module.css";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ColorValue from "types/enums/ColorValue";

type SocialType = "discord" | "instagram" | "twitter" | "website";

const ICON_SIZE = 20;

type Props = {
  href: string;
  socialType: SocialType;
};

function Icon({ socialType }: { socialType: SocialType }) {
  switch (socialType) {
    case "discord":
      return <DiscordIcon colorValue={ColorValue.Secondary} />;
    case "instagram":
      return (
        <InstagramIcon colorValue={ColorValue.Secondary} size={ICON_SIZE} />
      );
    case "twitter":
      return <TwitterIcon colorValue={ColorValue.Secondary} />;
    case "website":
      return <GlobeIcon colorValue={ColorValue.Secondary} size={ICON_SIZE} />;
    default:
      return assertUnreachable(socialType);
  }
}

export default function SocialLinkButton({ href, socialType }: Props) {
  return (
    <ShadowButton className={styles.button} href={href} type="link_external">
      <Icon socialType={socialType} />
    </ShadowButton>
  );
}
