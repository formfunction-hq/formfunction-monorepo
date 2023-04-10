import graphql from "babel-plugin-relay/macro";
import { LandingFeaturedCampaignQuery } from "components/pages/landing/__generated__/LandingFeaturedCampaignQuery.graphql";
import TinyLabel from "components/text/TinyLabel";
import { useLazyLoadQuery } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import styles from "css/pages/landing/LandingFeaturedCampaign.module.css";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import Header2 from "components/text/Header2";
import Body1 from "components/text/Body1";
import ArtistPillButtonForUserExpress from "components/buttons/ArtistPillButtonForUserExpress";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import useFlagsTyped from "hooks/useFlagsTyped";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { Link } from "react-router-dom";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";

export const query = graphql`
  query LandingFeaturedCampaignQuery($input: CampaignForSlugInput!) {
    campaignForSlug(input: $input) {
      campaign {
        creator {
          username
          ...ArtistPillButtonForUserExpress_UserExpress
        }
        descriptionAlt
        heroAssets {
          downloadUrl
        }
        title
      }
    }
  }
`;

function Inner({
  campaignSlug,
  creatorId,
}: {
  campaignSlug: string;
  creatorId: string;
}) {
  const data = useLazyLoadQuery<LandingFeaturedCampaignQuery>(query, {
    input: {
      campaignSlug,
      creatorId,
    },
  });

  const { campaign } = data.campaignForSlug;
  if (campaign == null) {
    return null;
  }

  return (
    <Link to={getCampaignLinkRelative(campaign.creator.username, campaignSlug)}>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${campaign.heroAssets[0].downloadUrl})`,
        }}
      >
        <div className={BackgroundColorClass.BackgroundOverlay}>
          <ResponsiveContainer className={styles.containerResponsive}>
            <div className={styles.containerInner}>
              <div className={styles.text}>
                <TinyLabel
                  className={styles.shadow}
                  colorClass={ColorClass.White}
                  textTransform="uppercase"
                >
                  Featured Campaign
                </TinyLabel>
                <Header2 colorClass={ColorClass.White}>
                  {campaign.title}
                </Header2>
                <Body1 colorClass={ColorClass.White}>
                  {campaign.descriptionAlt}
                </Body1>
              </div>
              <div className={styles.pillButton}>
                <ArtistPillButtonForUserExpress user={campaign.creator} />
              </div>
            </div>
          </ResponsiveContainer>
        </div>
      </div>
    </Link>
  );
}

function InnerSkeleton() {
  return <Skeleton className={styles.container} />;
}

export default function LandingFeaturedCampaign(): Maybe<JSX.Element> {
  const { campaignsConfig } = useFlagsTyped();
  const campaignsBySlug = campaignsConfig?.campaignsBySlug;
  const featuredCampaignSlug = campaignsConfig?.featuredCampaignSlug;
  if (campaignsBySlug == null || featuredCampaignSlug == null) {
    return null;
  }

  const campaignCreatorId = campaignsBySlug[featuredCampaignSlug].creatorId;

  return (
    <Suspense fallback={<InnerSkeleton />}>
      <Inner
        campaignSlug={featuredCampaignSlug}
        creatorId={campaignCreatorId}
      />
    </Suspense>
  );
}
