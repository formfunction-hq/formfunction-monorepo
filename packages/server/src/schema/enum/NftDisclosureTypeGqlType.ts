import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

/**
 * IMPORTANT: keep values in sync with the NftDisclosureType DB table.
 */
const NftDisclosureTypeGqlType = new GraphQLEnumType({
  name: Typename.NftDisclosureType,
  values: {
    AiArt: {},
    Derivative: {},
    Nsfw: {},
  },
});

export default NftDisclosureTypeGqlType;
