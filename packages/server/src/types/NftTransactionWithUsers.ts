import { NftTransaction, Photo, User } from "@prisma/client";

type NftTransactionWithUsers = NftTransaction & {
  From: User & {
    Photo_PhotoToUser_coverPhotoId: Photo | null;
    Photo_PhotoToUser_profilePhotoId: Photo | null;
  };
};

export default NftTransactionWithUsers;
