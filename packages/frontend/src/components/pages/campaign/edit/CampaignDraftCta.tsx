import ButtonWithText from "components/buttons/ButtonWithText";
import Body1 from "components/text/Body1";
import Header3 from "components/text/Header3";
import ButtonTheme from "types/enums/ButtonTheme";
import styles from "css/pages/campaign/edit/CampaignDraftCta.module.css";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import joinClasses from "utils/joinClasses";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import CampaignStatusExpress_enum from "types/relay/CampaignStatusExpress_enum";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";

type CtaContentProps = {
  buttonText: string;
  onClick: () => void;
  subtitle: string;
  title: string;
};

function CtaContent({ buttonText, onClick, subtitle, title }: CtaContentProps) {
  return (
    <div
      className={joinClasses(
        styles.submitContainer,
        BackgroundColorClass.LightPurpleGradient
      )}
    >
      <Header3 textAlign="center" colorClass={ColorClass.Primary}>
        {title}
      </Header3>
      <Body1
        className={styles.submitSubtitle}
        textAlign="center"
        colorClass={ColorClass.Primary}
      >
        {subtitle}
      </Body1>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        className={styles.submitButton}
        fontClass={FontClass.NavLink}
        type="button"
        onClick={onClick}
      >
        {buttonText}
      </ButtonWithText>
    </div>
  );
}

type Props = {
  campaignStatus: CampaignStatusExpress_enum;
  onClick: () => void;
};

export default function CampaignDraftCta({ campaignStatus, onClick }: Props) {
  switch (campaignStatus) {
    case "Draft":
      return (
        <CtaContent
          title="Ready to submit for approval?"
          subtitle={
            "Make sure you've filled out the basic details, gallery, funding tiers, and About section of your campaign." +
            " Visit our campaign guidelines to learn more about what goes into the approval process.\n\n" +
            "Once you submit, the only changes you will be able to make will be editing the campaign gallery and About section, and adding NFTs."
          }
          onClick={onClick}
          buttonText="Submit for approval"
        />
      );
    case "Approved":
      return (
        <CtaContent
          title="Ready to publish your campaign?"
          subtitle={
            "Once you publish your campaign, it will be visible on your profile and" +
            " in Explore, and you'll be able to share the link. You'll also be able to access" +
            " your campaign dashboard to send updates to your campaign supporters.\n\nKeep" +
            " in mind that you will not be able to make any more changes to your campaign except adding NFTs."
          }
          onClick={onClick}
          buttonText="Publish campaign"
        />
      );
    case "Rejected":
    case RELAY_FUTURE_ADDED_VALUE:
    case "Pending":
    case "Concluded":
    case "Published":
      return null;
    default:
      return assertUnreachable(campaignStatus);
  }
}
