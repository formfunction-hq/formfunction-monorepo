import { Prisma } from "@prisma/client";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import dayjs from "src/utils/dates/dayjsex";
import getPrisma from "src/utils/prisma/getPrisma";
import { MetadataAccount } from "src/__generated__/generated";

/**
 * Fetches on-platform NFTs. Avoids RPC calls for perf issues—assumes DB is accurate.
 */
export default async function getOnPlatformMetadataAccounts(
  mints: Array<string>,
  orderBy?: Prisma.Enumerable<Prisma.NftOrderByWithRelationInput>
): Promise<Array<MetadataAccount>> {
  const prisma = getPrisma();

  const time0 = dayjs();
  const nfts = await prisma.nft.findMany({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    orderBy,
    where: { id: { in: mints } },
  });
  const time1 = dayjs();
  // eslint-disable-next-line no-console
  console.log(
    `Took ${time1.diff(
      time0,
      "second",
      true
    )} seconds to call prisma.nft.findMany`
  );

  const metadataAccounts: Array<MetadataAccount> = nfts.map((nft) =>
    convertNftToMetadataAccount(nft)
  );

  return metadataAccounts;
}
