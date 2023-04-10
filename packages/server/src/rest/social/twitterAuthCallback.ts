import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getPrisma from "src/utils/prisma/getPrisma";
import getRedirectUrlFromRequest from "src/utils/social/getRedirectUrlFromRequest";
import getTwitterClient from "src/utils/social/getTwitterClient";
import { RedirectLocation_Enum } from "src/__generated__/generated";

export default async function twitterAuthCallback(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { query } = req;
  const redirectRaw = req.query.redirect;
  const redirect = Object.values(RedirectLocation_Enum).includes(
    redirectRaw as any
  )
    ? (redirectRaw as RedirectLocation_Enum)
    : null;
  const errorRedirect = getRedirectUrlFromRequest(
    redirect,
    "?twitterAuthError=1"
  );

  if (!query.oauth_token || !query.oauth_verifier) {
    logError(AnalyticsEvent.TwitterAuthCallbackFail, "Invalid request", req, {
      hasOauthToken: query.oauth_token != null && query.oauth_token !== "",
      hasOauthVerifier:
        query.oauth_verifier != null && query.oauth_verifier !== "",
    });
    return res.redirect(errorRedirect);
  }

  const prisma = getPrisma();
  const twitterAuthInfo = await prisma.twitterAuth.findUnique({
    where: { requestToken: String(query.oauth_token) || "" },
  });

  if (twitterAuthInfo == null) {
    logError(
      AnalyticsEvent.TwitterAuthCallbackFail,
      "Could not find twitter auth info",
      req,
      {
        twitterAuthInfoLoaded: false,
      }
    );
    return res.redirect(errorRedirect);
  }
  const token = req.query.oauth_token as string;
  const verifier = req.query.oauth_verifier as string;
  const { requestToken, requestTokenSecret } = twitterAuthInfo;

  if (!requestToken || !requestTokenSecret || requestToken !== token) {
    logError(
      AnalyticsEvent.TwitterAuthCallbackFail,
      "Invalid twitter auth info",
      req,
      {
        hasRequestToken: requestToken != null,
        hasRequestTokenSecret: requestTokenSecret != null,
        requestTokenMatchesOauthToken: requestToken === token,
      }
    );
    return res.redirect(errorRedirect);
  }

  const twitterClient = getTwitterClient(undefined, {
    accessSecret: requestTokenSecret,
    accessToken: token,
  });

  try {
    const {
      accessToken,
      accessSecret: accessTokenSecret,
      screenName,
    } = await twitterClient.login(verifier);

    await Promise.all([
      prisma.twitterAuth.update({
        data: {
          accessToken,
          accessTokenSecret,
          requestToken: null,
          requestTokenSecret: null,
          userId: twitterAuthInfo.userId,
        },
        where: { userId: twitterAuthInfo.userId },
      }),
      prisma.user.update({
        data: {
          twitterName: screenName,
        },
        where: { id: twitterAuthInfo.userId },
      }),
    ]);
  } catch (err: any) {
    logError(AnalyticsEvent.TwitterAuthCallbackFail, err, req, {
      twitterApiError: err.message,
    });
    return res.redirect(errorRedirect);
  }

  return res.redirect(getRedirectUrlFromRequest(redirect));
}
