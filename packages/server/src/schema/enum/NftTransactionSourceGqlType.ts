import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

/**
 * IMPORTANT: keep values in sync with the NftTransactionSource DB table.
 */
const NftTransactionSourceGqlType = new GraphQLEnumType({
  name: Typename.NftTransactionSource,
  values: {
    ExchangeArt: {},
    Holaplex: {},
  },
});

export default NftTransactionSourceGqlType;
