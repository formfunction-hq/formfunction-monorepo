import graphql from "babel-plugin-relay/macro";
import { ExploreExtra } from "types/relay/__generated__/ExploreExtraPaginationQuery.graphql";

const _fragment = graphql`
  fragment ExploreExtra_Query on query_root
  @refetchable(queryName: "ExploreExtraPaginationQuery") {
    # eslint-disable-next-line relay/unused-fields
    metadataAccountsForExplore {
      metadataAccounts(after: $after, first: $first, input: $input)
        @connection(key: "ExploreExtra_Query_metadataAccounts") {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

export default ExploreExtra;
