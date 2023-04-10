import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { getMemberInGuildByUserIdIfExists } from "src/utils/discord/discordApiClient";
import getPublicKey from "src/utils/headers/getPublicKey";
import getPrisma from "src/utils/prisma/getPrisma";
import { UpdateDiscordRolesForUserResponse } from "src/__generated__/generated";
import updateDiscordAuthAndGrantRoles from "src/utils/discord/updateDiscordAuthAndGrantRoles";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";

export default async function updateDiscordRolesForUserResolver(
  context: MyContext
): Promise<UpdateDiscordRolesForUserResponse> {
  assertUserSignedRequest(context);

  const prisma = getPrisma();
  const publicKey = getPublicKey(context.req);
  const userId = publicKey?.toString();

  const discordAuth = await prisma.discordAuth.findUnique({
    include: {
      User: {},
    },
    where: {
      userId,
    },
  });

  if (discordAuth == null || discordAuth.discordUserId == null) {
    logError(
      AnalyticsEvent.DiscordAuthUserNotConnected,
      "discordAuth or discordAuth.discordUserId is null in updateDiscordRolesForUserResolver",
      context.req,
      {
        discordAuth,
      }
    );
    throw new Error("Discord account is not connected.");
  }

  const guildMember = await getMemberInGuildByUserIdIfExists(
    discordAuth.discordUserId
  );

  if (guildMember == null) {
    return {
      __typename: Typename.UpdateDiscordRolesForUserResponseFailure,
      reason:
        "User must be in the Formfunction Discord server to be granted roles.",
    };
  }

  await updateDiscordAuthAndGrantRoles({
    discordAuth,
    guildMember,
    isWhitelisted: discordAuth.User.isWhitelisted,
  });

  const discordAuthWithRoles = await prisma.discordAuth.findUnique({
    include: {
      DiscordAuthToDiscordRole: {},
    },
    where: {
      userId,
    },
  });

  return {
    __typename: Typename.UpdateDiscordRolesForUserResponseSuccess,
    roleIds: (discordAuthWithRoles?.DiscordAuthToDiscordRole ?? []).map(
      (val) => val.discordRoleId
    ),
  };
}
