import { Request } from "express";
import getVerifiedPublicKey from "src/utils/auth/getVerifiedPublicKey";

/**
 * NOTE: This is used for legacy mutations. For future mutations, userId
 * should be read from getPublicKey and not passed in as an input parameter.
 *
 * Some GraphQL mutations pass userId as an input. As added security this
 * provided userId must match the signed userId in the request headers to
 * ensure it belongs to the user making the request.
 */
export default function validateUserIdInputForRequest(
  req: Request,
  userId: string
) {
  const verifiedPublicKey = getVerifiedPublicKey(req);
  if (verifiedPublicKey == null || verifiedPublicKey.toString() !== userId) {
    throw new Error(
      `Invalid userId provided in request. verifiedPublicKey was ${verifiedPublicKey?.toString()} for userId ${userId}`
    );
  }
}
