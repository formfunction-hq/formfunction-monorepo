import { GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import MetadataAccountsConnectionGqlType from "src/schema/object/pagination/MetadataAccountsConnectionGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const UpdateSeriesIdForNftsResponseGqlType = new GraphQLObjectType({
  fields: {
    metadataAccountsInSeries: {
      type: gqlNonNull(MetadataAccountsConnectionGqlType),
    },
    metadataAccountsRemovedFromSeries: {
      type: gqlNonNullListOfNonNull(MetadataAccountGqlType),
    },
  },
  name: Typename.UpdateSeriesIdForNftsResponse,
});

export default UpdateSeriesIdForNftsResponseGqlType;
