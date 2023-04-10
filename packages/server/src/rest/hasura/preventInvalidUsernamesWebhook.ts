import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import isValidDisplayName from "formfn-shared/dist/utils/validation/isValidDisplayName";
import isValidUsername from "formfn-shared/dist/utils/validation/isValidUsername";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

/**
 * We use Hasura to update the username, but we want to prevent invalid usernames (e.g. profane usernames).
 *
 * Frontend validation should prevent most users from using invalid usernames, but if someone hits our server
 * directly in order to choose an invalid username, this webhook will change the username to the user's address.
 *
 * It would be nicer to use a custom mutation to create/update users, but this is easier for now.
 */
export default async function preventInvalidUsernamesWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { id, displayName, username } = body.event.data.new as {
    displayName: Maybe<string>;
    id: string;
    username: string;
  };

  if (
    isValidUsername(username) &&
    (displayName == null || isValidDisplayName(displayName))
  ) {
    res.json({ skipped: true }).send();
    return;
  }

  const prisma = getPrisma();
  if (!isValidUsername(username)) {
    await prisma.user.update({ data: { username: id }, where: { id } });
  }

  if (displayName != null && !isValidDisplayName(displayName)) {
    await prisma.user.update({ data: { displayName: null }, where: { id } });
  }

  res.json({ success: true }).send();
}
