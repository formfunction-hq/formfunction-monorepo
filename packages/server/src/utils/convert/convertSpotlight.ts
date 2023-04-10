import { Spotlight } from "@prisma/client";
import Typename from "src/types/enums/Typename";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import {
  SpotlightExpressHeroUnitLayout_Enum,
  SpotlightExpressStatus_Enum,
} from "src/__generated__/generated";
import { SpotlightSourceType } from "src/types/graphql-source/SpotlightSourceType";
import SpotlightType from "src/types/enums/SpotlightType";

export default function convertSpotlight(
  spotlight: Spotlight
): SpotlightSourceType {
  const { assetId, description, label, status, title, url, userIds } =
    spotlight;
  return {
    __typename: Typename.Spotlight,
    endTime: spotlight.endTime,
    heroUnitLayout:
      spotlight.heroUnitLayout as SpotlightExpressHeroUnitLayout_Enum,
    id: spotlight.id,
    objectId: spotlight.objectId as string,
    overrideInfo: {
      assetId,
      description,
      label,
      status,
      title,
      url,
      userIds: userIds as Maybe<Array<string>>,
    },
    // This will be resolved by the child resolver but Typescript requires us to
    // pass this in
    spotlightInfo: {
      __typename: Typename.SpotlightInfo,
      asset: {
        __typename: Typename.Asset,
        contentType: "",
        downloadUrl: "",
        id: "",
        path: "",
      },
      description: "",
      label: "",
      status: SpotlightExpressStatus_Enum.Available,
      statusOverride: null,
      title: "",
      url: null,
      users: [],
    },
    startTime: spotlight.startTime,
    type: spotlight.type as SpotlightType,
  };
}
