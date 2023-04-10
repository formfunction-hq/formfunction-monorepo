import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import getUnusedInviteWhere from "src/utils/invites/getUnusedInviteWhere";

export default async function getMostRecentlyExpiringInvite(
  prisma: PrismaClient,
  currentTime: dayjs.Dayjs,
  inviteOwnerId: string
) {
  return prisma.creatorInvite.findFirst({
    orderBy: { expirationTime: "asc" },
    select: { id: true },
    where: getUnusedInviteWhere(currentTime, inviteOwnerId),
  });
}
