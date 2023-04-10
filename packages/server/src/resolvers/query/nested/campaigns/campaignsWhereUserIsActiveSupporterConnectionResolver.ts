import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CampaignsConnection,
  CampaignsWhereUserIsActiveSupporterInput,
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import getUserFilter from "src/utils/prisma/where/getUserFilter";
import getCampaignsConnectionForWhereClause from "src/utils/campaigns/getCampaignsConnectionForWhereClause";
import getEmptyConnection from "src/utils/graphql/getEmptyConnection";
import Typename from "src/types/enums/Typename";

export default async function campaignsWhereUserIsActiveSupporterConnectionResolver(
  _context: MyContext,
  after: Maybe<string>,
  first: number,
  input: CampaignsWhereUserIsActiveSupporterInput
): Promise<CampaignsConnection> {
  const prisma = getPrisma();

  const user = await prisma.user.findUnique({
    where: getUserFilter(input.userId, input.username),
  });
  if (user == null) {
    return getEmptyConnection(Typename.CampaignsConnection);
  }

  const where: Prisma.CampaignWhereInput = {
    CampaignToHolder: {
      some: {
        holderUserId: user.id,
      },
    },
    creatorId: { not: user.id },
    status:
      input.statuses == null || input.statuses.length === 0
        ? undefined
        : {
            in: input.statuses,
          },
  };

  return getCampaignsConnectionForWhereClause(after, first, where);
}
