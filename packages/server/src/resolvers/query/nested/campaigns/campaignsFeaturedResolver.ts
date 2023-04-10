import {
  CampaignCategoryExpress_Enum,
  CampaignsFeaturedInput,
  CampaignsFeaturedResponse,
  CampaignStatusExpress_Enum,
  Maybe,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import convertCampaign from "src/utils/convert/convertCampaign";
import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";

export default async function campaignsFeaturedResolver(
  _context: MyContext,
  input: CampaignsFeaturedInput
): Promise<CampaignsFeaturedResponse> {
  const featuredCampaignsConfig = await getLdFlag<{
    campaigns: Array<string>;
    categories: Maybe<Array<string>>;
  }>(LaunchDarklyFlag.FeaturedCampaignsConfig, {
    campaigns: [],
    categories: null,
  });
  const { campaigns: featuredCampaignIds, categories } =
    featuredCampaignsConfig;

  const prisma = getPrisma();
  const campaigns = await prisma.campaign.findMany({
    include: CONVERT_CAMPAIGN_INCLUDE,
    orderBy: {
      timeCreated: "desc",
    },
    where: {
      category:
        input.categories == null || input.categories.length === 0
          ? undefined
          : {
              in: input.categories,
            },
      id: {
        in: featuredCampaignIds,
      },
      status: {
        in: [
          CampaignStatusExpress_Enum.Concluded,
          CampaignStatusExpress_Enum.Published,
        ],
      },
    },
  });
  const converted = await Promise.all(
    campaigns
      // Make sure the order is the same as the featuredCampaignIds
      .sort(
        (a, b) =>
          featuredCampaignIds.indexOf(a.id) - featuredCampaignIds.indexOf(b.id)
      )
      .map((campaign) => convertCampaign(campaign))
  );

  return {
    __typename: Typename.CampaignsFeaturedResponse,
    campaigns: converted,
    featuredCategories: (categories?.filter((val) =>
      Object.values(CampaignCategoryExpress_Enum).includes(
        val as CampaignCategoryExpress_Enum
      )
    ) ?? []) as Array<CampaignCategoryExpress_Enum>,
  };
}
