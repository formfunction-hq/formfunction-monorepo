import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getVerifiedPublicKey from "src/utils/auth/getVerifiedPublicKey";
import firebaseCustomToken from "src/utils/firebase/firebaseCustomToken";

export default async function loginFirebase(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const verifiedPublicKey = getVerifiedPublicKey(req);

  if (verifiedPublicKey == null) {
    res.status(500).json({ errorMessage: "not verified" });
    return;
  }

  const firebaseToken = await firebaseCustomToken(verifiedPublicKey.toString());
  if (firebaseToken == null) {
    logError(AnalyticsEvent.LoginFirebaseError, "firebaseToken is null", req, {
      publicKey: verifiedPublicKey.toString(),
      verified: verifiedPublicKey != null,
    });
    res.status(500).json({ errorMessage: "firebaseToken is null" });
    return;
  }

  res.json({ firebaseToken });
}
