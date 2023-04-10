import { User, DiscordAuth } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import invariant from "tiny-invariant";
import { getMemberInGuildByUserIdIfExists } from "src/utils/discord/discordApiClient";
import updateDiscordAuthAndGrantRoles from "src/utils/discord/updateDiscordAuthAndGrantRoles";
import getPrisma from "src/utils/prisma/getPrisma";
import createVotingApprovedNotification from "src/utils/notifications/create/createVotingApprovedNotification";
import createVotingRejectedNotification from "src/utils/notifications/create/createVotingRejectedNotification";
import createVotingDuplicateNotification from "src/utils/notifications/create/createVotingDuplicateNotification";
import createVotingBrokeGuidelinesNotification from "src/utils/notifications/create/createVotingBrokeGuidelinesNotification";

async function setUserShouldSeeDiscordOnboardingPrompt(userId: string) {
  const prisma = getPrisma();
  await prisma.user.update({
    data: {
      shouldSeeDiscordOnboardingPrompt: true,
    },
    where: {
      id: userId,
    },
  });
}

async function grantRolesIfUserHasCompletedDiscordOnboarding(
  user: User & {
    DiscordAuth: DiscordAuth | null;
  }
) {
  const { DiscordAuth: discordAuth } = user;
  if (
    discordAuth?.discordUserId == null ||
    discordAuth.hasConnectedDiscordAccount === false
  ) {
    return setUserShouldSeeDiscordOnboardingPrompt(user.id);
  }

  const guildMember = await getMemberInGuildByUserIdIfExists(
    discordAuth.discordUserId
  );

  if (guildMember == null) {
    return setUserShouldSeeDiscordOnboardingPrompt(user.id);
  }

  return updateDiscordAuthAndGrantRoles({
    discordAuth,
    guildMember,
    isWhitelisted: true,
  });
}

/**
 * If an artist submission status changes to "Approved", adds user to whitelist and sends email.
 *
 * If an artist submission status changes to "Rejected", sends rejection email.
 */
export default async function updateArtistSubmissionWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { status: statusOld } = body.event.data.old;
  const { id, status: statusNew, userId } = body.event.data.new;

  if (statusOld === statusNew) {
    res.json({
      message: `No status change, ${statusOld} -> ${statusNew}`,
      success: true,
    });
    return;
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    include: { DiscordAuth: {} },
    where: { id: userId },
  });
  invariant(user != null, "User must not be null");
  invariant(user.email != null, "User email must not be null");

  const rejectedVote = await prisma.vote.findFirst({
    where: {
      artistSubmissionId: id,
      voteType: {
        in: ["PrescreenReject", "Reject"],
      },
    },
  });

  // TODO: make enum for status
  switch (statusNew) {
    case "Approved": {
      await prisma.whitelist.create({
        data: {
          address: user.id,
        },
      });

      await grantRolesIfUserHasCompletedDiscordOnboarding(user);

      await createVotingApprovedNotification({}, user.id);
      break;
    }
    case "ApprovedWithoutVoting": {
      await grantRolesIfUserHasCompletedDiscordOnboarding(user);
      break;
    }
    case "Rejected":
      switch (rejectedVote?.reason ?? null) {
        case "BreaksGuidelines":
          await createVotingBrokeGuidelinesNotification({}, user.id);
          break;
        case "Duplicate":
          await createVotingDuplicateNotification({}, user.id);
          break;
        case "LowQuality":
        default:
          await createVotingRejectedNotification({}, user.id);
      }
      break;
    default:
      break;
  }

  res.json({
    message: `Status changed from ${statusOld} -> ${statusNew}`,
    success: true,
  });
}
