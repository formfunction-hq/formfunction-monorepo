import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import NftTransactionSourceGqlType from "src/schema/enum/NftTransactionSourceGqlType";
import NftTransactionTypeGqlType from "src/schema/enum/NftTransactionTypeGqlType";
import PriceGqlType from "src/schema/object/PriceGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const NftTransactionNftInfo = new GraphQLObjectType({
  fields: {
    assetHeight: { type: GraphQLInt },
    assetWidth: { type: GraphQLInt },
    edition: { type: GraphQLInt },
    maxSupply: { type: GraphQLInt },
    maxSupplyOfMasterEdition: { type: GraphQLInt },
    mint: { type: gqlNonNull(GraphQLString) },
    name: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.NftTransactionNftInfo,
});

const NftTransactionGqlType = new GraphQLObjectType({
  fields: {
    Creator: { type: UserGqlType },
    From: { type: UserGqlType },
    To: { type: UserGqlType },
    auctionCount: { type: gqlNonNull(GraphQLInt) },
    comment: { type: GraphQLString },
    creatorId: { type: gqlNonNull(GraphQLString) },
    fromAddress: { type: gqlNonNull(GraphQLString) },
    id: { type: gqlNonNull(GraphQLID) },
    ixIndex: { type: GraphQLInt },
    ixInnerIndex: { type: GraphQLInt },
    mint: { type: gqlNonNull(PublicKeyScalarGqlType) },
    nftInfo: { type: gqlNonNull(NftTransactionNftInfo) },
    price: { type: PriceGqlType },
    priceInLamports: { type: BigintScalarGqlType },
    source: { type: NftTransactionSourceGqlType },
    timeCreated: { type: gqlNonNull(TimestamptzScalarGqlType) },
    toAddress: { type: gqlNonNull(GraphQLString) },
    // Null for "Auction Won"
    txid: { type: GraphQLString },
    type: { type: gqlNonNull(NftTransactionTypeGqlType) },
    usdPrice: { type: GraphQLFloat },
  },
  name: Typename.NftTransaction,
});

export default NftTransactionGqlType;
