import { Photo } from ".prisma/client";
import Typename from "src/types/enums/Typename";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { PhotoExpress } from "src/__generated__/generated";

export default function convertPhoto(
  prismaPhoto: Maybe<Photo>
): Maybe<PhotoExpress> {
  return prismaPhoto == null
    ? null
    : {
        __typename: Typename.Photo,
        ...prismaPhoto,
      };
}
