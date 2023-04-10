import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const NftKindGqlType = new GraphQLEnumType({
  name: Typename.NftKind,
  values: {
    Generative: {
      description:
        "I.e. an NFT minted from a Candy Machine. Strictly speaking, " +
        "Candy Machine NFTs do not HAVE to be generative, but typically are.",
    },
    MasterEditionWithNonzeroSupply: {},
    MasterEditionWithUnlimitedSupply: {},
    OneOfOne: {},
    PnftMasterEdition: {},
    PnftStandardEdition: {},
    StandardEditionPrintNonzeroSupply: {},
    StandardEditionPrintUnlimitedSupply: {},
  },
});

export default NftKindGqlType;
