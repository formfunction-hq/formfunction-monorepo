import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import NftStatusGqlType from "src/schema/enum/NftStatusGqlType";
import NftAttributeInputGqlType from "src/schema/input/NftAttributeInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import NftDisclosureInputGqlType from "src/schema/input/NftDisclosureInputGqlType";
import AssetInputGqlType from "src/schema/input/AssetInputGqlType";

const InsertNftInputGqlType = new GraphQLInputObjectType({
  fields: {
    assetArweaveTxid: { type: gqlNonNull(GraphQLString) },
    assetHeight: { type: GraphQLInt },
    assetWidth: { type: GraphQLInt },
    attributes: {
      type: gqlListOfNonNull(NftAttributeInputGqlType),
    },
    contentType: { type: gqlNonNull(GraphQLString) },
    creatorId: { type: gqlNonNull(GraphQLString) },
    creatorsMetadataString: { type: gqlNonNull(GraphQLString) },
    description: { type: gqlNonNull(GraphQLString) },
    disclosures: { type: gqlListOfNonNull(NftDisclosureInputGqlType) },
    editionNonce: { type: GraphQLInt },
    image: { type: gqlNonNull(GraphQLString) },
    isPnft: { defaultValue: false, type: GraphQLBoolean },
    maxSupply: { type: GraphQLInt },
    metadataArweaveTxid: { type: gqlNonNull(GraphQLString) },
    mint: { type: gqlNonNull(GraphQLString) },
    name: { type: gqlNonNull(GraphQLString) },
    nonstandardAsset: { type: AssetInputGqlType },
    ownerId: { type: gqlNonNull(GraphQLString) },
    sellerFeeBasisPoints: { type: gqlNonNull(GraphQLInt) },
    seriesMint: { type: GraphQLString },
    status: { type: gqlNonNull(NftStatusGqlType) },
  },
  name: Typename.InsertNftInput,
});

export default InsertNftInputGqlType;
