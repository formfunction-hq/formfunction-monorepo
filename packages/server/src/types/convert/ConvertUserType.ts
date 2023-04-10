import { Photo, User } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

type ConvertUserType = User & {
  Photo_PhotoToUser_coverPhotoId: Maybe<Photo>;
  Photo_PhotoToUser_profilePhotoId: Maybe<Photo>;
};

export default ConvertUserType;
