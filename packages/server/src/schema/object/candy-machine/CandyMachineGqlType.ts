import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import PriceGqlType from "src/schema/object/PriceGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import SeriesGqlType from "src/schema/object/SeriesGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";

const CandyMachineGqlType = new GraphQLObjectType({
  description:
    "Contains information necessary to display and allow minting of generative mints",
  fields: {
    Authority: {
      description: "Onchain Candy Machine authority",
      type: gqlNonNull(UserGqlType),
    },
    CreatorAuthority: {
      description:
        "Representative authority to be the main creator of the NFTs",
      type: gqlNonNull(UserGqlType),
    },
    Series: { type: gqlNonNull(SeriesGqlType) },
    allowlistPrice: { type: PriceGqlType },
    allowlistSaleStartTime: { type: TimestamptzScalarGqlType },
    antiBotProtectionEnabled: { type: gqlNonNull(GraphQLBoolean) },
    id: { type: gqlNonNull(GraphQLID) },
    limitPerAddress: { type: gqlNonNull(GraphQLInt) },
    maxSupply: { type: gqlNonNull(GraphQLInt) },
    omniMintWallets: { type: gqlNonNullListOfNonNull(PublicKeyScalarGqlType) },
    premintPrice: { type: PriceGqlType },
    price: { type: gqlNonNull(PriceGqlType) },
    publicKey: { type: gqlNonNull(GraphQLString) },
    publicSaleEndTime: { type: gqlNonNull(TimestamptzScalarGqlType) },
    publicSaleStartTime: { type: gqlNonNull(TimestamptzScalarGqlType) },
    totalAmountMinted: { type: gqlNonNull(GraphQLInt) },
  },
  name: Typename.CandyMachine,
});

export default CandyMachineGqlType;
