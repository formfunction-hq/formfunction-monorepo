import { Prisma } from "@prisma/client";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import CONVERT_NFT_TRANSACTION_INCLUDE from "src/constants/include/ConvertNftTransactionInclude";

const OFFER_WITH_NFT_AND_TRANSACTION_INCLUDE = {
  NftTransaction: {
    include: {
      ...CONVERT_NFT_TRANSACTION_INCLUDE,
      Nft: { include: CONVERT_NFT_TO_METADATA_INCLUDE },
    },
  },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.OfferInclude;

export default OFFER_WITH_NFT_AND_TRANSACTION_INCLUDE;
