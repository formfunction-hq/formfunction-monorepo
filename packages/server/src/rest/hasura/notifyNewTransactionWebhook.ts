import { NextFunction, Request, Response } from "express";
import invariant from "tiny-invariant";
import isProd from "src/utils/isProd";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import sendSlackNotification from "src/utils/tooling/sendSlackNotification";
import SlackWebhook from "src/types/enums/SlackWebhook";
import {
  Currency,
  Nft,
  NftListing,
  NftMetadata,
  NftTransaction,
  User,
} from "@prisma/client";
import DiscordWebhook from "src/types/enums/DiscordWebhook";
import sendDiscordNotification from "src/utils/tooling/sendDiscordNotification";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";

function getName(user: User) {
  if (user.displayName != null && user.displayName !== "") {
    return user.displayName;
  }

  return user.username;
}

async function sendBidAlerts(
  prismaNft: Nft & {
    Creator: User;
    NftListing: Maybe<NftListing>;
    NftMetadata: NftMetadata;
  },
  prismaTx: NftTransaction & { Currency: Currency },
  mint: string
) {
  const timeLeft = dayjs.duration(
    dayjs(prismaNft.NftListing!.auctionEndTime!).diff(dayjs(), "second", true),
    "second"
  );
  const timeLeftStr =
    timeLeft.asDays() >= 1
      ? timeLeft.format("D [days], H [hours], m [minutes], s [seconds]")
      : timeLeft.format("H [hours], m [minutes], s [seconds]");

  const { decimals, shortSymbol, symbol } = prismaTx.Currency;
  const content = `New bid on ${prismaNft.NftMetadata.name} by ${getName(
    prismaNft.Creator
  )} for ${formatDecimals(Number(prismaTx.price!), decimals)} ${
    shortSymbol ?? symbol
  }! This auction ends in ${timeLeftStr}—go check it out at https://formfunction.xyz/@${
    prismaNft.Creator.username
  }/${mint}`;

  await sendSlackNotification(SlackWebhook.BidAlertChannel, content);
  await sendDiscordNotification(DiscordWebhook.BidAlertChannel, content);
}

async function sendOfferAlerts(
  prismaNft: Nft & {
    NftMetadata: NftMetadata;
    Owner: User;
  },
  prismaTx: NftTransaction & {
    Currency: Currency;
    From: User;
    To: User;
  },
  mint: string
) {
  const { decimals, shortSymbol, symbol } = prismaTx.Currency;
  const content = `Offer made on ${prismaNft.NftMetadata.name} by ${getName(
    prismaTx.From
  )} for ${formatDecimals(Number(prismaTx.price!), decimals)} ${
    shortSymbol ?? symbol
  }! Go check it out at https://formfunction.xyz/@${
    prismaNft.Owner.username
  }/${mint}`;

  await sendSlackNotification(SlackWebhook.OfferAlertChannel, content);
}

async function sendOfferAcceptedAlerts(
  prismaNft: Nft & {
    NftMetadata: NftMetadata;
    Owner: User;
  },
  prismaTx: NftTransaction & {
    Currency: Currency;
    From: User;
    To: User;
  },
  mint: string
) {
  const { decimals, shortSymbol, symbol } = prismaTx.Currency;
  const content = `Offer for ${
    prismaNft.NftMetadata.name
  } *accepted* by ${getName(prismaTx.From)} for ${formatDecimals(
    Number(prismaTx.price!),
    decimals
  )} ${shortSymbol ?? symbol}! Go check it out at https://formfunction.xyz/@${
    prismaNft.Owner.username
  }/${mint}`;

  await sendSlackNotification(SlackWebhook.OfferAlertChannel, content);
}

async function sendInstantSaleAlerts(
  prismaNft: Nft & {
    NftMetadata: NftMetadata;
    Owner: User;
  },
  prismaTx: NftTransaction & {
    Currency: Currency;
    From: User;
    To: User;
  },
  mint: string
) {
  const { decimals, shortSymbol, symbol } = prismaTx.Currency;
  const content = `${
    prismaNft.NftMetadata.name
  } was sold as an instant sale by ${getName(
    prismaTx.From
  )} for ${formatDecimals(Number(prismaTx.price!), decimals)} ${
    shortSymbol ?? symbol
  }! Go check it out at https://formfunction.xyz/@${
    prismaNft.Owner.username
  }/${mint}`;

  await sendSlackNotification(SlackWebhook.InstantSaleAlertChannel, content);
  await sendDiscordNotification(
    DiscordWebhook.InstantSaleAlertChannel,
    content
  );
}

async function sendListedAlerts(
  prismaNft: Nft & {
    NftMetadata: NftMetadata;
    Owner: User;
  },
  prismaTx: NftTransaction & { Currency: Currency },
  mint: string
) {
  const label =
    prismaTx.type === NftTransactionTypeExpress_Enum.Listed
      ? "listed"
      : "listed as an instant sale";

  const { decimals, shortSymbol, symbol } = prismaTx.Currency;
  const content = `${prismaNft.NftMetadata.name} was ${label} by ${getName(
    prismaNft.Owner
  )} for ${formatDecimals(Number(prismaTx.price!), decimals)} ${
    shortSymbol ?? symbol
  }! Go check it out at https://formfunction.xyz/@${
    prismaNft.Owner.username
  }/${mint}`;

  await sendSlackNotification(SlackWebhook.ListingAlertChannel, content);
  await sendDiscordNotification(DiscordWebhook.ListingAlertChannel, content);
}

async function sendListedEditionsAlerts(
  prismaNft: Nft & {
    NftListing: Maybe<NftListing>;
    NftMetadata: NftMetadata;
    Owner: User;
  },
  prismaTx: NftTransaction & { Currency: Currency }
) {
  const { decimals, shortSymbol, symbol } = prismaTx.Currency;
  const content = `${prismaNft.maxSupply ?? "Unlimited"} editions of ${
    prismaNft.NftMetadata.name
  } were listed by ${getName(prismaNft.Owner)} for ${formatDecimals(
    Number(prismaTx.price!),
    decimals
  )} ${shortSymbol ?? symbol}! The price function type is ${
    prismaNft.NftListing!.editionPriceFunctionType
  }. Go check it out at https://formfunction.xyz/@${prismaNft.Owner.username}/${
    prismaNft.mint
  }`;

  await sendSlackNotification(SlackWebhook.ListingAlertChannel, content);
  await sendDiscordNotification(DiscordWebhook.ListingAlertChannel, content);
}

async function sendMintedAlerts(
  prismaNft: Nft & {
    NftMetadata: NftMetadata;
    Owner: User;
  },
  mint: string
) {
  const isPnftMasterEdition = prismaNft.isPnft && prismaNft.isMasterEdition;
  if (isPnftMasterEdition) {
    const content = `${
      prismaNft.NftMetadata.name
    } was minted as a new participation NFT by ${getName(
      prismaNft.Owner
    )}! Go check it out at https://formfunction.xyz/@${
      prismaNft.Owner.username
    }/${mint}`;

    await sendSlackNotification(SlackWebhook.PnftAlertChannel, content);
  }

  const maxSupply =
    prismaNft.maxSupply === 0
      ? ""
      : ` (max supply = ${prismaNft.maxSupply ?? "unlimited"})`;
  const content = `${
    prismaNft.NftMetadata.name
  }${maxSupply} was minted by ${getName(
    prismaNft.Owner
  )}! Go check it out at https://formfunction.xyz/@${
    prismaNft.Owner.username
  }/${mint}`;

  await sendSlackNotification(SlackWebhook.MintAlertChannel, content);
}

async function sendClaimedPnftAlerts(
  prismaNft: Nft & {
    NftMetadata: NftMetadata;
    Owner: User;
  },
  mint: string
) {
  const content = `Edition #${prismaNft.edition} of participation NFT ${
    prismaNft.NftMetadata.name
  } was claimed by ${getName(
    prismaNft.Owner
  )}! Go check it out at https://formfunction.xyz/@${
    prismaNft.Owner.username
  }/${mint}`;

  await sendSlackNotification(SlackWebhook.PnftAlertChannel, content);
}

async function sendSoldEditionPrimaryAlerts(
  prismaNft: Nft & {
    NftMetadata: NftMetadata;
    Owner: User;
  },
  prismaTx: NftTransaction & { Currency: Currency }
) {
  const { decimals, shortSymbol, symbol } = prismaTx.Currency;
  const content = `Edition #${prismaNft.edition} of NFT ${
    prismaNft.NftMetadata.name
  } was bought by ${getName(prismaNft.Owner)} for ${formatDecimals(
    Number(prismaTx.price!),
    decimals
  )} ${shortSymbol ?? symbol}! Go check it out at https://formfunction.xyz/@${
    prismaNft.Owner.username
  }/${prismaNft.mint}`;

  await sendSlackNotification(SlackWebhook.EditionSaleAlertChannel, content);
}

async function sendStoppedMintingForEditionsAlerts(
  prismaNft: Nft & {
    NftListing: Maybe<NftListing>;
    NftMetadata: NftMetadata;
    Owner: User;
  }
) {
  const prisma = getPrisma();
  const numStandardEditionsMinted = await prisma.nft.count({
    where: {
      masterEditionMint: prismaNft.mint,
    },
  });
  const content =
    `Minting of editions was stopped for ${prismaNft.NftMetadata.name}. ` +
    `${numStandardEditionsMinted} / ${prismaNft.maxSupply} editions were minted. ` +
    `See the NFT at https://formfunction.xyz/@${prismaNft.Owner.username}/${prismaNft.mint}`;

  await sendSlackNotification(
    SlackWebhook.StoppedMintingForEditionsAlertChannel,
    content
  );
}

export default async function notifyNewTransactionWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { id, mint, source, type } = body.event.data.new;

  if (!isProd() || source != null) {
    res.json({ message: "skipped", success: true }).send();
    return;
  }

  const prisma = getPrisma();
  const prismaNft = await prisma.nft.findUnique({
    include: {
      Creator: true,
      NftListing: true,
      NftMetadata: true,
      Owner: true,
    },
    where: { mint },
  });
  const prismaTx = await prisma.nftTransaction.findUnique({
    include: { Currency: true, From: true, To: true },
    where: { id },
  });
  invariant(prismaNft != null, "Must not be null");
  invariant(prismaTx != null, "Must not be null");

  switch (type) {
    case NftTransactionTypeExpress_Enum.Bid:
      await sendBidAlerts(prismaNft, prismaTx, mint);
      break;
    case NftTransactionTypeExpress_Enum.Listed:
    case NftTransactionTypeExpress_Enum.ListedInstantSale:
      await sendListedAlerts(prismaNft, prismaTx, mint);
      break;
    case NftTransactionTypeExpress_Enum.ListedEditions:
      await sendListedEditionsAlerts(prismaNft, prismaTx);
      break;
    case NftTransactionTypeExpress_Enum.Minted:
      await sendMintedAlerts(prismaNft, mint);
      break;
    case NftTransactionTypeExpress_Enum.SoldInstantSale:
      await sendInstantSaleAlerts(prismaNft, prismaTx, mint);
      break;
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
      await sendOfferAcceptedAlerts(prismaNft, prismaTx, mint);
      break;
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary:
      await sendSoldEditionPrimaryAlerts(prismaNft, prismaTx);
      break;
    case NftTransactionTypeExpress_Enum.Offer:
      await sendOfferAlerts(prismaNft, prismaTx, mint);
      break;
    case NftTransactionTypeExpress_Enum.ClaimedPnft:
      await sendClaimedPnftAlerts(prismaNft, mint);
      break;
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions:
      await sendStoppedMintingForEditionsAlerts(prismaNft);
      break;
    default:
      break;
  }

  res.json({ success: true }).send();
}
