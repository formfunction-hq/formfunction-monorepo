import {
  Asset,
  Nft,
  NftListing,
  NftMetadata,
  NftTransaction,
  Unlockable,
  UnlockableWinner,
  User,
} from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";
import { Maybe } from "graphql/jsutils/Maybe";
import invariant from "tiny-invariant";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import getNoopResponse from "src/utils/getNoopResponse";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import NoopResponse from "src/types/enums/NoopResponse";
import createUnlockableShareInfoNotification from "src/utils/notifications/create/createUnlockableShareInfoNotification";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";

function isPrimarySaleTransaction(
  req: Request,
  res: Response
): Maybe<NftTransaction> {
  const nftTransaction: NftTransaction = req.body.event.data.new;

  if (
    ![
      NftTransactionTypeExpress_Enum.AuctionWon,
      NftTransactionTypeExpress_Enum.Sold,
      NftTransactionTypeExpress_Enum.SoldAcceptedOffer,
      NftTransactionTypeExpress_Enum.SoldInstantSale,
    ].includes(nftTransaction.type as NftTransactionTypeExpress_Enum)
  ) {
    res.json(getNoopResponse(NoopResponse.NonMatchingTransactionType));
    return null;
  }

  if (nftTransaction.auctionCount !== 0) {
    res.json(getNoopResponse(NoopResponse.NotPrimarySaleTransaction));
    return null;
  }

  return nftTransaction;
}

type UpdateUnlockableWinnerInfo = {
  unlockableId: string;
  winnerId: string;
};

async function getUpdateUnlockableWinnerInfo(
  nftTransaction: NftTransaction,
  res: Response
): Promise<Maybe<UpdateUnlockableWinnerInfo>> {
  const prisma = getPrisma();
  const nftListing = await prisma.nftListing.findFirst({
    include: {
      Currency: true,
      Unlockable: true,
    },
    where: {
      NOT: [{ Unlockable: null }],
      nftId: nftTransaction.mint,
    },
  });

  if (nftListing == null) {
    res.json(getNoopResponse(NoopResponse.NftListingNull));
    return null;
  }
  invariant(
    nftListing.Unlockable != null,
    "nftListing.Unlockable cannot be null"
  );

  const { price: salePriceInLamports } = nftTransaction;
  invariant(salePriceInLamports != null, "salePriceInLamports cannot be null");

  const { activationPriceInLamports } = nftListing.Unlockable;
  const { decimals } = nftListing.Currency;
  if (
    activationPriceInLamports != null &&
    salePriceInLamports < activationPriceInLamports
  ) {
    res.json(
      getNoopResponse(
        `No action taken - primary sale transaction price of ${formatDecimals(
          Number(salePriceInLamports),
          decimals
        )} is below the unlockable activation price of ${formatDecimals(
          Number(activationPriceInLamports),
          decimals
        )}`
      )
    );
    return null;
  }

  const winnerId = nftTransaction.toUserId;
  const unlockableWinner = await prisma.unlockableWinner.findFirst({
    where: {
      unlockableId: nftListing.Unlockable.id,
      userId: winnerId,
    },
  });

  if (unlockableWinner != null) {
    res.json(
      getNoopResponse(
        `No action taken - unlockable winner already exists for user ${winnerId}.`
      )
    );
    return null;
  }

  return {
    unlockableId: nftListing.Unlockable.id,
    winnerId,
  };
}

type UnlockableWinnerResult = Unlockable & {
  Asset: Asset;
  NftListing: Maybe<
    NftListing & {
      Nft_NftToNftListing_nftId: Nft & {
        Creator: User;
        NftMetadata: NftMetadata;
      };
    }
  >;
  UnlockableWinner: Array<
    UnlockableWinner & {
      User: User;
    }
  >;
};

async function updateUnlockableWinner({
  winnerId,
  unlockableId,
}: UpdateUnlockableWinnerInfo): Promise<UnlockableWinnerResult> {
  const prisma = getPrisma();
  return prisma.unlockable.update({
    data: {
      UnlockableWinner: {
        create: {
          userEmail: null,
          userId: winnerId,
        },
      },
    },
    include: {
      Asset: true,
      NftListing: {
        include: {
          Nft_NftToNftListing_nftId: {
            include: {
              Creator: true,
              NftMetadata: true,
            },
          },
        },
      },
      UnlockableWinner: {
        include: {
          User: true,
        },
      },
    },
    where: {
      id: unlockableId,
    },
  });
}

async function sendEmailToUnlockableWinner(
  req: Request,
  unlockableWinner: UnlockableWinnerResult
) {
  invariant(
    unlockableWinner.NftListing != null,
    "unlockableWinner.NftListing cannot be null"
  );

  const creator = unlockableWinner.NftListing.Nft_NftToNftListing_nftId.Creator;
  const winningUser = unlockableWinner.UnlockableWinner[0].User;

  await createUnlockableShareInfoNotification(
    {
      nftMint: unlockableWinner.NftListing.Nft_NftToNftListing_nftId.mint,
    },
    winningUser.id,
    creator.id
  );
}

export default async function auctionWonUpdateUnlockableWinner(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const auctionSettledTx = isPrimarySaleTransaction(req, res);
    if (auctionSettledTx == null) {
      return;
    }

    const winnerInfo = await getUpdateUnlockableWinnerInfo(
      auctionSettledTx,
      res
    );
    if (winnerInfo == null) {
      return;
    }

    const result = await updateUnlockableWinner(winnerInfo);
    await sendEmailToUnlockableWinner(req, result);

    logEvent(AnalyticsEvent.UpdateUnlockableWinnerSuccess, req, { result });
    res.json({ data: jsonStringify(result), success: true });
  } catch (err: any) {
    logError(AnalyticsEvent.UpdateUnlockableWinnerFail, err, req);
    res.status(500).json({ success: false });
  }
}
