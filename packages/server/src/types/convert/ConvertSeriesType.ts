import { Series, Photo, User } from "@prisma/client";

type ConvertSeriesType = Series & {
  Photo_PhotoToSeries_avatarPhotoId: Photo;
  Photo_PhotoToSeries_coverPhotoId: Photo | null;
  User: User & {
    Photo_PhotoToUser_coverPhotoId: Photo | null;
    Photo_PhotoToUser_profilePhotoId: Photo | null;
  };
};

export default ConvertSeriesType;
