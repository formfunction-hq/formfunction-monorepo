import styles from "css/pages/profile/ProfileCampaignCard.module.css";
import TinyLabel from "components/text/TinyLabel";
import ColorClass from "types/enums/ColorClass";
import Header3 from "components/text/Header3";
import Body1 from "components/text/Body1";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import Skeleton from "react-loading-skeleton";
import AspectRatioContainer from "components/containers/AspectRatioContainer";
import ProfileCard from "components/pages/profile/ProfileCard";

export default function ProfileCampaignCardSkeleton() {
  return (
    <ProfileCard>
      <div className={styles.asset}>
        <AspectRatioContainer width={16} height={9}>
          <Skeleton borderRadius={12} height="100%" width="100%" />
        </AspectRatioContainer>
      </div>
      <div className={styles.info}>
        <div className={styles.text}>
          <TinyLabel
            colorClass={ColorClass.Secondary}
            textTransform="uppercase"
          >
            Campaign
          </TinyLabel>
          <Header3 colorClass={null}>
            <Skeleton width={250} />
          </Header3>
          <Body1 colorClass={null}>
            <Skeleton width={275} />
          </Body1>
          <Header3 colorClass={null}>
            <Skeleton width={250} />
          </Header3>
        </div>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.Body1Medium}
        >
          See the campaign
        </ButtonWithText>
      </div>
    </ProfileCard>
  );
}
