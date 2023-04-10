import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertSeriesType from "src/types/convert/ConvertSeriesType";
import Typename from "src/types/enums/Typename";
import convertPhoto from "src/utils/convert/convertPhoto";
import convertUser from "src/utils/convert/convertUser";
import {
  SeriesExpress,
  SeriesTypeExpress_Enum,
} from "src/__generated__/generated";

export default function convertSeries(
  series: Maybe<ConvertSeriesType>
): Maybe<SeriesExpress> {
  return series != null
    ? {
        __typename: Typename.Series,
        ...series,
        AvatarPhoto: convertPhoto(series.Photo_PhotoToSeries_avatarPhotoId)!,
        CoverPhoto: convertPhoto(series.Photo_PhotoToSeries_coverPhotoId),
        Creator: convertUser(series.User),
        nftOrder: series.nftOrder as Array<string>,
        type: series.type as SeriesTypeExpress_Enum,
      }
    : null;
}
