import graphql from "babel-plugin-relay/macro";
import { RefObject, useContext, useState } from "react";
import { usePaginationFragment } from "react-relay";
import { SeriesNftSearchMetadataAccounts_Query$key } from "components/series/__generated__/SeriesNftSearchMetadataAccounts_Query.graphql";
import { ProfilePageForUserMetadataAccountsPaginationQuery } from "components/pages/profile/__generated__/ProfilePageForUserMetadataAccountsPaginationQuery.graphql";
import GenericNftSearchRow from "components/nft/GenericNftSearchRow";
import { SeriesSelectedNftsContext } from "context/SeriesSelectedNftsContext";
import useUserContext from "hooks/useUserContext";
import ElementId from "types/enums/ElementId";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import GenericNftSearch from "components/nft/GenericNftSearch";
import { useDebounce } from "use-debounce";

export const nftFragment = graphql`
  fragment SeriesNftSearchMetadataAccounts_Query on query_root
  @refetchable(queryName: "SeriesNftSearchMetadataAccountsPaginationQuery") {
    metadataAccountsCreated {
      metadataAccounts(after: $after, first: $first, input: $input)
        @connection(
          key: "SeriesNftSearch_MetadataAccounts_Query_metadataAccounts"
        ) {
        edges {
          node {
            id
            mint

            nft {
              creatorId
              isOffPlatform

              Series {
                id
              }
            }

            data {
              name
            }

            ...GenericNftSearchRow_MetadataAccount
            ...GenericNftSearchDndRow_MetadataAccount
          }
        }
      }
    }
  }
`;

type Props = {
  metadataAccounts: SeriesNftSearchMetadataAccounts_Query$key;
  popoverRef: RefObject<HTMLElement>;
};

export default function SeriesNftSearch({
  metadataAccounts,
  popoverRef,
}: Props) {
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);
  const { user } = useUserContext();
  const { data: metadataAccountsData } = usePaginationFragment<
    ProfilePageForUserMetadataAccountsPaginationQuery,
    SeriesNftSearchMetadataAccounts_Query$key
  >(nftFragment, metadataAccounts);
  const [debouncedSearchText] = useDebounce(searchText, 500);

  const {
    appendItem,
    itemsToRemove,
    metadataAccountIds,
    shouldExecuteOperation,
    triggerMaxActionsPopover,
  } = useContext(SeriesSelectedNftsContext);

  const nodes =
    metadataAccountsData.metadataAccountsCreated.metadataAccounts.edges
      .map(({ node }) => node)
      .filter((node) => {
        const isCreator = node.nft.creatorId === user?.id;
        const isOnPlatform = node.nft.isOffPlatform === false;
        const isPartOfSeries = node.nft.Series?.id != null;
        const isAddedToCurrentSeries = metadataAccountIds.has(node.id);
        const isRemovedFromCurrentSeries =
          itemsToRemove.findIndex(
            (item) => item.metadataAccountId === node.id
          ) >= 0;
        const matchesSearchQueryIfExists = !isEmptyString(debouncedSearchText)
          ? node.data.name.includes(debouncedSearchText)
          : true;

        return (
          isCreator &&
          isOnPlatform &&
          ((!isPartOfSeries && !isAddedToCurrentSeries) ||
            isRemovedFromCurrentSeries) &&
          matchesSearchQueryIfExists
        );
      });

  const searchResults = nodes.map((metadataAccount) => (
    <GenericNftSearchRow
      onClick={() => {
        if (!shouldExecuteOperation(metadataAccount.id, "add")) {
          triggerMaxActionsPopover();
          return;
        }
        appendItem({
          metadataAccount,
          metadataAccountId: metadataAccount.id,
          mint: String(metadataAccount.mint),
        });
        setVisible(false);
      }}
      key={metadataAccount.id}
      metadataAccount={metadataAccount}
    />
  ));

  return (
    <GenericNftSearch
      elementId={ElementId.ManageSeriesPiecesModal}
      debouncedSearchText={debouncedSearchText}
      popoverRef={popoverRef}
      searchResults={searchResults}
      searchText={searchText}
      setSearchText={setSearchText}
      visible={visible}
      setVisible={setVisible}
    />
  );
}
