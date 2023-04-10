import { Offer } from "@prisma/client";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import ConvertNftTransactionType from "src/types/convert/ConvertNftTransactionType";

export type OfferWithNftAndTransaction = Offer & {
  NftTransaction: ConvertNftTransactionType & {
    Nft: ConvertNftToMetadataAccountType;
  };
};
