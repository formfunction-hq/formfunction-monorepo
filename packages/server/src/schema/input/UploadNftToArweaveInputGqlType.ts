import { GraphQLInputObjectType, GraphQLString } from "graphql";
import NftMetadataV1InputGqlType from "src/schema/input/NftMetadataV1InputGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UploadNftToArweaveInputGqlType = new GraphQLInputObjectType({
  fields: {
    fileName: { type: gqlNonNull(GraphQLString) },
    metadata: { type: gqlNonNull(NftMetadataV1InputGqlType) },
    nonstandardFileName: {
      description:
        "For nonstandard files, e.g. GLB files, fileName is the name of the preview file. " +
        "This is the name of the actual file.",
      type: GraphQLString,
    },
  },
  name: Typename.UploadNftToArweaveInput,
});

export default UploadNftToArweaveInputGqlType;
