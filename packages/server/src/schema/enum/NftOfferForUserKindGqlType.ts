import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const NftOfferForUserKindGqlType = new GraphQLEnumType({
  name: Typename.NftOfferForUserKind,
  values: {
    Made: {},
    Received: {},
  },
});

export default NftOfferForUserKindGqlType;
