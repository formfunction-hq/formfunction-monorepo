import { NextFunction, Request, Response } from "express";
import encodeDiscordAuthCallbackParams from "formfn-shared/dist/utils/discord/encodeDiscordAuthCallbackParams";
import getPrisma from "src/utils/prisma/getPrisma";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import parseDiscordAuthorizationNonce from "src/utils/discord/parseDiscordAuthorizationNonce";
import isDiscordAuthorizationNonceExpired from "src/utils/discord/isDiscordAuthorizationNonceExpired";
import {
  getDiscordOauthToken,
  getDiscordUserWithOauthToken,
  getMemberInGuildByUserIdIfExists,
} from "src/utils/discord/discordApiClient";
import DiscordAuthCallbackFailureReason from "formfn-shared/dist/types/enums/DiscordAuthCallbackFailureReason";
import getRedirectUrlFromRequest from "src/utils/social/getRedirectUrlFromRequest";
import { RedirectLocation_Enum } from "src/__generated__/generated";
import updateDiscordAuthAndGrantRoles from "src/utils/discord/updateDiscordAuthAndGrantRoles";

type DiscordCallbackQuery = {
  code: string;
  state: string;
};

function getDiscordAuthRedirectUrl({
  failureReason,
  redirectLocation,
  success,
}: {
  failureReason?: DiscordAuthCallbackFailureReason;
  redirectLocation: RedirectLocation_Enum;
  success: boolean;
}) {
  const params = encodeDiscordAuthCallbackParams(success, failureReason);
  return getRedirectUrlFromRequest(redirectLocation, `?${params.toString()}`);
}

export default async function discordAuthCallback(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const { code, state: authorizationNonce } = req.query as DiscordCallbackQuery;
  const { expiration, redirectLocation } =
    parseDiscordAuthorizationNonce(authorizationNonce);

  try {
    if (isDiscordAuthorizationNonceExpired(expiration)) {
      const redirectUrl = getDiscordAuthRedirectUrl({
        failureReason: DiscordAuthCallbackFailureReason.ExpiredNonce,
        redirectLocation,
        success: false,
      });
      res.redirect(redirectUrl);
      return;
    }

    const discordAuth = await prisma.discordAuth.findUnique({
      include: {
        User: {},
      },
      where: {
        authorizationNonce,
      },
    });

    // discordAuth with authorizationNonce must exist:
    if (discordAuth == null) {
      const redirectUrl = getDiscordAuthRedirectUrl({
        failureReason: DiscordAuthCallbackFailureReason.UnexpectedError,
        redirectLocation,
        success: false,
      });
      res.redirect(redirectUrl);
      return;
    }

    const oauthToken = await getDiscordOauthToken(code);
    const discordUser = await getDiscordUserWithOauthToken(oauthToken);

    const maybeExistingDiscordAuth = await prisma.discordAuth.findUnique({
      where: {
        discordUserId: discordUser.id,
      },
    });

    if (
      maybeExistingDiscordAuth != null &&
      maybeExistingDiscordAuth.userId !== discordAuth.userId
    ) {
      const redirectUrl = getDiscordAuthRedirectUrl({
        failureReason: DiscordAuthCallbackFailureReason.DiscordHandleTaken,
        redirectLocation,
        success: false,
      });
      res.redirect(redirectUrl);
      return;
    }

    const guildMember = await getMemberInGuildByUserIdIfExists(discordUser.id);

    if (guildMember != null) {
      // Member is in our Server, grant them the role if they need it.
      await updateDiscordAuthAndGrantRoles({
        discordAuth,
        guildMember,
        isWhitelisted: discordAuth.User.isWhitelisted,
      });
    } else {
      // Member is not in our server and still needs to join to get the role.
      await prisma.discordAuth.update({
        data: {
          authorizationNonce: null,
          discordHandle: discordUser.username,
          discordUserId: discordUser.id,
          hasConnectedDiscordAccount: true,
          hasJoinedDiscordServer: false,
        },
        where: {
          authorizationNonce,
        },
      });
    }

    const redirectUrl = getDiscordAuthRedirectUrl({
      redirectLocation,
      success: true,
    });
    res.redirect(redirectUrl);
  } catch (err: any) {
    logError(AnalyticsEvent.DiscordAuthCallbackError, err, req);
    const redirectUrl = getDiscordAuthRedirectUrl({
      failureReason: DiscordAuthCallbackFailureReason.UnexpectedError,
      redirectLocation,
      success: false,
    });
    res.redirect(redirectUrl);
  }
}
