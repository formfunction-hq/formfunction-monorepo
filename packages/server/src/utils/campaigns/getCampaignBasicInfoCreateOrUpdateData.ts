import { Prisma } from "@prisma/client";
import getDashCasedString from "formfn-shared/dist/utils/string/getDashCasedString";
import {
  CampaignStatusExpress_Enum,
  CreateCampaignInput,
  Maybe,
  UpdateCampaignBasicInfoInput,
} from "src/__generated__/generated";

export default function getCampaignBasicInfoCreateOrUpdateData(
  input: CreateCampaignInput | UpdateCampaignBasicInfoInput,
  existingPreviewAssetId: Maybe<string>,
  creatorId: string,
  campaignStatus: CampaignStatusExpress_Enum
): Prisma.CampaignCreateInput {
  return {
    CampaignCategory: {
      connect: {
        value: input.category,
      },
    },
    CampaignColorScheme: {
      connect: {
        value: input.colorScheme,
      },
    },
    CampaignGoalType: {
      connect: {
        value: input.goal.goalType,
      },
    },
    CampaignStatus: {
      connect: {
        value: campaignStatus,
      },
    },
    Creator: {
      connect: {
        id: creatorId,
      },
    },
    GoalCurrency: {
      connect: {
        name: input.goal.goalCurrencyName,
      },
    },
    PreviewAsset: {
      ...(existingPreviewAssetId != null
        ? { connect: { id: existingPreviewAssetId } }
        : {
            create: {
              contentType: input.previewAsset!.contentType,
              downloadUrl: input.previewAsset!.downloadUrl,
              height: input.previewAsset!.dimensions?.height,
              path: input.previewAsset!.path,
              width: input.previewAsset!.dimensions?.width,
            },
          }),
    },
    goalAmount: input.goal.goalAmount,
    goalProgressSymbol: input.goal.goalProgressSymbol,
    // TODO: may want to take this as input and limit length
    slug: getDashCasedString(input.title),
    tagline: input.tagline,
    title: input.title,
  };
}
