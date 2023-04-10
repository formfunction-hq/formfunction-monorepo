import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import getPrisma from "src/utils/prisma/getPrisma";

function getDeleteNftPrismaPromises(mints: string | Array<string>) {
  const whereMint = Array.isArray(mints) ? { in: mints } : { equals: mints };
  const prisma = getPrisma();

  return [
    prisma.claim.deleteMany({
      where: {
        auctionNftId: whereMint,
      },
    }),
    prisma.nftListing.deleteMany({
      where: {
        nftId: whereMint,
      },
    }),
    prisma.offer.deleteMany({
      where: {
        mint: whereMint,
      },
    }),
    prisma.nftTransaction.deleteMany({
      where: {
        mint: whereMint,
      },
    }),
    prisma.nftTransactionRaw.deleteMany({
      where: {
        mint: whereMint,
      },
    }),
    prisma.nftToAttribute.deleteMany({
      where: {
        nftId: whereMint,
      },
    }),
    prisma.nftToTag.deleteMany({
      where: {
        nftId: whereMint,
      },
    }),
    prisma.nft.deleteMany({
      where: {
        mint: whereMint,
      },
    }),
    prisma.nftMetadata.deleteMany({
      where: {
        mint: whereMint,
      },
    }),
  ];
}

async function getPrismaOperations(mint: string) {
  const prisma = getPrisma();

  const editions = await prisma.nft.findMany({
    where: {
      masterEditionMint: mint,
    },
  });
  const editionMints = editions.map((edition) => edition.mint);

  const [deletedTxs, deletedTxsRaw] = await Promise.all([
    prisma.nftTransaction.findMany({
      where: {
        mint: {
          in: [...editionMints, mint],
        },
      },
    }),
    prisma.nftTransactionRaw.findMany({
      where: {
        mint: {
          in: [...editionMints, mint],
        },
      },
    }),
  ]);
  const allDeletedTxids = removeDuplicatesWithSet([
    ...filterNulls(deletedTxs.map((tx) => tx.txid)),
    ...deletedTxsRaw.map((tx) => tx.txid),
  ]);

  return [
    // Delete all standard editions first. Otherwise, the master edition
    // will not be able to be deleted because of foreign-key constraints.
    ...getDeleteNftPrismaPromises(editionMints),
    ...getDeleteNftPrismaPromises(mint),
    prisma.deletedNftTransaction.createMany({
      data: allDeletedTxids.map((txid) => ({ txid })),
    }),
  ];
}

async function deleteNft(mint: string): Promise<void> {
  const prisma = getPrisma();

  const nftListing = await prisma.nftListing.findMany({
    where: {
      nftId: mint,
    },
  });

  const pnftPrismaOperations = (
    await Promise.all(
      nftListing.map((listing) =>
        listing.pnftIdForAuction == null
          ? []
          : getPrismaOperations(listing.pnftIdForAuction)
      )
    )
  ).flat();
  const nftPrismaOperations = await getPrismaOperations(mint);

  // Delete pNFTs last because the foreign key resides on the auction NFT's NftListing row
  await prisma.$transaction([...nftPrismaOperations, ...pnftPrismaOperations]);

  logEvent(AnalyticsEvent.DeleteNftSuccess, null, { mint });
}

export default deleteNft;
