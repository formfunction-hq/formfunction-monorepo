import { CampaignsForHeroResponse } from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import convertCampaign from "src/utils/convert/convertCampaign";
import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getCompareByPropertyFunction from "formfn-shared/dist/utils/getCompareByPropertyFunction";
import ldBackendUser from "src/utils/launch-darkly/ldBackendUser";

export default async function campaignsForHeroResolver(
  _context: MyContext
): Promise<CampaignsForHeroResponse> {
  const campaignHeroConfig = await getLdFlag<{
    campaigns: Array<{ id: string; launchDate?: string }>;
  }>(
    LaunchDarklyFlag.CampaignHeroConfig,
    {
      campaigns: [],
    },
    ldBackendUser
  );

  const prisma = getPrisma();
  const campaigns = await prisma.campaign.findMany({
    include: CONVERT_CAMPAIGN_INCLUDE,
    orderBy: {
      timeCreated: "desc",
    },
    where: {
      id: {
        in: campaignHeroConfig.campaigns.map((campaign) => campaign.id),
      },
    },
  });
  const campaignsSorted = campaigns.sort(
    getCompareByPropertyFunction("id", (id) =>
      campaignHeroConfig.campaigns.findIndex((campaign) => campaign.id === id)
    )
  );
  const converted = await Promise.all(
    campaignsSorted.map((campaign) => convertCampaign(campaign))
  );

  return {
    __typename: Typename.CampaignsForHeroResponse,
    campaigns: converted,
  };
}
