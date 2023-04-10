import styles from "css/pages/explore/ExploreCampaignCard.module.css";
import ArtName from "components/text/ArtName";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import FlexBox from "components/layout/FlexBox";
import AspectRatioContainer from "components/containers/AspectRatioContainer";
import { Link } from "react-router-dom";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import HideIfEmpty from "components/containers/HideIfEmpty";
import joinClasses from "utils/joinClasses";
import GlobalClass from "types/enums/GlobalClass";

type Props = {
  artistPillButton: JSX.Element;
  asset: JSX.Element;
  campaignHref: Maybe<string>;
  description: string | JSX.Element;
  hasShadow?: boolean;
  nftAssets: Maybe<Array<JSX.Element>>;
  progressTowardsGoal: Maybe<JSX.Element>;
  title: string | JSX.Element;
};

export default function ExploreCampaignCard({
  artistPillButton,
  asset,
  campaignHref,
  description,
  hasShadow = true,
  nftAssets,
  progressTowardsGoal,
  title,
}: Props) {
  const assetContainer = (
    <AspectRatioContainer height={9} width={16}>
      {asset}
    </AspectRatioContainer>
  );

  const titleAndDescription = (
    <FlexBox flexDirection="column" gap={8}>
      <ArtName colorClass={ColorClass.Primary}>{title}</ArtName>
      <Body1 colorClass={ColorClass.Secondary} truncateLines={3}>
        {description}
      </Body1>
    </FlexBox>
  );

  const content = (
    <FlexBox
      className={joinClasses(
        styles.container,
        hasShadow ? styles.containerShadow : null,
        GlobalClass.CardAnimation
      )}
      flexDirection="column"
      gap={24}
    >
      <div className={styles.artistPillButton}>{artistPillButton}</div>
      <FlexBox flexDirection="column" gap={12}>
        {assetContainer}
        <HideIfEmpty className={styles.nftAssets}>{nftAssets}</HideIfEmpty>
      </FlexBox>
      <FlexBox className={styles.bottomSection} flexDirection="column" gap={24}>
        {titleAndDescription}
        <div className={styles.progressContainer}>{progressTowardsGoal}</div>
      </FlexBox>
    </FlexBox>
  );

  return campaignHref == null ? (
    content
  ) : (
    <Link to={campaignHref}>{content}</Link>
  );
}
