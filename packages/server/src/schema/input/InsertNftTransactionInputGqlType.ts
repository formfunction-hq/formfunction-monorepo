import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import NftTransactionTypeGqlType from "src/schema/enum/NftTransactionTypeGqlType";
import PriceFunctionTypeGqlType from "src/schema/enum/PriceFunctionTypeGqlType";
import InsertNftInputGqlType from "src/schema/input/InsertNftInputGqlType";
import InsertPnftInputGqlType from "src/schema/input/InsertPnftInputGqlType";
import InsertStandardEditionInputGqlType from "src/schema/input/InsertStandardEditionInputGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import UuidScalarGqlType from "src/schema/scalar/UuidScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import InsertUnlockableInputGqlType from "src/schema/input/InsertUnlockableInputGqlType";
import CurrencyNameGqlType from "src/schema/enum/CurrencyNameGqlType";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const InsertNftTransactionUpdateNftInputGqlType = new GraphQLInputObjectType({
  description:
    "We prefer to derive Nft and NftListing updates from the transaction information itself, " +
    "but this is not always possible. In cases where it is not possible, we can " +
    "specify how to update the NFT using this input type.",
  fields: {
    antiBotProtectionEnabled: { type: GraphQLBoolean },
    auctionDurationInSeconds: { type: GraphQLInt },
    editionBuyLimitPerAddress: { type: GraphQLInt },
    insertUnlockableInput: { type: InsertUnlockableInputGqlType },
    pnftIdForAuction: { type: GraphQLID },
    scheduledAuctionTime: { type: TimestamptzScalarGqlType },
    tickSizeConstantInLamports: { type: BigintScalarGqlType },
    timeExtensionDurationInSeconds: { type: GraphQLInt },
  },
  name: Typename.InsertNftTransactionUpdateNftInput,
});

const InsertNftTransactionUpdateClaimInputGqlType = new GraphQLInputObjectType({
  description:
    "Used to update the corresponding pNFT claim after inserting the transaction",
  fields: {
    claimId: { type: gqlNonNull(UuidScalarGqlType) },
  },
  name: Typename.InsertNftTransactionUpdateClaimInput,
});

const InsertNftTransactionEditionsInputGqlType = new GraphQLInputObjectType({
  fields: {
    allowlistAddresses: { type: gqlListOfNonNull(GraphQLString) },
    allowlistAmountAllowed: { defaultValue: 1, type: GraphQLInt },
    allowlistEnabled: { type: GraphQLBoolean },
    allowlistPrice: { type: BigintScalarGqlType },
    allowlistStartTime: { type: TimestamptzScalarGqlType },
    priceFunctionType: { type: gqlNonNull(PriceFunctionTypeGqlType) },
    priceParams: { type: gqlNonNullListOfNonNull(GraphQLFloat) },
    publicSaleStartTime: { type: TimestamptzScalarGqlType },
    startingPriceInLamports: { type: gqlNonNull(BigintScalarGqlType) },
  },
  name: Typename.InsertNftTransactionEditionsInput,
});

const InsertNftTransactionInputGqlType = new GraphQLInputObjectType({
  fields: {
    comment: { type: GraphQLString },
    creatorId: { type: gqlNonNull(GraphQLString) },
    currencyName: { type: CurrencyNameGqlType },
    editionsInput: { type: InsertNftTransactionEditionsInputGqlType },
    fromUserId: { type: gqlNonNull(GraphQLString) },
    id: { type: UuidScalarGqlType },
    insertNftInput: {
      description:
        "To make our transactions as atomic as possible, we include information" +
        " that is necessary for inserting new nfts into our DB",
      type: InsertNftInputGqlType,
    },
    insertPnftInput: {
      description:
        "To make our transactions as atomic as possible, we include information" +
        " that is necessary for inserting Pnfts into our DB",
      type: InsertPnftInputGqlType,
    },
    insertStandardEditionInput: {
      description:
        "To make our transactions as atomic as possible, we include information" +
        " that is necessary for inserting standard editions into our DB",
      type: InsertStandardEditionInputGqlType,
    },
    ixIndex: { type: GraphQLInt },
    ixInnerIndex: { type: GraphQLInt },
    mint: { type: gqlNonNull(GraphQLString) },
    offerTransactionId: {
      description:
        "ID (not txid) of the offer transaction if inserting a SoldAcceptedOffer tx",
      type: GraphQLString,
    },
    price: { type: BigintScalarGqlType },
    timeCreatedFallback: {
      description:
        "A fallback timestamp that should be used if useTransactionBlockTime is false",
      type: TimestamptzScalarGqlType,
    },
    toUserId: { type: gqlNonNull(GraphQLString) },
    txid: { type: gqlNonNull(GraphQLString) },
    type: { type: gqlNonNull(NftTransactionTypeGqlType) },
    updateClaimInput: { type: InsertNftTransactionUpdateClaimInputGqlType },
    updateNftInput: { type: InsertNftTransactionUpdateNftInputGqlType },
  },
  name: Typename.InsertNftTransactionInput,
});

export default InsertNftTransactionInputGqlType;
