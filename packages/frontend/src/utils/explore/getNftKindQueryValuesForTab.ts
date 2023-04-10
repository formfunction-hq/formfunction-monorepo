import graphql from "babel-plugin-relay/macro";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ExploreTab from "types/enums/ExploreTab";
import { NftKind } from "utils/explore/__generated__/getNftKindQueryValuesForTabQuery.graphql";

// Used to generate types
const _query = graphql`
  query getNftKindQueryValuesForTabQuery(
    $input: MetadataAccountsForExploreInput!
  ) {
    metadataAccountsForExplore {
      # eslint-disable-next-line relay/unused-fields
      metadataAccounts(after: "0", first: 0, input: $input) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

export default function getNftKindQueryValuesForTab(
  tab: ExploreTab
): Array<NftKind> {
  switch (tab) {
    case ExploreTab.Artwork:
      return ["OneOfOne"];
    case ExploreTab.Editions:
      return [
        "MasterEditionWithNonzeroSupply",
        "MasterEditionWithUnlimitedSupply",
      ];
    case ExploreTab.Creators:
    case ExploreTab.Series:
    case ExploreTab.Campaigns:
      return [];
    default:
      return assertUnreachable(tab);
  }
}
