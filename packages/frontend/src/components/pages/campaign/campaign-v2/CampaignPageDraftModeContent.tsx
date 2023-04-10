import ResponsivePageBody from "components/containers/ResponsivePageBody";
import styles from "css/pages/campaign/campaign-v2/CampaignPageDraftModeContent.module.css";
import ButtonWithText from "components/buttons/ButtonWithText";
import FontClass from "types/enums/FontClass";
import CampaignHeaderStatusBanner from "components/pages/campaign/campaign-generic/CampaignHeaderStatusBanner";
import ColorClass from "types/enums/ColorClass";
import ClickableArea from "components/buttons/ClickableArea";
import ImageIcon from "components/icons/ImageIcon";
import Header3 from "components/text/Header3";
import InfoIcon from "components/icons/InfoIcon";
import graphql from "babel-plugin-relay/macro";
import ColorValue from "types/enums/ColorValue";
import CampaignGalleryModal from "components/pages/campaign/edit/CampaignGalleryModal";
import { useState } from "react";
import CampaignAboutModal from "components/pages/campaign/edit/CampaignAboutModal";
import { useParams } from "react-router-dom";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import CampaignHeroAssets from "components/pages/campaign/campaign-generic/hero/CampaignHeroAssets";
import FlexBox from "components/layout/FlexBox";
import EditCampaignAboutCard from "components/pages/campaign/edit/CampaignDraftAboutCard";
import FundingTierSectionForCampaignV2 from "components/pages/campaign/edit/funding-tiers/FundingTierSectionForCampaignV2";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import CampaignDraftCta from "components/pages/campaign/edit/CampaignDraftCta";
import CampaignPublishModal from "components/pages/campaign/edit/CampaignPublishModal";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import {
  CampaignPageDraftModeContent_CampaignV2$data,
  CampaignPageDraftModeContent_CampaignV2$key,
} from "components/pages/campaign/campaign-v2/__generated__/CampaignPageDraftModeContent_CampaignV2.graphql";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import CampaignDraftBiddingInfo from "components/pages/campaign/edit/CampaignDraftBiddingInfo";
import CampaignArtistPillButtons from "components/pages/campaign/campaign-v2/hero/CampaignArtistPillButtons";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import { CampaignV2ContextProvider } from "context/CampaignV2Context";
import AspectRatioContainer from "components/containers/AspectRatioContainer";
import isUpdateBasicInfoAllowed from "utils/campaigns/permissions/isUpdateBasicInfoAllowed";
import CampaignHeroAssetsAndActivity from "components/pages/campaign/campaign-generic/hero/CampaignHeroAssetsAndActivity";
import useBreakpoint from "hooks/useBreakpoint";
import CampaignSubmitForApprovalModal from "components/pages/campaign/edit/CampaignSubmitForApprovalModal";
import CampaignHeroTitle from "components/pages/campaign/campaign-generic/hero/CampaignHeroTitle";
import CampaignHeroTagline from "components/pages/campaign/campaign-generic/hero/CampaignHeroTagline";
import { useCampaignPageCampaignV2DraftQuery } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2DraftQuery.graphql";
import { campaignDraftQuery } from "hooks/campaign-page/v2/useCampaignPageCampaignV2Draft";

export const STANDARD_SECTION_HEIGHT = 240;

const fragment = graphql`
  fragment CampaignPageDraftModeContent_CampaignV2 on CampaignV2 {
    id
    colorScheme
    title
    tagline
    status
    galleryAssets {
      ...CampaignHeroAssets_AssetExpress
    }
    youtubeVideoHref

    ...ManageFundingTiersModal_CampaignV2
    ...FundingTierSectionForCampaignV2_CampaignV2
    ...CampaignAboutModal_CampaignV2
    ...CampaignGalleryModal_CampaignV2
    ...CampaignDraftAboutCard_CampaignV2
    ...CampaignDraftBiddingInfo_CampaignV2
    ...CampaignArtistPillButtons_CampaignV2
    ...CampaignDraftChecklist_CampaignV2
    ...CampaignHeaderStatusBanner_CampaignV2
  }
`;

function Inner({
  campaignData,
}: {
  campaignData: CampaignPageDraftModeContent_CampaignV2$data;
}) {
  const colorScheme = useCampaignColorScheme();
  const { isMobileBreakpoint } = useBreakpoint();
  const [showCampaignGalleryModal, setShowCampaignGalleryModal] =
    useState(false);
  const [showCampaignAboutModal, setShowCampaignAboutModal] = useState(false);
  const [showSubmitForApprovalModal, setShowSubmitForApprovalModal] =
    useState(false);
  const [showPublishCampaignModal, setShowPublishCampaignModal] =
    useState(false);
  const { campaignSlug, username } = useParams();
  const {
    id: campaignId,
    galleryAssets,
    status,
    title,
    tagline,
    youtubeVideoHref,
  } = campaignData;

  const onSubmit = () => {
    switch (status) {
      case "Draft":
        setShowSubmitForApprovalModal(true);
        break;
      case "Approved":
        setShowPublishCampaignModal(true);
        break;
      case RELAY_FUTURE_ADDED_VALUE:
      case "Pending":
      case "Rejected":
      case "Concluded":
      case "Published":
        break;
      default:
        assertUnreachable(status);
    }
  };

  const gallery =
    (galleryAssets == null || galleryAssets.length === 0) &&
    isEmptyString(youtubeVideoHref) ? (
      <AspectRatioContainer height={9} width={16}>
        <ClickableArea
          onClick={() => setShowCampaignGalleryModal(true)}
          height="100%"
          colorOverrides={{
            border: colorScheme.foreground.colorValue,
          }}
          icon={
            <ImageIcon
              size={isMobileBreakpoint ? 36 : 64}
              colorValue={ColorValue.Primary}
            />
          }
          title="Set up your campaign gallery"
          subtitle="These images help explain your campaign and get people excited to support your creative vision."
        />
      </AspectRatioContainer>
    ) : (
      <CampaignHeroAssets
        assets={galleryAssets ?? []}
        youTubeVideoHref={youtubeVideoHref}
        onClickEditGallery={() => setShowCampaignGalleryModal(true)}
      />
    );

  return (
    <>
      <CampaignHeaderStatusBanner
        campaign={campaignData}
        campaignStatus={status}
        onSubmit={onSubmit}
      />
      <div
        className={styles.coloredContainer}
        style={{
          backgroundColor: colorScheme.background.colorValue,
        }}
      >
        <ResponsivePageBody className={styles.container}>
          {isUpdateBasicInfoAllowed(status) && (
            <ButtonWithText
              buttonTheme={colorScheme.buttonTheme}
              className={styles.editBasicInfoButton}
              fontClass={FontClass.NavLink}
              type="link_internal"
              href={`${getCampaignLinkRelative(
                username!,
                campaignSlug!
              )}/edit-basic-info`}
            >
              Edit basic info
            </ButtonWithText>
          )}
          <FlexBox
            className={
              isUpdateBasicInfoAllowed(status) ? styles.titleAndTagline : ""
            }
            flexDirection="column"
            alignItems="center"
            gap={24}
          >
            <CampaignHeroTitle>{title}</CampaignHeroTitle>
            <CampaignHeroTagline>{tagline}</CampaignHeroTagline>
            <CampaignArtistPillButtons campaign={campaignData} />
          </FlexBox>
          <CampaignHeroAssetsAndActivity
            activity={<CampaignDraftBiddingInfo campaign={campaignData} />}
            assets={gallery}
            progressTowardsGoal={null}
          />
          <FlexBox marginTop={56}>
            <Header3 colorClass={ColorClass.Primary}>Ways to support</Header3>
          </FlexBox>
          <div className={styles.fundingTiers}>
            <FundingTierSectionForCampaignV2 campaign={campaignData} />
          </div>
        </ResponsivePageBody>
      </div>
      <ResponsivePageBody className={styles.container}>
        <EditCampaignAboutCard
          editCampaignAboutButton={
            <ButtonWithText
              buttonTheme={colorScheme.buttonTheme}
              className={styles.editAboutButton}
              fontClass={FontClass.NavLink}
              type="button"
              onClick={() => {
                setShowCampaignAboutModal(true);
              }}
            >
              Edit About
            </ButtonWithText>
          }
          campaign={campaignData}
          fallback={
            <ClickableArea
              onClick={() => {
                setShowCampaignAboutModal(true);
              }}
              colorOverrides={{
                border: colorScheme.foreground.colorValue,
              }}
              height={STANDARD_SECTION_HEIGHT}
              icon={<InfoIcon colorValue={ColorValue.Primary} size={52} />}
              title="Add an About section"
              subtitle="Tell people more about your campaign and why it matters."
            />
          }
        />
        <div className={styles.cta}>
          <CampaignDraftCta campaignStatus={status} onClick={onSubmit} />
        </div>
      </ResponsivePageBody>
      <CampaignGalleryModal
        isShown={showCampaignGalleryModal}
        campaign={campaignData}
        onHide={() => {
          setShowCampaignGalleryModal(false);
        }}
      />
      <CampaignAboutModal
        isShown={showCampaignAboutModal}
        campaign={campaignData}
        onHide={() => {
          setShowCampaignAboutModal(false);
        }}
      />
      <CampaignSubmitForApprovalModal
        campaign={campaignData}
        campaignId={campaignId}
        isShown={showSubmitForApprovalModal}
        onHide={() => setShowSubmitForApprovalModal(false)}
      />
      <CampaignPublishModal
        campaign={campaignData}
        campaignId={campaignId}
        isShown={showPublishCampaignModal}
        onHide={() => setShowPublishCampaignModal(false)}
      />
    </>
  );
}

type Props = {
  campaignDraftQueryRef: PreloadedQuery<useCampaignPageCampaignV2DraftQuery>;
};

export default function CampaignPageDraftModeContent({
  campaignDraftQueryRef,
}: Props) {
  const queryData = usePreloadedQuery<useCampaignPageCampaignV2DraftQuery>(
    campaignDraftQuery,
    campaignDraftQueryRef
  );
  const fragmentRef: CampaignPageDraftModeContent_CampaignV2$key =
    queryData.CampaignsNamespace.campaignV2ForSlug.campaign!;
  const campaignData = useFragment(fragment, fragmentRef);
  const { colorScheme } = campaignData;

  return (
    <CampaignV2ContextProvider defaultColorScheme={colorScheme}>
      <Inner campaignData={campaignData} />
    </CampaignV2ContextProvider>
  );
}
