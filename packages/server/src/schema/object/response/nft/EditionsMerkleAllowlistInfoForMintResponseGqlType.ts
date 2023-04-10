import { GraphQLObjectType } from "graphql";
import EditionsMerkleAllowlistInfoGqlType from "src/schema/object/nft/EditionsMerkleAllowlistInfoGqlType";
import Typename from "src/types/enums/Typename";

const EditionsMerkleAllowlistInfoForMintResponseGqlType = new GraphQLObjectType(
  {
    fields: {
      merkleAllowlistInfo: {
        type: EditionsMerkleAllowlistInfoGqlType,
      },
    },
    name: Typename.EditionsMerkleAllowlistInfoForMintResponse,
  }
);

export default EditionsMerkleAllowlistInfoForMintResponseGqlType;
