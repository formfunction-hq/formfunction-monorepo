import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import styles from "css/pages/campaign/campaign-generic/about/CampaignAboutCard.module.css";
import Body1Bold from "components/text/Body1Bold";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import ReactMarkdownLazy from "components/markdown/ReactMarkdownLazy";
import AboutCard from "components/cards/AboutCard";
import useColorModeContext from "hooks/useColorModeContext";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";

function AboutSection({
  description,
  title,
}: {
  description: string;
  title?: string;
}) {
  return (
    <div className={styles.aboutSection}>
      {title != null && (
        <Body1Bold colorClass={ColorClass.Primary}>{title}</Body1Bold>
      )}
      <Body1 colorClass={ColorClass.Primary}>
        <ReactMarkdownLazy>{description}</ReactMarkdownLazy>
      </Body1>
    </div>
  );
}

type Props = {
  campaign: MaybeUndef<string>;
  contactInfo: MaybeUndef<string>;
  creator: MaybeUndef<string>;
  editAboutButton?: JSX.Element;
  risksAndChallenges: MaybeUndef<string>;
  timeline: MaybeUndef<string>;
};

export default function CampaignAboutCard({
  campaign,
  contactInfo,
  creator,
  editAboutButton,
  risksAndChallenges,
  timeline,
}: Props) {
  const { isDarkMode } = useColorModeContext();
  const colorScheme = useCampaignColorScheme();

  const description = (
    <div className={styles.aboutDescription}>
      {campaign && (
        <AboutSection title="About the campaign" description={campaign} />
      )}
      {creator && (
        <AboutSection title="About the creator" description={creator} />
      )}
      {timeline && (
        <AboutSection title="Project goals" description={timeline} />
      )}
      {risksAndChallenges && (
        <AboutSection
          title="Risks and challenges"
          description={risksAndChallenges}
        />
      )}
      {contactInfo && (
        <AboutSection title="Questions" description={contactInfo} />
      )}
    </div>
  );

  return (
    <AboutCard
      backgroundColorClass={
        isDarkMode
          ? // Special case this situation, b/c it doesn't work with the color schemes setup
            BackgroundColorClass.Shader
          : colorScheme.background.backgroundColorClass
      }
      description={description}
      editAboutButton={editAboutButton}
      title="About this Project"
    />
  );
}
