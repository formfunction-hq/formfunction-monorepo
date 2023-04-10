import { Prisma } from "@prisma/client";

const CONVERT_EDITIONS_MERKLE_ALLOWLIST_INFO_INCLUDE = {
  Nft: {
    include: {
      NftListing: true,
    },
  },
} satisfies Prisma.EditionsMerkleAllowlistInfoInclude;

export default CONVERT_EDITIONS_MERKLE_ALLOWLIST_INFO_INCLUDE;
