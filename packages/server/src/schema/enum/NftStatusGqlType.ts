import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

/**
 * IMPORTANT: keep values in sync with the NftStatus DB table.
 */
const NftStatusGqlType = new GraphQLEnumType({
  name: Typename.NftStatus,
  values: {
    AirdropCompleted: {},
    AirdropInProgress: {},
    Auction: {},
    Burned: {},
    Listed: {},
    ListedEditions: {},
    ListedInstantSale: {},
    ListingScheduled: {},
    Owned: {},
    OwnedStoppedMintingForEditions: {},
    SoldOutEditions: {},
  },
});

export default NftStatusGqlType;
