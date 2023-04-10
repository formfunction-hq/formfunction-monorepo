import { CookieOptions, NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import jwt from "jsonwebtoken";
import Environment from "formfn-shared/dist/types/Environment";
import getEnvironment from "src/utils/getEnvironment";
import getCookieWithSuffix from "src/utils/cookies/getCookieWithSuffix";
import CookiePrefix from "formfn-shared/dist/types/enums/CookiePrefix";
import getVerifiedPublicKey from "src/utils/auth/getVerifiedPublicKey";

// Using HS512 to be extra secure
const DEFAULT_JWT_SIGNING_OPTIONS: { algorithm: "HS512" } = {
  algorithm: "HS512",
};

// Couple notes:
// 1. "Claim" is JWT terminology
// 2. https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#the-spec
//    specifies that these claims are required.
const DEFAULT_CLAIMS = {
  "X-Hasura-Allowed-Roles": ["user", "anonymous"],
};

function getSignedJwt(secret: string, userId: string, verified: boolean) {
  return jwt.sign(
    {
      "https://hasura.io/jwt/claims": {
        ...DEFAULT_CLAIMS,
        "X-Hasura-Default-Role": verified ? "user" : "anonymous",
        "X-Hasura-User-Id": userId,
      },
    },
    secret,
    {
      ...DEFAULT_JWT_SIGNING_OPTIONS,
      subject: userId,
    }
  );
}

function getDefaultCookieOptions(): CookieOptions {
  const env = getEnvironment();
  return {
    // For localhost, the domains are the same
    domain: env !== Environment.Local ? "formfunction.xyz" : undefined,
    httpOnly: true,
    // Localhost requests are not made over SSL
    secure: env !== Environment.Local,
  };
}

// See https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/
export default async function login(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  // Generated key using https://stackoverflow.com/a/56934114
  const secret = process.env.JWT_HS512_KEY;
  if (secret == null) {
    logError(AnalyticsEvent.LoginJwtError, "JWT secret is null", req);
    res.sendStatus(500);
    return;
  }
  const verifiedPublicKey = getVerifiedPublicKey(req);
  const hasuraAuthTokenCookie = getCookieWithSuffix(
    CookiePrefix.HasuraAuthToken
  );
  if (verifiedPublicKey == null) {
    const token = getSignedJwt(secret, "anonymous", false);
    res
      .cookie(hasuraAuthTokenCookie, token, getDefaultCookieOptions())
      .json({ token });
    return;
  }

  try {
    const verified = verifiedPublicKey != null;
    const token = getSignedJwt(secret, verifiedPublicKey.toString(), verified);
    res
      .cookie(hasuraAuthTokenCookie, token, getDefaultCookieOptions())
      .json({ token });
  } catch (e) {
    logError(AnalyticsEvent.LoginJwtError, e as Error, req);
    const token = getSignedJwt(
      secret,
      verifiedPublicKey.toString() ?? "anonymous",
      false
    );
    res
      .cookie(hasuraAuthTokenCookie, token, getDefaultCookieOptions())
      .json({ token });
  }
}
