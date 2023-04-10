import {
  Currency,
  Nft,
  NftMetadata,
  NftTransaction,
  Photo,
  User,
} from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

type ConvertNftTransactionType = NftTransaction & {
  Creator: User & {
    Photo_PhotoToUser_coverPhotoId: Maybe<Photo>;
    Photo_PhotoToUser_profilePhotoId: Maybe<Photo>;
  };
  Currency: Currency;
  From: User & {
    Photo_PhotoToUser_coverPhotoId: Maybe<Photo>;
    Photo_PhotoToUser_profilePhotoId: Maybe<Photo>;
  };
  Nft: Nft & {
    MasterEditionNft: Maybe<Nft>;
    NftMetadata: NftMetadata;
  };
  To: User & {
    Photo_PhotoToUser_coverPhotoId: Maybe<Photo>;
    Photo_PhotoToUser_profilePhotoId: Maybe<Photo>;
  };
};

export default ConvertNftTransactionType;
