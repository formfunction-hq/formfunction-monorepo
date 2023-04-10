import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getVerifiedPublicKey from "src/utils/auth/getVerifiedPublicKey";

// See
// 1. https://hasura.io/docs/latest/graphql/core/auth/authentication/webhook.html
// 2. https://github.com/hasura/graphql-engine/blob/master/community/boilerplates/auth-webhooks/nodejs-express/server.js
// 3. https://github.com/hasura/graphql-engine/issues/4340#issuecomment-611378063
export default async function hasuraWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const verifiedPublicKey = getVerifiedPublicKey(req);
    const hasuraVariables = {
      "X-Hasura-Role": verifiedPublicKey != null ? "user" : "anonymous",
      "X-Hasura-User-Id": verifiedPublicKey?.toString(),
    };

    res.json(hasuraVariables);
  } catch (e) {
    logError(AnalyticsEvent.HasuraWebhookError, e as Error, req);
    res.json({
      "X-Hasura-Role": "anonymous",
    });
  }
}
