import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import styles from "css/pages/campaign/campaign-generic/hero/CampaignHeroSocialLinks.module.css";
import SocialLinkButton from "components/buttons/SocialLinkButton";

export type Props = {
  socialLinks: MaybeUndef<{
    discord: MaybeUndef<string>;
    instagram: MaybeUndef<string>;
    twitter: MaybeUndef<string>;
    website: MaybeUndef<string>;
  }>;
};

export default function CampaignHeroSocialLinks({ socialLinks }: Props) {
  if (
    socialLinks == null ||
    Object.values(socialLinks).every((val) => val == null)
  ) {
    return null;
  }

  const { discord, instagram, twitter, website } = socialLinks;

  return (
    <div className={styles.container}>
      {discord != null && (
        <SocialLinkButton href={discord} socialType="discord" />
      )}
      {instagram != null && (
        <SocialLinkButton href={instagram} socialType="instagram" />
      )}
      {twitter != null && (
        <SocialLinkButton href={twitter} socialType="twitter" />
      )}
      {website != null && (
        <SocialLinkButton href={website} socialType="website" />
      )}
    </div>
  );
}
