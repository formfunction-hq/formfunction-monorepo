import { CampaignToHolder, Prisma } from "@prisma/client";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import ConvertUserType from "src/types/convert/ConvertUserType";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function getCampaignHoldersForCampaignToHolderWhere(
  where: Prisma.CampaignToHolderWhereInput,
  skip?: number,
  first?: number
): Promise<[Array<CampaignToHolder & { User: ConvertUserType }>, number]> {
  const prisma = getPrisma();
  const [holders, holderCount] = await Promise.all([
    prisma.campaignToHolder.findMany({
      include: { User: { include: CONVERT_USER_INCLUDE } },
      orderBy: { User: { username: "asc" } },
      skip: skip ?? undefined,
      take: first ?? undefined,
      where,
    }),
    prisma.campaignToHolder.count({ where }),
  ]);
  return [holders, holderCount];
}
