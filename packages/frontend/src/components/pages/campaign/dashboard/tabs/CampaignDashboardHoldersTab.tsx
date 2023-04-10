import FlexBox from "components/layout/FlexBox";
import CampaignHolders from "components/pages/campaign/campaign-generic/holders/CampaignHolders";
import CampaignDashboardTabGeneric from "components/pages/campaign/dashboard/tabs/CampaignDashboardTabGeneric";
import TinyLabel from "components/text/TinyLabel";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import graphql from "babel-plugin-relay/macro";
import { CampaignDashboardHoldersTab_CampaignV2$key } from "components/pages/campaign/dashboard/tabs/__generated__/CampaignDashboardHoldersTab_CampaignV2.graphql";
import useCampaignHoldersForSlug from "hooks/campaign/useCampaignHoldersForSlug";
import { useEffect, useState } from "react";
import GenericFundingTiersInput from "components/input/GenericFundingTiersInput";

const fragment = graphql`
  fragment CampaignDashboardHoldersTab_CampaignV2 on CampaignV2 {
    title
    slug
    creator {
      username
    }

    fundingTiers {
      ... on ICampaignFundingTier {
        id
        title
      }

      ...GenericFundingTiersInput_CampaignFundingTierStandard
    }
  }
`;

type Props = {
  campaign: CampaignDashboardHoldersTab_CampaignV2$key;
};

export default function CampaignDashboardHoldersTab({
  campaign,
}: Props): JSX.Element {
  const { title, slug, creator, fundingTiers } = useFragment(
    fragment,
    campaign
  );
  const [fundingTierIds, setFundingTierIds] = useState<Set<string>>(new Set());
  const queryInput = {
    campaignSlug: slug!,
    creatorUsername: creator.username,
    fundingTierIds:
      // Sort so that relay always caches the same set of funding tiers that are selected
      fundingTierIds.size > 0 ? Array.from(fundingTierIds).sort() : null,
  };
  const { campaignHoldersQueryRef, loadCampaignHoldersQuery } =
    useCampaignHoldersForSlug(queryInput);
  const selectedFundingTierTitles = fundingTiers
    ?.filter((fundingTier) => fundingTierIds.has(fundingTier.id ?? ""))
    .map(({ title: t }) => t);

  useEffect(() => {
    loadCampaignHoldersQuery(
      { after: null, first: 100, input: queryInput },
      { fetchPolicy: "store-and-network" }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fundingTierIds]);

  const content = (
    <FlexBox
      flexDirection="column"
      alignItems="flex-start"
      gap={20}
      width="100%"
    >
      <GenericFundingTiersInput
        buttonText={
          selectedFundingTierTitles != null &&
          selectedFundingTierTitles.length > 0
            ? `Supporters of: ${selectedFundingTierTitles!.join(", ")}`
            : "Showing all supporters of this project"
        }
        fundingTiers={fundingTiers}
        selectedFundingTierIds={fundingTierIds}
        setSelectedFundingTierIds={setFundingTierIds}
        showAllSupportersOption={false}
      />
      <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
        Supporter Name
      </TinyLabel>
      {campaignHoldersQueryRef != null && (
        <CampaignHolders campaignHoldersQueryRef={campaignHoldersQueryRef} />
      )}
    </FlexBox>
  );

  return (
    <CampaignDashboardTabGeneric
      campaignTitle={title}
      title="Supporter List"
      subtitle="See all supporters of this project. This list is updated routinely to reflect the most current supporters."
      content={content}
    />
  );
}
