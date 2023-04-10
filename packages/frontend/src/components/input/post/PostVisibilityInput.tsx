import RadioButtonWithLabel from "components/buttons/RadioButtonWithLabel";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import { Dispatch, SetStateAction } from "react";
import PostVisibilityExpress_enum from "types/relay/PostVisibilityExpress_enum";
import RadioButtonWithInput from "components/buttons/RadioButtonWithInput";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { PostVisibilityInput_CampaignV2$key } from "components/input/post/__generated__/PostVisibilityInput_CampaignV2.graphql";
import GenericFundingTiersInput from "components/input/GenericFundingTiersInput";

const fragment = graphql`
  fragment PostVisibilityInput_CampaignV2 on CampaignV2 {
    fundingTiers {
      __typename
      ... on ICampaignFundingTier {
        # For some reason needed for type reduction to work properly
        # eslint-disable-next-line relay/unused-fields
        id
      }
      ... on CampaignFundingTierStandard {
        title
        ...GenericFundingTiersInput_CampaignFundingTierStandard
      }
    }
  }
`;

type Props = {
  campaign: PostVisibilityInput_CampaignV2$key;
  fundingTierIds: Set<string>;
  label: string;
  setFundingTierIds: (val: Set<string>) => void;
  setVisibility: Dispatch<SetStateAction<PostVisibilityExpress_enum>>;
  visibility: string;
};

export default function PostVisibilityInput({
  campaign,
  fundingTierIds,
  setFundingTierIds,
  visibility,
  setVisibility,
  label,
}: Props) {
  const campaignData = useFragment(fragment, campaign);
  const filteredFundingTiers =
    campaignData.fundingTiers?.filter(
      (fundingTier) => fundingTier.__typename === "CampaignFundingTierStandard"
    ) ?? null;
  const selectedFundingTiers = filteredFundingTiers?.filter(({ id }) =>
    fundingTierIds.has(id ?? "")
  );

  return (
    <InputWithLabel
      input={
        <>
          <RadioButtonWithInput
            isActive={visibility === "CampaignSupportersOnly"}
            buttonLabel={
              <Body1 colorClass={ColorClass.Primary}>Supporters only</Body1>
            }
            buttonDescription='Only supporters of this campaign can see the post under the "Community" tab on your campaign page, and they will receive an email.'
            onClick={() => setVisibility("CampaignSupportersOnly")}
            input={
              <GenericFundingTiersInput
                showAllSupportersOption={false}
                fundingTiers={filteredFundingTiers}
                selectedFundingTierIds={fundingTierIds}
                setSelectedFundingTierIds={setFundingTierIds}
                buttonText={
                  fundingTierIds.size === 0
                    ? "All supporters of this project"
                    : `Only supporters of: ${(selectedFundingTiers ?? [])
                        .map(({ title }) => title)
                        .join(", ")}`
                }
              />
            }
          />
          <RadioButtonWithLabel
            isActive={visibility === "Public"}
            label={<Body1 colorClass={ColorClass.Primary}>Public</Body1>}
            description='Anyone can see the post under the "Public Updates" tab on your campaign page.'
            onClick={() => setVisibility("Public")}
          />
        </>
      }
      label={<InputLabel label={label} required />}
    />
  );
}
