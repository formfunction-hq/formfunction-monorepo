import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// Keep in sync with CurrencyName DB enum
const CurrencyNameGqlType = new GraphQLEnumType({
  name: Typename.CurrencyName,
  values: {
    Ash: {},
    Bonk: {},
    FamousFoxFederation: {},
    Particles: {},
    SkeletonCrew: {},
    Solana: {},
    UsdCoin: {},
  },
});

export default CurrencyNameGqlType;
