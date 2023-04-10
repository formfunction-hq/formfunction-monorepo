import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const UnlockableCategoryGqlType = new GraphQLEnumType({
  name: Typename.UnlockableCategory,
  values: {
    DigitalDownload: {},
    Merch: {},
    Other: {},
    PhysicalOriginal: {},
    PhysicalPrint: {},
  },
});

export default UnlockableCategoryGqlType;
