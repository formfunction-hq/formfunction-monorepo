import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE from "src/constants/include/ConvertCampaignFundingTierInclude";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import ConvertCampaignFundingTierType from "src/types/convert/ConvertCampaignFundingTierType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import getCampaignForCampaignForSlugInput from "src/utils/campaigns/getCampaignForCampaignForSlugInput";
import areCampaignHoldersVisible from "src/utils/campaigns/permissions/areCampaignHoldersVisible";
import convertCampaignFundingTier from "src/utils/convert/convertCampaignFundingTier";
import convertUser from "src/utils/convert/convertUser";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CampaignFundingTierHolders,
  CampaignHoldersForSlugInput,
  UserExpress,
} from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default async function campaignHoldersByFundingTierForSlugResolver(
  input: CampaignHoldersForSlugInput,
  context: MyContext
): Promise<Maybe<Array<CampaignFundingTierHolders>>> {
  const verifiedPublicKey = assertUserSignedRequest(context);
  const prisma = getPrisma();
  const { campaign, isViewerHolder, isViewerTeamMember } =
    await getCampaignForCampaignForSlugInput(
      input,
      verifiedPublicKey.toString()
    );
  invariant(campaign != null, "Campaign must not be null!");
  const viewerId = verifiedPublicKey.toString();
  if (
    !areCampaignHoldersVisible(
      viewerId,
      campaign,
      isViewerHolder,
      isViewerTeamMember
    )
  ) {
    return null;
  }

  const holders = await prisma.campaignToHolder.findMany({
    include: {
      User: {
        include: {
          Nft_Nft_ownerIdToUser: {
            include: {
              CampaignFundingTier: {
                include: CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE,
              },
            },
            where: {
              CampaignFundingTier: {
                Campaign: { id: campaign.id },
                id:
                  input.fundingTierIds != null
                    ? { in: input.fundingTierIds }
                    : undefined,
              },
            },
          },
          ...CONVERT_USER_INCLUDE,
        },
      },
    },
    where: {
      Campaign: {
        id: campaign.id,
      },
    },
  });
  const holdersByFundingTierId = holders.reduce((prev, cur) => {
    const currentHolderFundingTierIds = removeDuplicatesWithSet(
      cur.User.Nft_Nft_ownerIdToUser.map((nft) => nft.campaignFundingTierId)
    );
    const ret = {
      ...prev,
    };
    currentHolderFundingTierIds.forEach((id) => {
      invariant(id != null);
      if (id in ret) {
        ret[id].holders.push(convertUser(cur.User));
      } else {
        ret[id] = {
          fundingTier: cur.User.Nft_Nft_ownerIdToUser.find(
            (nft) => nft.campaignFundingTierId === id
          )!.CampaignFundingTier!,
          holders: [convertUser(cur.User)],
        };
      }
    });

    return ret;
  }, {} as Record<string, { fundingTier: ConvertCampaignFundingTierType; holders: Array<UserExpress> }>);

  return Object.keys(holdersByFundingTierId).map((fundingTierId) => ({
    __typename: Typename.CampaignFundingTierHolders,
    fundingTier: convertCampaignFundingTier(
      holdersByFundingTierId[fundingTierId].fundingTier
    ),
    holders: holdersByFundingTierId[fundingTierId].holders.map((user) => ({
      __typename: Typename.Holder,
      user,
    })),
  }));
}
