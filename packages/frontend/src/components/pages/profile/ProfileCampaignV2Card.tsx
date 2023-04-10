import graphql from "babel-plugin-relay/macro";
import { Suspense } from "react";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import styles from "css/pages/profile/ProfileCampaignCard.module.css";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import TinyLabel from "components/text/TinyLabel";
import ColorClass from "types/enums/ColorClass";
import Header3 from "components/text/Header3";
import Body1 from "components/text/Body1";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import AspectRatioContainer from "components/containers/AspectRatioContainer";
import { useProfilePageCreatedCampaignsQuery } from "hooks/profile-page/__generated__/useProfilePageCreatedCampaignsQuery.graphql";
import { profilePageCreatedCampaignsQuery } from "hooks/profile-page/useProfilePageCreatedCampaigns";
import useCampaignLinkForCampaignV2 from "hooks/campaign/useCampaignLinkForCampaignV2";
import { ProfileCampaignV2Card_CampaignsNamespaceQueryResponse$key } from "components/pages/profile/__generated__/ProfileCampaignV2Card_CampaignsNamespaceQueryResponse.graphql";
import ProfileCampaignV2CardGoal from "components/pages/profile/ProfileCampaignV2CardGoal";
import ProfileCard from "components/pages/profile/ProfileCard";

const fragment = graphql`
  fragment ProfileCampaignV2Card_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignsForUser(input: $input) {
      campaigns(
        after: $after
        # Assuming this fetches all the campaigns. We just need to find the creator's published
        # campaign in this component.
        first: $first
        input: $input
      ) {
        edges {
          node {
            previewAsset {
              ...AssetForAssetExpress_AssetExpress
            }

            status
            tagline
            title

            ...ProfileCampaignV2CardGoal_CampaignV2
            ...useCampaignLinkForCampaignV2_CampaignV2
          }
        }
      }
    }
  }
`;

function FragmentLoader({
  campaignsNamespace,
}: {
  campaignsNamespace: ProfileCampaignV2Card_CampaignsNamespaceQueryResponse$key;
}) {
  const campaignsNamespaceData = useFragment(fragment, campaignsNamespace);
  const publishedCampaignNode =
    campaignsNamespaceData.campaignsForUser.campaigns?.edges.find(
      ({ node }) => node.status === "Published"
    );
  const campaignLink = useCampaignLinkForCampaignV2(
    publishedCampaignNode?.node ?? null
  );

  if (publishedCampaignNode == null) {
    return null;
  }

  const { previewAsset, tagline, title } = publishedCampaignNode.node;

  return (
    <ProfileCard>
      <div className={styles.asset}>
        <AspectRatioContainer width={16} height={9}>
          <AssetForAssetExpress
            asset={previewAsset}
            borderRadius={12}
            height="100%"
            objectFit="cover"
            width="100%"
          />
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
          <Header3 colorClass={ColorClass.Primary}>{title}</Header3>
          <Body1 colorClass={ColorClass.Primary}>{tagline}</Body1>
          <ProfileCampaignV2CardGoal campaign={publishedCampaignNode.node} />
        </div>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.Body1Medium}
          href={campaignLink!}
          type="link_internal"
        >
          See the campaign
        </ButtonWithText>
      </div>
    </ProfileCard>
  );
}

type Props = {
  createdCampaignsQueryRef: PreloadedQuery<useProfilePageCreatedCampaignsQuery>;
};

function QueryLoader({ createdCampaignsQueryRef }: Props) {
  const data = usePreloadedQuery<useProfilePageCreatedCampaignsQuery>(
    profilePageCreatedCampaignsQuery,
    createdCampaignsQueryRef
  );

  return <FragmentLoader campaignsNamespace={data.CampaignsNamespace} />;
}

// TODO[@arcticmatt] consider making this take in a fragment on CampaignV2 to make
// it more reusable.
//
// For more context, see https://github.com/formfunction-hq/formfn-monorepo/pull/3278#discussion_r1043925517
export default function ProfileCampaignV2Card({
  createdCampaignsQueryRef,
}: Props) {
  return (
    <Suspense fallback={null}>
      <QueryLoader createdCampaignsQueryRef={createdCampaignsQueryRef} />
    </Suspense>
  );
}
