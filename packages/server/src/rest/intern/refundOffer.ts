import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import cancelAndRefundOffer from "src/utils/offers/cancelAndRefundOffer";
import OFFER_WITH_NFT_AND_TRANSACTION_INCLUDE from "src/constants/include/OfferWithNftAndTransactionInclude";
import toObject from "formfn-shared/dist/utils/toObject";

// Although we could technically reuse the `refund` endpoint for
// refunding offers, this endpoint takes care of other nice things
// like automatically closing the offer and sending an email and
// closely mimics the production code path that cancels expired offers.
export default async function refundOffer(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { offerId } = req.body;
  const prisma = getPrisma();

  const offer = await prisma.offer.findUnique({
    include: OFFER_WITH_NFT_AND_TRANSACTION_INCLUDE,
    where: { id: String(offerId) },
  });
  if (offer == null) {
    res.sendStatus(404);
    return;
  }

  const result = await cancelAndRefundOffer(req, offer);

  res.json(toObject({ offer, result }));
}
