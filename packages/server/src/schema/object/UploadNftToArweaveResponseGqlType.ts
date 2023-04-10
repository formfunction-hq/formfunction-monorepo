import { GraphQLString, GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UploadNftToArweaveResponseGqlType = new GraphQLObjectType({
  fields: {
    assetTxid: { type: gqlNonNull(GraphQLString) },
    metadataTxid: { type: gqlNonNull(GraphQLString) },
    nonstandardAssetTxid: {
      description:
        "For nonstandard files, e.g. GLB files, assetTxid is the txid of the preview file. " +
        "This is the txid of the actual file.",
      type: GraphQLString,
    },
  },
  name: Typename.UploadNftToArweaveResponse,
});

export default UploadNftToArweaveResponseGqlType;
