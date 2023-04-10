import { Photo, User } from "@prisma/client";
import Typename from "src/types/enums/Typename";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { UserExpress, PhotoExpress } from "src/__generated__/generated";
import convertPhoto from "src/utils/convert/convertPhoto";
import getRequest from "src/utils/async-local-storage/getRequest";
import getVerifiedPublicKey from "src/utils/auth/getVerifiedPublicKey";

export default function convertUser(
  prismaUser: User & {
    Photo_PhotoToUser_coverPhotoId: Photo | null;
    Photo_PhotoToUser_profilePhotoId: Photo | null;
  }
): UserExpress {
  const request = getRequest();
  const verifiedPublicKey =
    request == null ? null : getVerifiedPublicKey(request);

  const coverPhoto: Maybe<PhotoExpress> = convertPhoto(
    prismaUser.Photo_PhotoToUser_coverPhotoId
  );
  const profilePhoto: Maybe<PhotoExpress> = convertPhoto(
    prismaUser.Photo_PhotoToUser_profilePhotoId
  );

  return {
    __typename: Typename.User,
    ...prismaUser,
    CoverPhoto: coverPhoto,
    ProfilePhoto: profilePhoto,
    email:
      // Make sure we don't leak emails
      prismaUser.id === verifiedPublicKey?.toString() || request == null
        ? prismaUser.email
        : null,
    isCollector: prismaUser.isCollector2,
  };
}
