import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import sleep from "formfn-shared/dist/utils/sleep";
import createLastBidPrice from "src/utils/solana/createLastBidPrice";
import dayjs from "src/utils/dates/dayjsex";
import isLastRetry from "src/utils/hasura/isLastRetry";
import getPrisma from "src/utils/prisma/getPrisma";
import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

async function createLastBidPriceAndRespond(
  mint: string,
  nftKind: NftKind,
  req: Request,
  res: Response,
  loggingData: Record<string, any>
) {
  try {
    await createLastBidPrice(mint);
  } catch (e) {
    if (isLastRetry(req)) {
      await logError(
        AnalyticsEvent.CreateLastBidPriceError,
        e as Error,
        req,
        loggingData
      );
    }

    res.status(500).json({ errorMessage: (e as Error).message, nftKind });
    return;
  }

  res.json({ nftKind, success: true });
}

export default async function createLastBidPriceWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { mint } = body.event.data.new;

  // Sleep for a bit, otherwise may get error like this https://sentry.io/organizations/formfunction/issues/2973175815/?project=6155922&referrer=slack
  // (mint may not be initalized yet)
  await sleep(dayjs.duration({ seconds: 45 }));

  const nft = await getPrisma().nft.findUnique({
    include: {
      MasterEditionNft: true,
      Series: {
        include: {
          CandyMachine: true,
        },
      },
    },
    where: {
      mint,
    },
  });
  if (nft == null) {
    res.json({ message: "nft is null, was likely deleted" });
    return;
  }

  const nftKind = getNftKind(
    nft.isMasterEdition,
    nft.isPnft,
    nft.maxSupply,
    nft.MasterEditionNft?.maxSupply ?? null,
    nft.Series?.CandyMachine != null
  );

  if (nft.isImported) {
    // Imported NFTs are hard to reason about, so just always create the last bid price.
    await createLastBidPriceAndRespond(
      mint,
      nftKind,
      req,
      res,
      body.event.data.new
    );
    return;
  }

  switch (nftKind) {
    case NftKind.MasterEditionWithNonzeroSupply: // not expected to be traded
    case NftKind.MasterEditionWithUnlimitedSupply: // not expected to be traded
    case NftKind.OneOfOne: // created when creator mints
    case NftKind.PnftMasterEdition: // not expected to be traded
      res.json({ nftKind, skipped: true });
      break;
    // For cases below, may want to switch to deferring until listing/making offer to save $
    case NftKind.Generative:
    case NftKind.PnftStandardEdition:
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.StandardEditionPrintUnlimitedSupply:
      await createLastBidPriceAndRespond(
        mint,
        nftKind,
        req,
        res,
        body.event.data.new
      );
      break;
    default:
      assertUnreachable(nftKind);
  }
}
