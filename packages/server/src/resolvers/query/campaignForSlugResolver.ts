import {
  CampaignForSlugInput,
  CampaignForSlugResponse,
  CurrencyNameExpress_Enum,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import convertUser from "src/utils/convert/convertUser";
import getCampaignsConfig from "src/utils/launch-darkly/getCampaignsConfig";
import invariant from "tiny-invariant";
import arraySum from "formfn-shared/dist/utils/array/arraySum";
import bigintToNumber from "src/utils/bigintToNumber";
import getCampaignAmountRaisedTransactionsWhereClause from "src/utils/campaigns/getCampaignAmountRaisedTransactionsWhereClause";
import { WRAPPED_SOL_MINT } from "formfn-shared/dist/constants/SolanaConstants";
import {
  Asset as LdAsset,
  CampaignConfig,
} from "formfn-shared/dist/types/CampaignsConfig";

function ldAssetToAsset(
  { contentType, darkModeInfo, downloadUrl, path }: LdAsset,
  id: string
) {
  return {
    __typename: Typename.Asset as const,
    contentType,
    darkModeInfo:
      darkModeInfo == null
        ? null
        : {
            __typename: Typename.AssetDarkModeInfo as const,
            downloadUrl: darkModeInfo.downloadUrl,
            path: darkModeInfo.path,
          },
    downloadUrl,
    id,
    path,
  };
}

async function getMonetaryGoal(campaignConfig: CampaignConfig) {
  const prisma = getPrisma();
  const where = getCampaignAmountRaisedTransactionsWhereClause(campaignConfig);
  const soldTxs = await prisma.nftTransaction.findMany({ where });
  const amountRaisedInLamports = arraySum(
    soldTxs.map((tx) => bigintToNumber(tx.price)!)
  );
  return {
    // TODO: control currency with LD
    __typename: Typename.CampaignMonetaryGoal as const,
    currency: {
      __typename: Typename.Currency as const,
      decimals: 9,
      id: "Solana",
      mint: WRAPPED_SOL_MINT.toString(),
      name: CurrencyNameExpress_Enum.Solana,
      shortSymbol: "◎",
      symbol: "SOL",
    },
    currentAmount: amountRaisedInLamports,
    goalAmount: campaignConfig.goalInLamports,
  };
}

async function getSaleCountGoal(campaignConfig: CampaignConfig) {
  invariant(campaignConfig.goal != null);
  const candyMachineIds = campaignConfig.sections
    .filter((section) => section.candyMachineId != null)
    .map(({ candyMachineId }) => candyMachineId as string);
  const prisma = getPrisma();
  const where = getCampaignAmountRaisedTransactionsWhereClause(campaignConfig);
  const [numSoldTxs, numSoldNfts] = await Promise.all([
    prisma.nftTransaction.count({ where }),
    // We're running into some issues with Popheadz where the NFT gets inserted into our DB,
    // but the transaction does not. This is a temporary fix to get the sale count goal working.
    prisma.nft.count({
      where: {
        Series: {
          CandyMachine: {
            id: {
              in: candyMachineIds,
            },
          },
        },
      },
    }),
  ]);
  return {
    __typename: Typename.CampaignSaleCountGoal as const,
    currentAmount: Math.max(numSoldTxs, numSoldNfts),
    goalAmount: campaignConfig.goal.goalAmount,
  };
}

async function getGoal(campaignConfig: CampaignConfig) {
  if (
    campaignConfig.goal != null &&
    campaignConfig.goal.__typename === "saleCount"
  ) {
    return getSaleCountGoal(campaignConfig);
  }

  return getMonetaryGoal(campaignConfig);
}

export default async function campaignForSlugResolver(
  input: CampaignForSlugInput
): Promise<CampaignForSlugResponse> {
  invariant(
    input.creatorId != null || input.creatorUsername != null,
    "One of creatorId and creatorUsername must be non-null"
  );
  const prisma = getPrisma();
  const [campaignsConfig, creator] = await Promise.all([
    getCampaignsConfig(),
    prisma.user.findUnique({
      include: CONVERT_USER_INCLUDE,
      where: {
        id: input.creatorId ?? undefined,
        username: input.creatorUsername ?? undefined,
      },
    }),
  ]);

  const campaignConfig = campaignsConfig.campaignsBySlug[input.campaignSlug];

  if (
    creator == null ||
    campaignConfig == null ||
    creator.id !== campaignConfig.creatorId
  ) {
    return {
      __typename: Typename.CampaignForSlugResponse,
    };
  }

  const goal = await getGoal(campaignConfig);

  return {
    __typename: Typename.CampaignForSlugResponse,
    campaign: {
      __typename: Typename.Campaign,
      about: campaignConfig.about,
      amountRaisedInLamports: goal.currentAmount,
      creator: convertUser(creator),
      description: campaignConfig.description,
      descriptionAlt: campaignConfig.descriptionAlt,
      emojiMarker: campaignConfig.emojiMarker,
      goal,
      goalInLamports: campaignConfig.goalInLamports,
      heroAssets: campaignConfig.heroAssets.map((asset, i) =>
        ldAssetToAsset(
          asset,
          `campaign-${creator.id}-${input.campaignSlug}-heroAsset-${i}`
        )
      ),
      // TODO: replace with DB ID when ready
      id: `campaign-${creator.id}-${input.campaignSlug}`,
      logoAsset:
        campaignConfig.logoAsset == null
          ? null
          : ldAssetToAsset(
              campaignConfig.logoAsset,
              `campaign-${creator.id}-${input.campaignSlug}-logoAsset`
            ),
      socialLinks:
        campaignConfig.socialLinks == null
          ? null
          : {
              __typename: Typename.CampaignSocialLinks,
              ...campaignConfig.socialLinks,
            },
      title: campaignConfig.title,
    },
  };
}
