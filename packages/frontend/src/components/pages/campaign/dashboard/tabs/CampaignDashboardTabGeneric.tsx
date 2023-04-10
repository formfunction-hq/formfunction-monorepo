import TextButton from "components/buttons/TextButton";
import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import styles from "css/pages/campaign/dashboard/tabs/CampaignDashboardTabGeneric.module.css";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import { useParams } from "react-router-dom";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";

type Props = {
  campaignTitle: string | JSX.Element;
  content: JSX.Element;
  subtitle: string | JSX.Element;
  title: string | JSX.Element;
};

export default function CampaignDashboardTabGeneric({
  campaignTitle,
  content,
  title,
  subtitle,
}: Props): JSX.Element {
  const { username, campaignSlug } = useParams();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TextButton
          buttonThemeOrColorClass={ColorClass.Secondary}
          fontClass={FontClass.TinyLabel}
          textTransform="uppercase"
          href={getCampaignLinkRelative(username!, campaignSlug!)}
          type="link_internal"
        >
          {campaignTitle}
        </TextButton>
        <Header2 colorClass={ColorClass.Primary}>{title}</Header2>
        <Body1 colorClass={ColorClass.Secondary}>{subtitle}</Body1>
      </div>
      {content}
    </div>
  );
}
