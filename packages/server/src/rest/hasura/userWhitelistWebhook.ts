import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";

// Runs when User is inserted to account for cases where
// an ID was preemptively added to the Whitelist table
export default async function userWhitelistWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { id } = body.event.data.new;

  const prisma = getPrisma();
  const isWhitelisted = await prisma.whitelist.findFirst({
    where: { address: id },
  });

  if (isWhitelisted) {
    await prisma.user.update({ data: { isWhitelisted: true }, where: { id } });
  }

  res.json({ success: true }).send();
}
