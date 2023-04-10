import { User } from "@prisma/client";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import dayjs from "src/utils/dates/dayjsex";
import { Request } from "express";
import getPrisma from "src/utils/prisma/getPrisma";

function updateCreatorInvite(
  currentTime: dayjs.Dayjs,
  inviteReceiverId: string,
  inviteId: string
) {
  const prisma = getPrisma();
  return prisma.creatorInvite.update({
    data: {
      receiverId: inviteReceiverId,
      timeAccepted: currentTime.toDate(),
    },
    where: { id: inviteId },
  });
}

export default async function acceptInvite(
  currentTime: dayjs.Dayjs,
  userIdOrUsername: string,
  inviteId: string,
  req?: Request,
  onCompletedCallback?: (inviteReceiver: User) => Promise<void>
): Promise<string> {
  const prisma = getPrisma();
  const inviteReceiver = await prisma.user.findFirst({
    where: { OR: [{ id: userIdOrUsername }, { username: userIdOrUsername }] },
  });
  if (inviteReceiver == null) {
    logError(
      AnalyticsEvent.AcceptCreatorInviteFail,
      "invite receiver does not exist",
      req,
      {
        inviteId,
        userIdOrUsername,
      }
    );
    throw new Error("User not found");
  }
  if (inviteReceiver.isWhitelisted === true) {
    logError(
      AnalyticsEvent.AcceptCreatorInviteFail,
      "invite receiver already creator",
      req,
      {
        inviteId,
        userIdOrUsername,
      }
    );
    throw new Error("This user is already a creator!");
  }

  const creatorUpdate = prisma.whitelist.create({
    data: { address: inviteReceiver.id },
  });
  const userUpdate = prisma.user.update({
    data: { isWhitelisted: true },
    where: { id: inviteReceiver.id },
  });

  const invite = await prisma.creatorInvite.findUnique({
    select: { ownerId: true, receiverId: true, timeAccepted: true },
    where: { id: inviteId },
  });
  if (
    invite == null ||
    invite.receiverId != null ||
    invite.timeAccepted != null ||
    inviteReceiver.id === invite.ownerId
  ) {
    logError(
      AnalyticsEvent.AcceptCreatorInviteFail,
      "invite not found or already used",
      req,
      {
        inviteId,
        userIdOrUsername,
      }
    );
    throw new Error("This invite is not valid. Please try again.");
  }

  await prisma.$transaction([
    creatorUpdate,
    userUpdate,
    updateCreatorInvite(currentTime, inviteReceiver.id, inviteId),
  ]);

  if (onCompletedCallback != null) {
    await onCompletedCallback(inviteReceiver);
  }

  return userIdOrUsername;
}
