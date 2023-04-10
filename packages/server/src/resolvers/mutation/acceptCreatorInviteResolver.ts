import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  AcceptCreatorInviteInput,
  AcceptCreatorInviteResponse,
} from "src/__generated__/generated";
import MyContext from "src/types/MyContext";
import getPublicKey from "src/utils/headers/getPublicKey";
import dayjs from "src/utils/dates/dayjsex";
import acceptInvite from "src/utils/invites/acceptInvite";
import { User } from "@prisma/client";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import createInvitesInviteeAcceptedInviteNotification from "src/utils/notifications/create/createInvitesInviteeAcceptedInviteNotification";
import invariant from "tiny-invariant";

async function acceptCreatorInviteResolver(
  context: MyContext,
  input: AcceptCreatorInviteInput
): Promise<AcceptCreatorInviteResponse> {
  const { inviteLinkToken, username } = input;
  const inviteAcceptorId = getPublicKey(context.req)?.toString();
  if (inviteAcceptorId == null) {
    logError(
      AnalyticsEvent.AcceptCreatorInviteFail,
      "user's wallet not connected",
      context.req
    );
    throw new Error("Your wallet must be connected to accept the invite");
  }

  const prisma = getPrisma();
  const currentTime = dayjs();
  const [inviteAcceptor, invite] = await Promise.all([
    prisma.user.findUnique({
      select: { username: true },
      where: { id: inviteAcceptorId },
    }),
    prisma.creatorInvite.findUnique({
      // Use invites that are going to expire soonest first
      where: { inviteLinkToken },
    }),
  ]);

  if (inviteAcceptor != null) {
    logError(
      AnalyticsEvent.AcceptCreatorInviteFail,
      "account already exists for wallet",
      context.req
    );
    throw new Error("An account already exists for this wallet");
  }
  if (invite == null || invite.receiverEmail == null) {
    logError(
      AnalyticsEvent.AcceptCreatorInviteFail,
      "invite not found",
      context.req
    );
    throw new Error("An unexpected error occurred. Please try again.");
  }
  if (dayjs(invite.inviteLinkExpirationTime).isBefore(currentTime)) {
    logError(
      AnalyticsEvent.AcceptCreatorInviteFail,
      "invite link expired",
      context.req
    );
    throw new Error("This invite link is expired");
  }

  const inviteSender = await prisma.user.findUnique({
    where: { id: invite.ownerId },
  });
  invariant(inviteSender != null);
  // Execute serially since we need to create the user first
  const user = await prisma.user.create({
    data: {
      email: invite.receiverEmail,
      hasCompletedSignup: true,
      id: inviteAcceptorId,
      username,
    },
  });
  await acceptInvite(
    currentTime,
    user.id,
    invite.id,
    context.req,
    async (_inviteReceiver: User) => {
      await createInvitesInviteeAcceptedInviteNotification(
        {},
        inviteSender.id,
        user.id
      );
    }
  );

  return {
    __typename: Typename.AcceptCreatorInviteResponse,
    username: user.username,
  };
}

export default acceptCreatorInviteResolver;
