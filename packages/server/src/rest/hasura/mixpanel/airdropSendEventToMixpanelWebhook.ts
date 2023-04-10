import { Airdrop } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import toObject from "formfn-shared/dist/utils/toObject";
import MixpanelEvent from "src/types/enums/MixpanelEvent";
import dayjs from "src/utils/dates/dayjsex";
import getEnvironment from "src/utils/getEnvironment";
import getMixpanelClient from "src/utils/mixpanel/getMixpanelClient";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";

const EVENT_CONFIGS: Array<{
  eventName: string;
  getDistinctId: (airdrop: Airdrop) => string;
}> = [
  {
    eventName: MixpanelEvent.AirdropIsFromUserId,
    getDistinctId: (airdrop) => airdrop.fromAddress,
  },
  {
    eventName: MixpanelEvent.AirdropIsToUserId,
    getDistinctId: (airdrop) => airdrop.toAddress,
  },
];

export default async function airdropSendEventToMixpanelWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const payload = req.body.event.data.new;
  const { id } = payload;
  const environment = getEnvironment();
  const mixpanelClient = getMixpanelClient();
  const airdrop = await getPrisma().airdrop.findUnique({
    where: {
      id,
    },
  });
  invariant(airdrop != null);

  mixpanelClient.import_batch(
    EVENT_CONFIGS.map((config) => ({
      event: config.eventName,
      properties: {
        ...toObject(payload),
        $insert_id: airdrop.id,
        distinct_id: config.getDistinctId(airdrop),
        environment,
        time: dayjs(airdrop.timeCreated).unix(),
      },
    }))
  );

  res.json({ success: true });
}
