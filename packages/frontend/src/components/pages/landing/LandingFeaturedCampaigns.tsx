import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { Suspense } from "react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { LandingFeaturedCampaignsQuery } from "components/pages/landing/__generated__/LandingFeaturedCampaignsQuery.graphql";
import CampaignGridFullWidth from "components/campaign/CampaignGridFullWidth";
import LandingSectionHeader from "components/pages/landing/LandingSectionHeader";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import useCampaignGridFullWidthColumnCount from "hooks/grids/useCampaignGridFullWidthColumnCount";
import CampaignGridFullWidthLoading from "components/campaign/CampaignGridFullWidthLoading";
import ColorClass from "types/enums/ColorClass";
import FlexBox from "components/layout/FlexBox";
import TextButton from "components/buttons/TextButton";
import styles from "css/pages/landing/LandingFeaturedCampaigns.module.css";
import getExploreLinkRelative from "utils/explore/getExploreLinkRelative";
import ExploreTab from "types/enums/ExploreTab";
import CampaignCategoryExpress_enum from "types/relay/CampaignCategoryExpress_enum";
import FontClass from "types/enums/FontClass";
import HUMAN_READABLE_CAMPAIGN_CATEGORY from "constants/HumanReadableCampaignCategory";
import ExploreCampaignCardForCampaignV2WithNftAssets from "components/pages/explore/ExploreCampaignCardForCampaignV2WithNftAssets";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ColorValue from "types/enums/ColorValue";

export const query = graphql`
  query LandingFeaturedCampaignsQuery($input: CampaignsFeaturedInput!) {
    CampaignsNamespace {
      campaignsFeatured(input: $input) {
        campaigns {
          id
          ...ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2
        }
        featuredCategories
      }
    }
  }
`;

function CampaignCategoryPill({
  category,
}: {
  category: CampaignCategoryExpress_enum;
}) {
  return (
    <TextButton
      className={styles.categoryPill}
      fontClass={FontClass.Body1Medium}
      buttonThemeOrColorClass={ColorClass.Primary}
      href={getExploreLinkRelative(ExploreTab.Campaigns, {
        categories: category,
      })}
      type="link_internal"
    >
      {HUMAN_READABLE_CAMPAIGN_CATEGORY[category]}
    </TextButton>
  );
}

function FeaturedCampaignCategoryPills({
  categories,
}: {
  categories: ReadonlyArray<CampaignCategoryExpress_enum>;
}) {
  return (
    <FlexBox
      flexDirection="row"
      gap={16}
      flexWrap="wrap"
      className={styles.categoryPillsGrid}
    >
      {categories.map((category) => (
        <CampaignCategoryPill
          key={category}
          category={category as CampaignCategoryExpress_enum}
        />
      ))}
    </FlexBox>
  );
}

function Inner() {
  const data = useLazyLoadQuery<LandingFeaturedCampaignsQuery>(query, {
    input: {},
  });
  const numCampaignsToShow = useCampaignGridFullWidthColumnCount();

  const { campaigns, featuredCategories } =
    data.CampaignsNamespace.campaignsFeatured;
  if (campaigns.length === 0) {
    return null;
  }

  return (
    <FlexBox flexDirection="column" gap={64} alignItems="center">
      {featuredCategories.length > 0 ? (
        <FeaturedCampaignCategoryPills categories={featuredCategories} />
      ) : null}
      <CampaignGridFullWidth>
        {campaigns.slice(0, numCampaignsToShow).map((campaign) => (
          <ExploreCampaignCardForCampaignV2WithNftAssets
            campaign={campaign}
            key={campaign.id}
          />
        ))}
      </CampaignGridFullWidth>
    </FlexBox>
  );
}

export default function LandingFeaturedCampaign(): Maybe<JSX.Element> {
  return (
    <ResponsiveContainer>
      <LandingSectionHeader>
        Support creators&apos; dream projects
      </LandingSectionHeader>
      <Suspense fallback={<CampaignGridFullWidthLoading />}>
        <Inner />
      </Suspense>
      <div className={styles.buttonContainer}>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          href="/explore?tab=Campaigns"
          icon={<ArrowRightIcon colorValue={ColorValue.White} size={24} />}
          type="link_internal"
        >
          See all campaigns
        </ButtonWithText>
      </div>
    </ResponsiveContainer>
  );
}
