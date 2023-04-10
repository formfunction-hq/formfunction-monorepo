import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import FlexBox from "components/layout/FlexBox";
import ChecklistItem from "components/misc/ChecklistItem";
import {
  CampaignDraftChecklist_CampaignV2$data,
  CampaignDraftChecklist_CampaignV2$key,
} from "components/pages/campaign/edit/__generated__/CampaignDraftChecklist_CampaignV2.graphql";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import { useFragment } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

enum SubmitForApprovalChecklistSection {
  FundingTiers = "Funding tiers",
}
enum PublishChecklistSection {
  AtleastOneNftPerFundingTier = "Have at least one NFT per funding tier",
}

enum ChecklistSection {
  AboutSection = "About section",
  BasicInfo = "Basic info",
  CampaignGallery = "Campaign gallery",
}

type Variant = "publish" | "submitForApproval";

const fragment = graphql`
  fragment CampaignDraftChecklist_CampaignV2 on CampaignV2 {
    about {
      campaign
      # eslint-disable-next-line relay/unused-fields
      contactInfo
      # eslint-disable-next-line relay/unused-fields
      creator
      # eslint-disable-next-line relay/unused-fields
      risksAndChallenges
      # eslint-disable-next-line relay/unused-fields
      timeline
    }
    galleryAssets {
      # eslint-disable-next-line relay/unused-fields
      id
    }
    fundingTiers {
      __typename
      ... on CampaignFundingTierStandard {
        metadataAccountsForPreview: metadataAccounts(first: 3) {
          edges {
            # eslint-disable-next-line relay/unused-fields
            node {
              # eslint-disable-next-line relay/unused-fields
              id
            }
          }
        }
      }
    }
  }
`;

type Props = {
  campaign: CampaignDraftChecklist_CampaignV2$key;
  inFlight: boolean;
  onSubmit: () => void;
  variant: Variant;
};

function getChecklist(
  campaignData: CampaignDraftChecklist_CampaignV2$data,
  variant: Variant
) {
  const { fundingTiers, galleryAssets, about } = campaignData;
  const baseChecklist = {
    [ChecklistSection.BasicInfo]: true,
    [ChecklistSection.CampaignGallery]:
      galleryAssets != null && galleryAssets.length > 0,
    [ChecklistSection.AboutSection]: Object.values(about).some(
      (val) => !isEmptyString(val)
    ),
  };

  switch (variant) {
    case "publish":
      return {
        ...baseChecklist,
        [PublishChecklistSection.AtleastOneNftPerFundingTier]:
          fundingTiers != null &&
          fundingTiers.length > 0 &&
          fundingTiers
            .map((fundingTier) => {
              switch (fundingTier.__typename) {
                case "CampaignFundingTierStandard":
                  return fundingTier;
                default:
                  return null;
              }
            })
            .every(
              (fundingTier) =>
                (fundingTier?.metadataAccountsForPreview?.edges ?? []).length >
                0
            ),
      };

    case "submitForApproval":
      return {
        ...baseChecklist,
        [SubmitForApprovalChecklistSection.FundingTiers]:
          fundingTiers != null && fundingTiers.length > 0,
      };
    default:
      return assertUnreachable(variant);
  }
}

function getButtonText(variant: Variant) {
  switch (variant) {
    case "publish":
      return "Publish";
    case "submitForApproval":
      return "Submit for approval";
    default:
      return assertUnreachable(variant);
  }
}

export default function CampaignDraftChecklist({
  variant,
  campaign,
  inFlight,
  onSubmit,
}: Props) {
  const campaignData = useFragment(fragment, campaign);

  const checklist = getChecklist(campaignData, variant);

  return (
    <>
      <FlexBox flexDirection="column" gap={16}>
        {Object.keys(checklist).map((k) => (
          <ChecklistItem done={checklist[k as ChecklistSection]} text={k} />
        ))}
      </FlexBox>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        fontClass={FontClass.NavLink}
        isLoading={inFlight}
        onClick={onSubmit}
        disabled={Object.values(checklist).some((val) => !val)}
      >
        {getButtonText(variant)}
      </ButtonWithText>
    </>
  );
}
