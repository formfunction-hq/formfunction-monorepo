import { Prisma } from "@prisma/client";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

const CONVERT_SERIES_INCLUDE = {
  Photo_PhotoToSeries_avatarPhotoId: true,
  Photo_PhotoToSeries_coverPhotoId: true,
  User: { include: CONVERT_USER_INCLUDE },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.SeriesInclude;

export default CONVERT_SERIES_INCLUDE;
