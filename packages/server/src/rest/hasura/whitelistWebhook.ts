import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import approveActiveArtistSubmissionForUser from "src/utils/voting/approveActiveArtistSubmissionForUser";

// Keep Whitelist in sync with User.isWhitelisted
export default async function whitelistWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { address: oldAddress } = body.event.data.old || {};
  const { address } = body.event.data.new || {};

  const prisma = getPrisma();
  // In the case of deletion, address will be null since `event.data.new` will be null
  // See https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload
  const isWhitelisted = address != null;

  try {
    await prisma.user.update({
      data: { isWhitelisted },
      // When deleting, address will be null and oldAddress will have the user ID to update
      where: { id: address ?? oldAddress },
    });
    if (isWhitelisted) {
      await approveActiveArtistSubmissionForUser(address);
    }
  } catch {
    // Update can fail if user is not found which is possible since
    // address can be null or address can be an arbitrary address
    res.json({ address, success: true, userNotFound: true });
    return;
  }

  res.json({ address, success: true });
}
