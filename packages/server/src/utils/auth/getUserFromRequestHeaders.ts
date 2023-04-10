import { User } from "@prisma/client";
import { Request } from "express";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getVerifiedPublicKey from "src/utils/auth/getVerifiedPublicKey";
import getPrisma from "src/utils/prisma/getPrisma";

/**
 * Looks up an existing User from the PublicKey in the request headers and
 * verifies the PublicKey and signature in the request headers.
 */
export default async function getUserFromRequestHeaders(
  req: MaybeUndef<Request>
): Promise<Maybe<User>> {
  const verifiedPublicKey = getVerifiedPublicKey(req);
  if (verifiedPublicKey == null) {
    return null;
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: {
      id: verifiedPublicKey.toString(),
    },
  });

  if (user == null) {
    logError(
      AnalyticsEvent.VerificationError,
      `No user exists given valid request public key: ${verifiedPublicKey}`,
      req,
      {
        verifiedPublicKey: verifiedPublicKey.toString(),
      }
    );
    return null;
  }

  return user;
}
