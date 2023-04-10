import graphql from "babel-plugin-relay/macro";
import { RefObject, useContext, useState } from "react";
import { usePaginationFragment } from "react-relay";
import ElementId from "types/enums/ElementId";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import { FundingTierNftsContext } from "components/pages/campaign/edit/funding-tiers/FundingTierNftsContext";
import GenericNftSearchRow from "components/nft/GenericNftSearchRow";
import { FundingTierNftSearchMetadataAccounts_Query$key } from "components/pages/campaign/edit/funding-tiers/__generated__/FundingTierNftSearchMetadataAccounts_Query.graphql";
import GenericNftSearch from "components/nft/GenericNftSearch";
import { useDebounce } from "use-debounce";

export const nftFragment = graphql`
  fragment FundingTierNftSearchMetadataAccounts_Query on query_root
  @refetchable(
    queryName: "FundingTierNftSearchMetadataAccountsPaginationQuery"
  ) {
    metadataAccountsAvailableToAddToCampaign {
      metadataAccounts(after: $after, first: $first, input: $input)
        @connection(
          key: "FundingTierNftSearch_MetadataAccounts_Query_metadataAccounts"
        ) {
        edges {
          node {
            id
            nft {
              id
            }
            data {
              name
            }
            mint
            ...GenericNftSearchRow_MetadataAccount
            ...GenericNftSearchDndRow_MetadataAccount
          }
        }
      }
    }
  }
`;

type Props = {
  fundingTierMetadata: FundingTierNftSearchMetadataAccounts_Query$key;
  popoverRef: RefObject<HTMLElement>;
};

export default function FundingTierNftSearch({
  fundingTierMetadata,
  popoverRef,
}: Props) {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText] = useDebounce(searchText, 500);
  const [visible, setVisible] = useState(false);
  const { data: metadataAccountsData } = usePaginationFragment(
    nftFragment,
    fundingTierMetadata
  );
  const { items, appendItem, locallyRemovedItems } = useContext(
    FundingTierNftsContext
  );
  const nodes =
    metadataAccountsData.metadataAccountsAvailableToAddToCampaign.metadataAccounts.edges
      .map(({ node }) => node)
      .filter((node) => {
        const isNotLocallyAdded = !items
          .map(({ metadataAccountId }) => metadataAccountId)
          .includes(node.id);
        const isLocallyRemoved = locallyRemovedItems
          .map(({ metadataAccountId }) => metadataAccountId)
          .includes(node.id);
        const matchesSearchQueryIfExists = !isEmptyString(debouncedSearchText)
          ? node.data.name.includes(debouncedSearchText)
          : true;
        return (
          matchesSearchQueryIfExists && isNotLocallyAdded && !isLocallyRemoved
        );
      });

  const completeNodes = [
    ...nodes,
    ...locallyRemovedItems.map(({ metadataAccount }) => metadataAccount),
  ];
  const searchResults = completeNodes.map((metadataAccount) => (
    <GenericNftSearchRow
      onClick={() => {
        appendItem({
          id: metadataAccount.nft.id,
          metadataAccount,
          metadataAccountId: metadataAccount.id,
          mint: metadataAccount.mint,
        });
        setVisible(false);
      }}
      key={metadataAccount.id}
      metadataAccount={metadataAccount}
    />
  ));

  return (
    <GenericNftSearch
      elementId={ElementId.CampaignFundingTierManageNftsModal}
      popoverRef={popoverRef}
      debouncedSearchText={debouncedSearchText}
      searchResults={searchResults}
      searchText={searchText}
      setSearchText={setSearchText}
      visible={visible}
      setVisible={setVisible}
    />
  );
}
