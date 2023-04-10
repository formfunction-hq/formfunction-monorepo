import Typename from "src/types/enums/Typename";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import { CampaignsConnection } from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";

export default async function getCampaignsConnectionForWhereClause(
  after: Maybe<string>,
  first: number,
  where: Prisma.CampaignWhereInput,
  orderBy?: Prisma.Enumerable<Prisma.CampaignOrderByWithRelationInput>
): Promise<CampaignsConnection> {
  validateFirstInput(first);
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();

  const [campaigns, totalCount] = await Promise.all([
    prisma.campaign.findMany({
      include: CONVERT_CAMPAIGN_INCLUDE,
      orderBy: orderBy ?? {
        timeCreated: "desc",
      },
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.campaign.count({ where }),
  ]);

  const converted = await Promise.all(
    campaigns.map((campaign) => convertCampaign(campaign))
  );

  return createOffsetPaginationConnection(
    converted,
    Typename.CampaignsEdge,
    Typename.CampaignsConnection,
    after,
    first,
    totalCount
  );
}
