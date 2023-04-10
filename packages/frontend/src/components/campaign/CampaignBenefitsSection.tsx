import FlexBox from "components/layout/FlexBox";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/campaigns/CampaignBenefitsSection.module.css";
import graphql from "babel-plugin-relay/macro";
import ColorClass from "types/enums/ColorClass";
import { CampaignBenefitsSection_CampaignFundingTierStandard$key } from "components/campaign/__generated__/CampaignBenefitsSection_CampaignFundingTierStandard.graphql";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import Body2 from "components/text/Body2";
import { nftCampaignQuery } from "hooks/nft-page/useNftPageCampaign";
import { useNftPageCampaignQuery } from "hooks/nft-page/__generated__/useNftPageCampaignQuery.graphql";
import { Suspense } from "react";
import { CampaignBenefitsSection_CampaignsNamespaceQueryResponse$key } from "components/campaign/__generated__/CampaignBenefitsSection_CampaignsNamespaceQueryResponse.graphql";
import TextButton from "components/buttons/TextButton";
import FontClass from "types/enums/FontClass";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import useNftPageContext from "hooks/useNftPageContext";
import TextButtonTheme from "types/enums/TextButtonTheme";

const fragment = graphql`
  fragment CampaignBenefitsSection_CampaignFundingTierStandard on CampaignFundingTierStandard {
    benefits {
      description
    }
  }
`;

const campaignFragment = graphql`
  fragment CampaignBenefitsSection_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignForNft(input: $input) {
      campaign {
        slug
        creator {
          username
        }
      }
    }
  }
`;

function FragmentLoader({
  fundingTierData,
  campaignsNamespace,
}: {
  campaignsNamespace: CampaignBenefitsSection_CampaignsNamespaceQueryResponse$key;
  fundingTierData: CampaignBenefitsSection_CampaignFundingTierStandard$key;
}) {
  const campaignFundingTierData = useFragment(fragment, fundingTierData);
  const campaignsNamespaceData = useFragment(
    campaignFragment,
    campaignsNamespace
  );
  const { campaign } = campaignsNamespaceData.campaignForNft;

  if (campaign?.slug == null || campaign?.creator?.username == null) {
    return null;
  }

  const benefits = (campaignFundingTierData?.benefits ?? []).map(
    ({ description }) => (
      <Body2 key={description} colorClass={ColorClass.Primary}>
        • {description}
      </Body2>
    )
  );

  return (
    <FlexBox flexDirection="column" gap={8} className={styles.container}>
      {benefits.length > 0 ? (
        <>
          <TinyLabel
            textTransform="uppercase"
            colorClass={ColorClass.Secondary}
          >
            includes campaign benefits
          </TinyLabel>
          <FlexBox flexDirection="column">{benefits}</FlexBox>
        </>
      ) : (
        <TinyLabel colorClass={ColorClass.Secondary}>
          A part of a campaign
        </TinyLabel>
      )}
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
        fontClass={FontClass.Body2}
        href={getCampaignLinkRelative(campaign.creator.username, campaign.slug)}
        type="link_internal"
      >
        See campaign
      </TextButton>
    </FlexBox>
  );
}

function DataLoader({
  nftCampaignQueryRef,
  fundingTierData,
}: {
  fundingTierData: CampaignBenefitsSection_CampaignFundingTierStandard$key;
  nftCampaignQueryRef: PreloadedQuery<useNftPageCampaignQuery>;
}) {
  const data = usePreloadedQuery(nftCampaignQuery, nftCampaignQueryRef);
  return (
    <FragmentLoader
      fundingTierData={fundingTierData}
      campaignsNamespace={data.CampaignsNamespace}
    />
  );
}

type Props = {
  fundingTierData: CampaignBenefitsSection_CampaignFundingTierStandard$key;
};
export default function CampaignBenefitsSection({ fundingTierData }: Props) {
  const { nftCampaignQueryRef } = useNftPageContext();

  return (
    <Suspense fallback={null}>
      <DataLoader
        fundingTierData={fundingTierData}
        nftCampaignQueryRef={nftCampaignQueryRef!}
      />
    </Suspense>
  );
}
