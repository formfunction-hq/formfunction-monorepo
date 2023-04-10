import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  SendCreatorInvitesInput,
  SendCreatorInvitesResponse,
} from "src/__generated__/generated";
import MyContext from "src/types/MyContext";
import getPublicKey from "src/utils/headers/getPublicKey";
import { User } from "@prisma/client";
import { nanoid } from "nanoid";
import dayjs from "src/utils/dates/dayjsex";
import getInviteLinkPathFromToken from "formfn-shared/dist/utils/invites/getInviteLinkPathFromToken";
import { Request } from "express";
import pLimit from "p-limit";
import getUnusedInviteWhere from "src/utils/invites/getUnusedInviteWhere";
import acceptInvite from "src/utils/invites/acceptInvite";
import { DEFAULT_INVITE_LINK_EXPIRY_DURATION } from "formfn-shared/dist/constants/InvitesConstants";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import createInviteReceivedNotification from "src/utils/notifications/create/createInviteReceivedNotification";
import createInvitesConvertedToCreatorNotification from "src/utils/notifications/create/createInvitesConvertedToCreatorNotification";
import getFrontendUrl from "src/utils/getFrontendUrl";

// TODO[@bryancho]: clean up errors and add better logging

const limit = pLimit(5);

async function sendEmailInvite(
  req: Request,
  currentTime: dayjs.Dayjs,
  inviteOwner: User,
  email: string,
  inviteId: string
) {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { email } });
  if (user != null) {
    logError(
      AnalyticsEvent.SendCreatorInviteFail,
      "user with specified email already exists",
      req,
      { inviteId, inviteOwner, inviteeEmail: email },
      "warning"
    );
    throw new Error(
      `A user with that email already exists. Please refresh and enter their username/wallet address instead.`
    );
  }

  const inviteLinkToken = nanoid();
  const inviteUpdate = await prisma.creatorInvite.update({
    data: {
      inviteLinkExpirationTime: currentTime
        .add(DEFAULT_INVITE_LINK_EXPIRY_DURATION)
        .toDate(),
      inviteLinkTimeCreated: currentTime.toDate(),
      inviteLinkToken,
      receiverEmail: email,
    },
    where: { id: inviteId },
  });

  await createInviteReceivedNotification(
    {
      expiryInDays: DEFAULT_INVITE_LINK_EXPIRY_DURATION.asDays(),
      inviteLink: `${getFrontendUrl()}${getInviteLinkPathFromToken(
        inviteUpdate.inviteLinkToken!
      )}`,
      inviteeEmail: email,
    },
    inviteOwner.id
  );

  return email;
}

async function sendCreatorInvitesResolver(
  context: MyContext,
  input: SendCreatorInvitesInput
): Promise<SendCreatorInvitesResponse> {
  const { emails, userIdsOrUsernames } = input;
  const inviteSenderId = getPublicKey(context.req)?.toString();
  if (inviteSenderId == null) {
    logError(
      AnalyticsEvent.SendCreatorInviteFail,
      "no public key found",
      context.req
    );
    throw new Error("You must be signed in to send invites");
  }

  const prisma = getPrisma();
  const currentTime = dayjs();
  const [inviteSender, availableInvites] = await Promise.all([
    prisma.user.findUnique({
      where: { id: inviteSenderId },
    }),
    prisma.creatorInvite.findMany({
      // Use invites that are going to expire soonest first
      orderBy: { expirationTime: "asc" },
      where: getUnusedInviteWhere(currentTime, inviteSenderId),
    }),
  ]);

  if (emails.length + userIdsOrUsernames.length > availableInvites.length) {
    logError(
      AnalyticsEvent.SendCreatorInviteFail,
      "not enough invites available",
      context.req,
      {
        numInvitesAttempted: emails.length + userIdsOrUsernames.length,
        numInvitesAvailable: availableInvites.length,
      },
      "warning"
    );
    throw new Error("You do not have enough invites");
  }

  const sentEmails = await Promise.all(
    emails.map((email, i) =>
      limit(async () =>
        sendEmailInvite(
          context.req,
          currentTime,
          inviteSender!,
          email,
          availableInvites[i].id
        )
      )
    )
  );

  const convertedUserIds = await Promise.all(
    userIdsOrUsernames.map((userIdOrUsername, i) =>
      limit(async () =>
        acceptInvite(
          currentTime,
          userIdOrUsername,
          availableInvites[emails.length + i].id,
          context.req,
          async (inviteReceiver: User) => {
            await createInvitesConvertedToCreatorNotification(
              {},
              inviteReceiver.id,
              inviteSender!.id
            );
          }
        )
      )
    )
  );

  return {
    __typename: Typename.SendCreatorInvitesResponse,
    convertedUserIds,
    sentEmails,
  };
}

export default sendCreatorInvitesResolver;
