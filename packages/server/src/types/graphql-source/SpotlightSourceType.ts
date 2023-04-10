import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import SpotlightType from "src/types/enums/SpotlightType";
import { SpotlightExpress } from "src/__generated__/generated";

export type SpotlightSourceType = SpotlightExpress & {
  objectId: string;
  overrideInfo: {
    assetId: Maybe<string>;
    description: Maybe<string>;
    label: Maybe<string>;
    status: Maybe<string>;
    title: Maybe<string>;
    url: Maybe<string>;
    userIds: Maybe<Array<string>>;
  };
  type: SpotlightType;
};
