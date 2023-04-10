import { NextFunction, Request, Response } from "express";
import isProd from "src/utils/isProd";
import sendSlackNotification from "src/utils/tooling/sendSlackNotification";
import SlackWebhook from "src/types/enums/SlackWebhook";
import { NftStatusExpress_Enum } from "src/__generated__/generated";

export default async function notifyNftUpdateWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { oldStatus } = body.event.data.old;
  const { mint, status } = body.event.data.new;

  if (
    oldStatus !== NftStatusExpress_Enum.Auction &&
    status === NftStatusExpress_Enum.Auction &&
    isProd()
  ) {
    await sendSlackNotification(
      SlackWebhook.AuctionAlertChannel,
      `*New Auction Alert* (${mint}): auction started for NFT! Check it out at https://formfunction.xyz/@/${mint}`
    );
  }

  if (
    oldStatus === NftStatusExpress_Enum.Auction &&
    status !== NftStatusExpress_Enum.Auction &&
    isProd()
  ) {
    await sendSlackNotification(
      SlackWebhook.AuctionAlertChannel,
      `*Auction Status Change* (${mint}): from "${oldStatus}" to "${status}"! Check it out at https://formfunction.xyz/@/${mint}`
    );
  }

  res.json({ success: true }).send();
}
