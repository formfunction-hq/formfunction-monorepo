import MyContext from "src/types/MyContext";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import arrayIntersect from "formfn-shared/dist/utils/array/arrayIntersect";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CampaignsConnection,
  CampaignsForUserInput,
  CampaignStatusExpress_Enum,
  RequestStatusExpress_Enum,
} from "src/__generated__/generated";
import { Prisma } from "@prisma/client";
import getUserFilter from "src/utils/prisma/where/getUserFilter";
import isCampaignVisible from "src/utils/campaigns/permissions/isCampaignVisible";
import getCampaignsConnectionForWhereClause from "src/utils/campaigns/getCampaignsConnectionForWhereClause";
import getEmptyConnection from "src/utils/graphql/getEmptyConnection";
import Typename from "src/types/enums/Typename";
import getViewerId from "src/utils/auth/getViewerId";

async function getVisibleCampaignStatusesForViewer(
  viewerId: MaybeUndef<string>,
  creatorId: string,
  inputStatuses: Array<CampaignStatusExpress_Enum>
): Promise<Array<CampaignStatusExpress_Enum>> {
  const visibleStatuses = await Promise.all(
    Object.values(CampaignStatusExpress_Enum).filter((status) =>
      isCampaignVisible(creatorId, status, viewerId)
    )
  );

  if (inputStatuses.length === 0) {
    return visibleStatuses;
  }

  return arrayIntersect(inputStatuses, visibleStatuses);
}

export default async function campaignsForUserConnectionResolver(
  context: MyContext,
  after: Maybe<string>,
  first: number,
  input: CampaignsForUserInput
): Promise<CampaignsConnection> {
  const viewerId = getViewerId(context, input.viewerId);
  const prisma = getPrisma();

  const user = await prisma.user.findUnique({
    where: getUserFilter(input.userId, input.username),
  });
  if (user == null) {
    return getEmptyConnection(Typename.CampaignsConnection);
  }

  const where: Prisma.CampaignWhereInput = {
    OR: [
      { creatorId: user.id },
      {
        CampaignToTeamMember: {
          some: {
            Request: { status: RequestStatusExpress_Enum.Approved },
            memberId: user.id,
          },
        },
      },
    ],
    status: {
      in: await getVisibleCampaignStatusesForViewer(
        viewerId,
        user!.id,
        input.statuses ?? []
      ),
    },
  };

  return getCampaignsConnectionForWhereClause(after, first, where);
}
