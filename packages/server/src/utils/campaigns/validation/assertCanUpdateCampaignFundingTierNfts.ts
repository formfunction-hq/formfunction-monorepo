import { PublicKey } from "@solana/web3.js";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import ConvertCampaignFundingTierType from "src/types/convert/ConvertCampaignFundingTierType";
import CampaignAction from "src/types/enums/CampaignAction";
import assertCanUpdateCampaign from "src/utils/campaigns/assertCanUpdateCampaign";

export default async function assertCanUpdateCampaignFundingTierNfts(
  campaignFundingTier: ConvertCampaignFundingTierType & {
    Nft: Array<{ mint: string }>;
  },
  inputNftIds: Array<string>,
  verifiedPublicKey: PublicKey
): Promise<boolean> {
  const existingNftIds = campaignFundingTier.Nft.map((nft) => nft.mint);
  const actions = filterNulls([
    // In input.nftIds, find an id that DOESN'T exist in existingNftIds => adding Nft
    inputNftIds.some((inputNftId) => !existingNftIds.includes(inputNftId))
      ? CampaignAction.AddNft
      : null,
    // In existingNftIds, find one that doesn't exist in input.NftIds => removing NFT
    existingNftIds.some((existingNftId) => !inputNftIds.includes(existingNftId))
      ? CampaignAction.RemoveNft
      : null,
  ]);
  if (actions.length === 0) {
    return true;
  }

  await Promise.all([
    actions.map((action) =>
      assertCanUpdateCampaign(
        verifiedPublicKey,
        {
          id: campaignFundingTier.campaignId,
        },
        action
      )
    ),
  ]);

  return true;
}
