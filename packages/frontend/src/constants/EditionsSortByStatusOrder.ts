/* eslint-disable sort-keys-fix/sort-keys-fix */
import { NftStatusExpress_enum } from "components/pages/common/nft/editions-table/__generated__/NftEditionsTableEditionsForMasterEditionMint_Query.graphql";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";

const EDITIONS_SORT_BY_STATUS_ORDER: {
  [key in NftStatusExpress_enum]: number;
} = {
  ListedInstantSale: 0,
  Auction: 1,
  Listed: 2,
  ListingScheduled: 3,
  Owned: 4,
  ListedEditions: 5,
  SoldOutEditions: 5,
  OwnedStoppedMintingForEditions: 5,
  Burned: 5,
  AirdropCompleted: 5,
  AirdropInProgress: 5,
  [RELAY_FUTURE_ADDED_VALUE]: 5,
};

export default EDITIONS_SORT_BY_STATUS_ORDER;
