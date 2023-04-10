import graphql from "babel-plugin-relay/macro";
import { ProfileCampaignCardQuery } from "components/pages/profile/__generated__/ProfileCampaignCardQuery.graphql";
import { ProfileCampaignCard_User$key } from "components/pages/profile/__generated__/ProfileCampaignCard_User.graphql";
import useFlagsTyped from "hooks/useFlagsTyped";
import { Suspense } from "react";
import { useFragment, useLazyLoadQuery } from "react-relay";
import styles from "css/pages/profile/ProfileCampaignCard.module.css";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import TinyLabel from "components/text/TinyLabel";
import ColorClass from "types/enums/ColorClass";
import Header3 from "components/text/Header3";
import Body1 from "components/text/Body1";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import ProfileCampaignCardSkeleton from "components/pages/profile/ProfileCampaignCardSkeleton";
import AspectRatioContainer from "components/containers/AspectRatioContainer";
import ProfileCampaignCardGoal from "components/pages/profile/ProfileCampaignCardGoal";
import ProfileCard from "components/pages/profile/ProfileCard";

const fragment = graphql`
  fragment ProfileCampaignCard_User on User {
    id
  }
`;

// NOTE: in the future, we will likely want to create a new resolver
// (e.g. campaignForUser), and then load it at the top level using useQueryLoader.
// For now, we'll re-use this resolver for convenience.
export const query = graphql`
  query ProfileCampaignCardQuery($input: CampaignForSlugInput!) {
    campaignForSlug(input: $input) {
      campaign {
        creator {
          username
          ...ArtistPillButtonForUserExpress_UserExpress
        }
        description
        heroAssets {
          ...AssetForAssetExpress_AssetExpress
        }
        title

        ...ProfileCampaignCardGoal_CampaignExpress
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
  const data = useLazyLoadQuery<ProfileCampaignCardQuery>(query, {
    input: {
      campaignSlug,
      creatorId,
    },
  });

  const { campaign } = data.campaignForSlug;
  // TODO[@arcticmatt] delete this later.
  // This makes testing generative mint campaigns safer on prod.
  // That is, we want to be able to navigate to the campaign page directly, but not actually
  // link to it anywhere where a normal user would be able to find it.
  if (campaign == null || campaign.creator.username === "pencilflip") {
    return null;
  }

  return (
    <ProfileCard>
      <div className={styles.asset}>
        <AspectRatioContainer width={16} height={9}>
          <AssetForAssetExpress
            asset={campaign.heroAssets[0]}
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
          <Header3 colorClass={ColorClass.Primary}>{campaign.title}</Header3>
          <Body1 colorClass={ColorClass.Primary}>{campaign.description}</Body1>
          <ProfileCampaignCardGoal campaign={campaign} />
        </div>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.Body1Medium}
          href={getCampaignLinkRelative(
            campaign.creator.username,
            campaignSlug
          )}
          type="link_internal"
        >
          See the campaign
        </ButtonWithText>
      </div>
    </ProfileCard>
  );
}

type Props = {
  user: ProfileCampaignCard_User$key;
};

export default function ProfileCampaignCard({ user }: Props) {
  const userData = useFragment(fragment, user);
  const { campaignsConfig } = useFlagsTyped();
  const campaignsBySlug = campaignsConfig?.campaignsBySlug ?? {};
  const slugForUser = Object.keys(campaignsBySlug).find(
    (slug) => campaignsBySlug[slug].creatorId === userData.id
  );

  if (slugForUser == null) {
    return null;
  }

  return (
    <Suspense fallback={<ProfileCampaignCardSkeleton />}>
      <Inner campaignSlug={slugForUser} creatorId={userData.id} />
    </Suspense>
  );
}
