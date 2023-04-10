import MyContext from "src/types/MyContext";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import {
  CampaignsConnection,
  CampaignsForExploreInput,
  CampaignSortOrder_Enum,
  CampaignStatusExpress_Enum,
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getCampaignsConnectionForWhereClause from "src/utils/campaigns/getCampaignsConnectionForWhereClause";

function getOrderBy(
  sortOrder: CampaignSortOrder_Enum
): Undef<Prisma.Enumerable<Prisma.CampaignOrderByWithRelationInput>> {
  switch (sortOrder) {
    case CampaignSortOrder_Enum.Newest:
      return [
        {
          timeCreated: "desc",
        },
      ];
    case CampaignSortOrder_Enum.Oldest:
      return [
        {
          timeCreated: "asc",
        },
      ];
    default:
      return assertUnreachable(sortOrder);
  }
}

export default async function campaignsForExploreConnectionResolver(
  _context: Undef<MyContext>,
  after: Maybe<string>,
  first: number,
  input: CampaignsForExploreInput
): Promise<CampaignsConnection> {
  const where: Prisma.CampaignWhereInput = {
    category:
      input.categories == null || input.categories.length === 0
        ? undefined
        : {
            in: input.categories,
          },
    status: CampaignStatusExpress_Enum.Published,
  };

  return getCampaignsConnectionForWhereClause(
    after,
    first,
    where,
    getOrderBy(input.sortOrder)
  );
}
