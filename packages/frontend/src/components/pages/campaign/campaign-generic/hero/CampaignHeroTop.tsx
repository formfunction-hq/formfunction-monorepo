import styles from "css/pages/campaign/campaign-generic/hero/CampaignHeroTop.module.css";
import CampaignHeroSocialLinks, {
  Props as SocialLinksProps,
} from "components/pages/campaign/campaign-generic/hero/CampaignHeroSocialLinks";
import TextButton from "components/buttons/TextButton";
import FontClass from "types/enums/FontClass";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import CampaignHeroTitle from "components/pages/campaign/campaign-generic/hero/CampaignHeroTitle";
import CampaignHeroTagline from "components/pages/campaign/campaign-generic/hero/CampaignHeroTagline";

type Props = {
  artistPillButton: JSX.Element;
  description: string;
  logoAsset?: MaybeUndef<JSX.Element>;
  onClickLearnMore: () => void;
  title: string;
} & SocialLinksProps;

export default function CampaignHeroTop({
  artistPillButton,
  description,
  logoAsset,
  onClickLearnMore,
  socialLinks,
  title,
}: Props) {
  const colorScheme = useCampaignColorScheme();

  return (
    <div className={styles.heroTop}>
      <CampaignHeroTitle logoAsset={logoAsset}>{title}</CampaignHeroTitle>
      <CampaignHeroTagline>
        {description}{" "}
        <TextButton
          buttonThemeOrColorClass={colorScheme.foreground.colorClass}
          display="inline"
          fontClass={FontClass.Subheader}
          onClick={onClickLearnMore}
        >
          Learn more
        </TextButton>
      </CampaignHeroTagline>
      {artistPillButton}
      <CampaignHeroSocialLinks socialLinks={socialLinks} />
    </div>
  );
}
