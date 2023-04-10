import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  AirdropTypeExpress_Enum,
  CreateAirdropsForCampaignInput,
  CreateAirdropsForCampaignResponse,
  Maybe,
} from "src/__generated__/generated";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import convertUser from "src/utils/convert/convertUser";
import createAirdrops from "src/utils/airdrop/createAirdrops";
import getCampaignHoldersFromCampaignToHolderTable from "src/utils/campaigns/getCampaignHoldersFromCampaignToHolderTable";
import getCampaignHoldersFromCampaignFundingTiers from "src/utils/campaigns/getCampaignHoldersFromCampaignFundingTiers";

async function getToAddresses(
  campaignId: string,
  fundingTierIds: Maybe<Array<string>>
): Promise<Array<string>> {
  const [holders] =
    fundingTierIds == null || fundingTierIds.length === 0
      ? await getCampaignHoldersFromCampaignToHolderTable(campaignId)
      : await getCampaignHoldersFromCampaignFundingTiers(
          campaignId,
          fundingTierIds
        );

  return holders.map(({ User: { id } }) => id);
}

export default async function createAirdropsForCampaignResolver(
  context: MyContext,
  input: CreateAirdropsForCampaignInput
): Promise<CreateAirdropsForCampaignResponse> {
  const verifiedPublicKey = assertUserSignedRequest(context);
  const { masterEditionMint, fundingTierIds, campaignId, type } = input;

  const toAddresses = await getToAddresses(campaignId, fundingTierIds ?? []);
  const airdrops = await createAirdrops(
    context.req,
    masterEditionMint,
    verifiedPublicKey.toString(),
    toAddresses,
    type
  );

  return {
    __typename: Typename.CreateAirdropsForCampaignResponse,
    airdrops: airdrops.map((airdrop) => ({
      __typename: Typename.Airdrop,
      id: airdrop.id,
      toUser: convertUser(airdrop.ToUser),
      type: airdrop.type as AirdropTypeExpress_Enum,
    })),
  };
}
