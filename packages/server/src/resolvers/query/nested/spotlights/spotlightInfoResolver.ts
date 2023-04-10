import Typename from "src/types/enums/Typename";
import { SpotlightSourceType } from "src/types/graphql-source/SpotlightSourceType";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  SpotlightExpressStatus_Enum,
  SpotlightInfo,
} from "src/__generated__/generated";
import convertUser from "src/utils/convert/convertUser";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import getSpotlightInfoForSpotlightType from "src/utils/spotlights/getSpotlightInfoForSpotlightType";

export default async function spotlightInfoResolver(
  parent: SpotlightSourceType
): Promise<SpotlightInfo> {
  const {
    type,
    objectId,
    overrideInfo: {
      assetId: assetIdOverride,
      label: labelOverride,
      description: descriptionOverride,
      title: titleOverride,
      status: statusOverride,
      url: urlOverride,
      userIds: userIdsOverride,
    },
  } = parent;
  const prisma = getPrisma();
  const usersOverride =
    userIdsOverride != null
      ? (
          await prisma.user.findMany({
            include: CONVERT_USER_INCLUDE,
            where: { id: { in: userIdsOverride } },
          })
        ).map(convertUser)
      : null;
  const { asset, label, description, title, status, url, users } =
    await getSpotlightInfoForSpotlightType(type, objectId);
  const assetOverride =
    assetIdOverride != null
      ? await prisma.asset.findUnique({ where: { id: assetIdOverride } })
      : null;

  return {
    __typename: Typename.SpotlightInfo,
    asset: {
      __typename: Typename.Asset,
      contentType: assetOverride?.contentType ?? asset.contentType,
      downloadUrl: assetOverride?.downloadUrl ?? asset.downloadUrl,
      id: assetOverride?.id ?? asset.id,
      path: assetOverride?.path ?? asset.path,
    },
    description: descriptionOverride ?? description,
    label: labelOverride ?? label,
    status:
      statusOverride != null ? SpotlightExpressStatus_Enum.Override : status,
    statusOverride,
    title: titleOverride ?? title,
    url: urlOverride ?? url,
    users: usersOverride ?? users,
  };
}
