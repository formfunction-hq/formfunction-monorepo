import { Prisma } from "@prisma/client";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

const CONVERT_NFT_TRANSACTION_INCLUDE = {
  Creator: {
    include: CONVERT_USER_INCLUDE,
  },
  Currency: true,
  From: {
    include: CONVERT_USER_INCLUDE,
  },
  Nft: {
    include: {
      MasterEditionNft: true,
      NftMetadata: true,
    },
  },
  To: {
    include: CONVERT_USER_INCLUDE,
  },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.NftTransactionInclude;

export default CONVERT_NFT_TRANSACTION_INCLUDE;
