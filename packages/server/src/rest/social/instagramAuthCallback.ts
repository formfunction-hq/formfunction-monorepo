import axios from "axios";
import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import is200StatusCode from "src/utils/is200StatusCode";
import getPrisma from "src/utils/prisma/getPrisma";
import getRedirectUrlFromRequest from "src/utils/social/getRedirectUrlFromRequest";
import qs from "qs";
import { RedirectLocation_Enum } from "src/__generated__/generated";

const STATE_END_DELIMITER = "#_";

export default async function instagramAuthCallback(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { code, state } = req.query;
  const stateInner = String(state).split(STATE_END_DELIMITER)[0];
  const [userId, redirectRaw] = String(stateInner).split(",");
  const redirect = Object.values(RedirectLocation_Enum).includes(
    redirectRaw as any
  )
    ? (redirectRaw as RedirectLocation_Enum)
    : null;
  const errorRedirect = getRedirectUrlFromRequest(
    redirect,
    "?instagramAuthError=1"
  );

  if (code == null || code === "" || userId == null || userId === "") {
    logError(AnalyticsEvent.InstagramAuthCallbackFail, "Invalid request", req, {
      code,
      userId,
    });
    return res.redirect(errorRedirect);
  }

  const requestBody = {
    client_id: process.env.INSTAGRAM_APP_ID,
    client_secret: process.env.INSTAGRAM_APP_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: `${process.env.API_URL}/social/instagramCallback`,
  };
  let response;
  try {
    response = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      qs.stringify(requestBody),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
  } catch (e: any) {
    logError(AnalyticsEvent.InstagramAuthCallbackFail, e, req, { requestBody });
    return res.redirect(errorRedirect);
  }

  if (response == null || !is200StatusCode(response.status)) {
    logError(
      AnalyticsEvent.InstagramAuthCallbackFail,
      "Received non-200 status code for Instagram access token request",
      req,
      { requestBody }
    );
    return res.redirect(errorRedirect);
  }

  // The typical flow requires us to exchange this for a long lived access token
  // if querying for data using this token is desired. However, for our purposes
  // we only care about checking that the user has access to the account so we
  // omit that step.
  const shortLivedAccessToken = response.data.access_token;
  const prisma = getPrisma();
  const instagramAuth = await prisma.instagramAuth.findUnique({
    where: { userId: String(userId) },
  });
  if (instagramAuth == null) {
    logError(
      AnalyticsEvent.InstagramAuthCallbackFail,
      "Could not find existing Instagram auth info",
      req,
      {
        shortLivedAccessToken,
      }
    );
    return res.redirect(errorRedirect);
  }

  try {
    const responseInner = await axios.get(
      `https://graph.instagram.com/me?fields=id,username&access_token=${shortLivedAccessToken}`
    );
    if (String(response.data.user_id) !== responseInner.data.id) {
      throw new Error(
        `User ID provided from access token API call ${response.data.user_id}` +
          ` does not match /me API call ${responseInner.data.id}!`
      );
    }

    await prisma.$transaction([
      prisma.instagramAuth.update({
        data: {
          accessToken: shortLivedAccessToken,
        },
        where: { userId: String(userId) },
      }),
      prisma.user.update({
        data: {
          instagramName: responseInner.data.username,
        },
        where: { id: String(userId) },
      }),
    ]);
  } catch (err: any) {
    logError(AnalyticsEvent.InstagramAuthCallbackFail, err, req);
    return res.redirect(errorRedirect);
  }

  return res.redirect(getRedirectUrlFromRequest(redirect));
}
