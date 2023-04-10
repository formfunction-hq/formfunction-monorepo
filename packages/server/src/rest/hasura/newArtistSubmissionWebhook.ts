import { NextFunction, Request, Response } from "express";
import SlackWebhook from "src/types/enums/SlackWebhook";
import isProd from "src/utils/isProd";
import getPrisma from "src/utils/prisma/getPrisma";
import sendSlackNotification from "src/utils/tooling/sendSlackNotification";

export default async function newArtistSubmissionWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { id, twitterName } = body.event.data.new;

  if (!isProd()) {
    res.json({ success: true });
    return;
  }

  const prisma = getPrisma();
  const assets = await prisma.asset.findMany({
    where: { artistSubmissionId: id },
  });
  const count = await prisma.artistSubmission.count();

  const assetsString = assets.map((asset) => asset.downloadUrl).join("\n");

  await sendSlackNotification(
    SlackWebhook.ArtistSubmission,
    `New artist submission (#${count}) from <https://twitter.com/${twitterName}|@${twitterName}>! Here are their assets:\n${assetsString}`
  );

  res.json({ success: true });
}
