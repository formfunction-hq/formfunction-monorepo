import { Prisma } from "@prisma/client";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import SOLD_TRANSACTION_TYPES from "src/constants/SoldTransactionTypes";
import ConvertCampaignType from "src/types/convert/ConvertCampaignType";
import Typename from "src/types/enums/Typename";
import bigintToNumber from "src/utils/bigintToNumber";
import convertCurrency from "src/utils/convert/convertCurrency";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CampaignGoal,
  CampaignGoalTypeExpress_Enum,
} from "src/__generated__/generated";

function getCurrentAmountWhere(campaignId: string) {
  const where: Prisma.NftTransactionFindManyArgs["where"] = {
    Nft: {
      CampaignFundingTier: {
        campaignId,
      },
    },
    // We only want primary sales
    auctionCount: 0,
    type: {
      in: SOLD_TRANSACTION_TYPES,
    },
  };
  return where;
}

async function getMonetaryGoalCurrentAmount(
  campaignId: string
): Promise<number> {
  const prisma = getPrisma();
  const result = await prisma.nftTransaction.aggregate({
    _sum: {
      price: true,
    },
    where: getCurrentAmountWhere(campaignId),
  });

  return bigintToNumber(result._sum.price) ?? 0;
}

async function getSaleCountGoalCurrentAmount(
  campaignId: string
): Promise<number> {
  const prisma = getPrisma();
  return prisma.nftTransaction.count({
    where: getCurrentAmountWhere(campaignId),
  });
}

export default async function getCampaignGoalForCampaign(
  campaign: ConvertCampaignType
): Promise<CampaignGoal> {
  const goalType = campaign.goalType as CampaignGoalTypeExpress_Enum;
  switch (goalType) {
    case CampaignGoalTypeExpress_Enum.Monetary:
      return {
        __typename: Typename.CampaignMonetaryGoal,
        currency: convertCurrency(campaign.GoalCurrency!),
        currentAmount: await getMonetaryGoalCurrentAmount(campaign.id),
        goalAmount: Number(campaign.goalAmount),
      };
    case CampaignGoalTypeExpress_Enum.SaleCount:
      return {
        __typename: Typename.CampaignSaleCountGoal,
        currentAmount: await getSaleCountGoalCurrentAmount(campaign.id),
        goalAmount: Number(campaign.goalAmount),
      };
    default:
      return assertUnreachable(goalType);
  }
}
