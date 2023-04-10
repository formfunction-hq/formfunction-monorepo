import { GraphQLObjectType } from "graphql";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import EditionsMerkleAllowlistInfoGqlType from "src/schema/object/nft/EditionsMerkleAllowlistInfoGqlType";
import NftTransactionGqlType from "src/schema/object/NftTransactionGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const InsertNftTransactionResponseGqlType = new GraphQLObjectType({
  fields: {
    editionsMerkleAllowlistInfoForBuyer: {
      type: EditionsMerkleAllowlistInfoGqlType,
    },
    transaction: { type: gqlNonNull(NftTransactionGqlType) },
    updatedMasterEditionMetadataAccount: {
      description:
        "When inserting transactions for standard editions, it is sometimes" +
        " necessary to update the master edition NFT. In those cases, this field will return" +
        " the updated master edition",
      type: MetadataAccountGqlType,
    },
    updatedMetadataAccount: {
      description:
        "Returns the updated NFT with mint equal to the input object's mint field",
      type: gqlNonNull(MetadataAccountGqlType),
    },
  },
  name: Typename.InsertNftTransactionResponse,
});

export default InsertNftTransactionResponseGqlType;
