import {
  CampaignForNftInput,
  CampaignForNftResponse,
  CampaignStatusExpress_Enum,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import convertCurrency from "src/utils/convert/convertCurrency";

function isCampaignVisibleForNft(status: CampaignStatusExpress_Enum) {
  switch (status) {
    case CampaignStatusExpress_Enum.Concluded:
    case CampaignStatusExpress_Enum.Published:
      return true;
    case CampaignStatusExpress_Enum.Approved:
    case CampaignStatusExpress_Enum.Draft:
    case CampaignStatusExpress_Enum.Pending:
    case CampaignStatusExpress_Enum.Rejected:
      return false;
    default:
      return assertUnreachable(status);
  }
}

export default async function campaignForNftResolver(
  context: MyContext,
  input: CampaignForNftInput
): Promise<CampaignForNftResponse> {
  const prisma = getPrisma();
  const campaign = await prisma.campaign.findFirst({
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: {
      CampaignFundingTier: {
        some: {
          Nft: {
            some: {
              mint: input.mint,
            },
          },
        },
      },
    },
  });

  const campaignGoalCurrency =
    campaign?.GoalCurrency == null
      ? null
      : convertCurrency(campaign.GoalCurrency);

  if (
    campaign == null ||
    // A campaign should not be visibly associated with an NFT unless the campaign
    // is published or concluded.
    !isCampaignVisibleForNft(campaign.status as CampaignStatusExpress_Enum)
  ) {
    return {
      __typename: Typename.CampaignForNftResponse,
      campaign: null,
      campaignGoalCurrency,
    };
  }

  return {
    __typename: Typename.CampaignForNftResponse,
    campaign: await convertCampaign(campaign),
    campaignGoalCurrency,
  };
}
