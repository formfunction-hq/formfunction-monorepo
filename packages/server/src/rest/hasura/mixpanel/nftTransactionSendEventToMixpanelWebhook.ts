import { NextFunction, Request, Response } from "express";
import toObject from "formfn-shared/dist/utils/toObject";
import MixpanelEvent from "src/types/enums/MixpanelEvent";
import dayjs from "src/utils/dates/dayjsex";
import getEnvironment from "src/utils/getEnvironment";
import getMixpanelClient from "src/utils/mixpanel/getMixpanelClient";

const EVENT_CONFIGS: Array<{
  eventName: string;
  getDistinctId: (tx: any) => string;
}> = [
  {
    eventName: MixpanelEvent.NftTransactionProfileIsCreatorId,
    getDistinctId: (tx: any) => tx.creatorId,
  },
  {
    eventName: MixpanelEvent.NftTransactionProfileIsFromUserId,
    getDistinctId: (tx: any) => tx.fromUserId,
  },
  {
    eventName: MixpanelEvent.NftTransactionProfileIsToUserId,
    getDistinctId: (tx: any) => tx.toUserId,
  },
];

export default async function nftTransactionSendEventToMixpanelWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const payload = req.body.event.data.new;
  const { id: txid, timeCreated: txTimeCreated } = payload;
  const environment = getEnvironment();
  const mixpanelClient = getMixpanelClient();

  mixpanelClient.import_batch(
    EVENT_CONFIGS.map((config) => ({
      event: config.eventName,
      properties: {
        ...toObject(payload),
        $insert_id: txid,
        distinct_id: config.getDistinctId(payload),
        environment,
        time: dayjs(txTimeCreated).unix(),
      },
    }))
  );

  res.json({ success: true });
}
