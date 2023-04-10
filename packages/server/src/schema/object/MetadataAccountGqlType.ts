import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import highestBidInLamportsResolver from "src/resolvers/query/nested/metadata-account/highestBidInLamportsResolver";
import numberOfBidsForCurrentAuctionResolver from "src/resolvers/query/nested/metadata-account/numberOfBidsForCurrentAuctionResolver";
import openBidStatusResolver from "src/resolvers/query/nested/metadata-account/openBidStatusResolver";
import tagsResolver from "src/resolvers/query/nested/metadata-account/tagsResolver";
import OpenBidStatusGqlType from "src/schema/enum/OpenBidStatusGqlType";
import IAccountGqlType from "src/schema/interface/IAccountGqlType";
import AccountInfoGqlType from "src/schema/object/AccountInfoGqlType";
import MetadataAccountDataGqlType from "src/schema/object/MetadataAccountDataGqlType";
import MetadataOffchainGqlType from "src/schema/object/MetadataOffchainGqlType";
import NftGqlType from "src/schema/object/NftGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import UnlockableGqlType from "src/schema/object/UnlockableGqlType";
import AssetGqlType from "src/schema/object/AssetGqlType";

const MetadataAccountGqlType = new GraphQLObjectType({
  fields: {
    accountInfo: { type: gqlNonNull(AccountInfoGqlType) },
    assetHeight: { type: GraphQLInt },
    assetWidth: { type: GraphQLInt },
    contentType: { type: gqlNonNull(GraphQLString) },
    data: { type: gqlNonNull(MetadataAccountDataGqlType) },
    editionNonce: { type: GraphQLInt },
    highestBidInLamports: {
      args: {
        userId: { type: gqlNonNull(GraphQLString) },
      },
      resolve: highestBidInLamportsResolver,
      type: BigintScalarGqlType,
    },
    id: { type: gqlNonNull(GraphQLID) },
    isMutable: { type: gqlNonNull(GraphQLBoolean) },
    masterEdition: { type: GraphQLString },
    mint: { type: gqlNonNull(PublicKeyScalarGqlType) },
    nft: { type: gqlNonNull(NftGqlType) },
    nonstandardAsset: { type: AssetGqlType },
    numberOfBidsForCurrentAuction: {
      resolve: numberOfBidsForCurrentAuctionResolver,
      type: GraphQLInt,
    },
    offchainData: { type: gqlNonNull(MetadataOffchainGqlType) },
    openBidStatus: {
      args: {
        userId: { type: gqlNonNull(GraphQLString) },
      },
      resolve: openBidStatusResolver,
      type: OpenBidStatusGqlType,
    },
    primarySaleHappened: { type: gqlNonNull(GraphQLBoolean) },
    standardEdition: { type: PublicKeyScalarGqlType },
    tags: {
      resolve: tagsResolver,
      type: gqlNonNullListOfNonNull(GraphQLString),
    },
    timeCreated: { type: TimestamptzScalarGqlType },
    unlockable: { type: UnlockableGqlType },
    updateAuthority: { type: gqlNonNull(PublicKeyScalarGqlType) },
    videoPlaybackId: { type: GraphQLString },
    videoPreviewPlaybackId: { type: GraphQLString },
  },
  interfaces: [IAccountGqlType],
  name: Typename.MetadataAccount,
});

export default MetadataAccountGqlType;
