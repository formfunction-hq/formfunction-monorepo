import graphql from "babel-plugin-relay/macro";
import ShadowButton from "components/buttons/ShadowButton";
import FlagIcon from "components/icons/FlagIcon";
import GlobeIcon from "components/icons/GlobeIcon";
import InstagramIcon from "components/icons/InstagramIcon";
import TwitterIcon from "components/icons/TwitterIcon";
import VerifiedCheckmarkGradientIcon from "components/icons/VerifiedCheckmarkGradientIcon";
import VerifiedCheckmarkIcon from "components/icons/VerifiedCheckmarkIcon";
import Divider from "components/misc/Divider";
import SubmissionCardAssets from "components/pages/vote/SubmissionCardAssets";
import { SubmissionCard_ArtistSubmission$key } from "components/pages/vote/__generated__/SubmissionCard_ArtistSubmission.graphql";
import Body1 from "components/text/Body1";
import Body2 from "components/text/Body2";
import Header3 from "components/text/Header3";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/pages/vote/SubmissionCard.module.css";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import useColorModeContext from "hooks/useColorModeContext";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import shortenUrl from "utils/shortenUrl";

const fragment = graphql`
  fragment SubmissionCard_ArtistSubmission on ArtistSubmission {
    # eslint-disable-next-line relay/unused-fields
    id
    artistStatement
    instagramName
    twitterName
    websiteUrl

    User {
      # eslint-disable-next-line relay/unused-fields
      id
      username
    }

    ...SubmissionCardAssets_ArtistSubmission
  }
`;

type Props = {
  artistSubmission: SubmissionCard_ArtistSubmission$key;
  buttons: JSX.Element;
  currentIndex: number;
  extraContent?: JSX.Element;
  setIsReportModalShown?: (val: boolean) => void;
  showReverseImageSearchIcon?: boolean;
  totalCount: number;
};

export default function SubmissionCard({
  artistSubmission,
  buttons,
  currentIndex,
  extraContent,
  setIsReportModalShown,
  showReverseImageSearchIcon = false,
  totalCount,
}: Props) {
  const artistSubmissionData = useFragment(fragment, artistSubmission);
  const { isDarkMode } = useColorModeContext();

  const socials = (
    <div className={styles.socials}>
      <ShadowButton
        className={styles.shadowButtonSocial}
        href={`https://twitter.com/${artistSubmissionData.twitterName}`}
        type="link_external"
      >
        <TwitterIcon colorValue={ColorValue.Secondary} />
        <Body2
          colorClass={ColorClass.Secondary}
        >{`@${artistSubmissionData.twitterName}`}</Body2>
        {isDarkMode ? (
          <VerifiedCheckmarkIcon colorValue={ColorValue.BrightPurple} />
        ) : (
          <VerifiedCheckmarkGradientIcon />
        )}
      </ShadowButton>
      {!isEmptyString(artistSubmissionData.instagramName) && (
        <ShadowButton
          className={styles.shadowButtonSocial}
          href={`https://instagram.com/${artistSubmissionData.instagramName}`}
          type="link_external"
        >
          <InstagramIcon colorValue={ColorValue.Secondary} size={20} />
          <Body2 colorClass={ColorClass.Secondary}>
            {artistSubmissionData.instagramName!}
          </Body2>
        </ShadowButton>
      )}
      <ShadowButton
        className={styles.shadowButtonSocial}
        href={artistSubmissionData.websiteUrl}
        type="link_external"
      >
        <GlobeIcon colorValue={ColorValue.Secondary} size={20} />
        <Body2 colorClass={ColorClass.Secondary}>
          {shortenUrl(artistSubmissionData.websiteUrl)}
        </Body2>
      </ShadowButton>
    </div>
  );

  return (
    <div className={styles.container}>
      {setIsReportModalShown != null && (
        <ShadowButton
          className={styles.reportButton}
          onClick={() => setIsReportModalShown(true)}
        >
          <FlagIcon colorValue={ColorValue.Red} />
        </ShadowButton>
      )}
      <TinyLabel
        colorClass={ColorClass.Secondary}
        textAlign="center"
        textTransform="uppercase"
      >
        Application {currentIndex + 1}/{totalCount}
      </TinyLabel>
      <Header3
        className={styles.username}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        {artistSubmissionData.User.username}
      </Header3>
      {socials}
      <div className={styles.assets}>
        <SubmissionCardAssets
          artistSubmission={artistSubmissionData}
          showReverseImageSearchIcon={showReverseImageSearchIcon}
        />
      </div>
      <div className={styles.artistStatement}>
        <TinyLabel
          colorClass={ColorClass.Secondary}
          textAlign="center"
          textTransform="uppercase"
        >
          Artist Statement
        </TinyLabel>
        <Body1 colorClass={ColorClass.Primary} textAlign="center">
          {artistSubmissionData.artistStatement}
        </Body1>
      </div>
      {extraContent}
      <Divider className={styles.divider} colorClass={ColorClass.Tertiary} />
      {buttons}
    </div>
  );
}
