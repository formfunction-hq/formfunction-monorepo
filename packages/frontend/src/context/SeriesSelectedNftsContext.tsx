/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { useSeriesPageMetadataAccountsQuery } from "hooks/series-page/__generated__/useSeriesPageMetadataAccountsQuery.graphql";
import {
  seriesMetadataAccountsFragment,
  seriesMetadataAccountsQuery,
} from "hooks/series-page/useSeriesPageMetadataAccounts";
import { SeriesPageMetadataAccountsPaginationQuery } from "hooks/series-page/__generated__/SeriesPageMetadataAccountsPaginationQuery.graphql";
import {
  useSeriesPageMetadataAccounts_Query$data,
  useSeriesPageMetadataAccounts_Query$key,
} from "hooks/series-page/__generated__/useSeriesPageMetadataAccounts_Query.graphql";
import { GenericNftSearchDndRow_MetadataAccount$key } from "components/nft/__generated__/GenericNftSearchDndRow_MetadataAccount.graphql";

type ItemMetadataAccount = {
  metadataAccount: GenericNftSearchDndRow_MetadataAccount$key;
  metadataAccountId: string;
  mint: string;
};

export type Item = {
  id: string;
} & ItemMetadataAccount;

export const TOTAL_OPERATIONS_LIMIT = 10;

export type SeriesSelectedNftsContextData = {
  appendItem: (item: ItemMetadataAccount) => void;
  committedItems: Array<Item>;
  committedMetadataAccountIds: Set<string>;
  currentSeriesId: string;
  items: Array<Item>;
  itemsToCommit: Array<Item>;
  itemsToRemove: Array<Item>;
  metadataAccountIds: Set<string>;
  removeItem: (metadataAccountId: string) => void;

  resetItems: () => void;
  setItems: Dispatch<SetStateAction<Array<Item>>>;
  shouldExecuteOperation: (
    metadataAccountId: string,
    operation: "add" | "remove"
  ) => boolean;
  showMaxActionsPopover: boolean;
  totalOperations: number;
  triggerMaxActionsPopover: () => void;
};

const defaultData = {
  appendItem: emptyFunction,
  committedItems: [],
  committedMetadataAccountIds: new Set<string>(),
  currentSeriesId: "",
  items: [],
  itemsToCommit: [],
  itemsToRemove: [],
  metadataAccountIds: new Set<string>(),
  removeItem: emptyFunction,
  resetItems: emptyFunction,
  setItems: emptyFunction,
  shouldExecuteOperation: () => false,
  showMaxActionsPopover: false,
  totalOperations: 0,
  triggerMaxActionsPopover: emptyFunction,
};

export const SeriesSelectedNftsContext: Context<SeriesSelectedNftsContextData> =
  createContext<SeriesSelectedNftsContextData>(defaultData);

function Inner({
  currentSeriesId,
  nftQueryRef,
  children,
}: {
  children: any;
  currentSeriesId: string;
  nftQueryRef: PreloadedQuery<useSeriesPageMetadataAccountsQuery>;
}) {
  const [committedItems, setCommittedItems] = useState<Array<Item>>([]);
  const [items, setItems] = useState<Array<Item>>([]);
  useState<Set<string>>(new Set());
  const [committedMetadataAccountIds, setCommittedMetadataAccountIds] =
    useState<Set<string>>(new Set());
  const [metadataAccountIds, setMetadataAccountIds] = useState<Set<string>>(
    new Set()
  );
  const metadataAccountsPreloadedQuery =
    usePreloadedQuery<useSeriesPageMetadataAccountsQuery>(
      seriesMetadataAccountsQuery,
      nftQueryRef
    );
  const { data: metadataAccountsData } = usePaginationFragment<
    SeriesPageMetadataAccountsPaginationQuery,
    useSeriesPageMetadataAccounts_Query$key
  >(seriesMetadataAccountsFragment, metadataAccountsPreloadedQuery);
  const [showMaxActionsPopover, setShowMaxActionsPopover] = useState(false);

  const resetItems = (
    seriesId: string,
    data: useSeriesPageMetadataAccounts_Query$data
  ) => {
    const nftsInSeries = data?.metadataAccountsForSeries?.metadataAccounts.edges
      .map(({ node }) => node)
      .filter((node) => node.nft.Series?.id === seriesId);
    if (nftsInSeries == null) {
      return;
    }
    const itemsInSeries = nftsInSeries.map((node, i) => ({
      id: `${i}`,
      metadataAccount: node,
      metadataAccountId: node.id,
      mint: String(node.mint),
    }));
    const metadataAccountIdsSet = new Set(nftsInSeries.map((node) => node.id));
    setItems(Array.from(itemsInSeries));
    setCommittedItems(Array.from(itemsInSeries));
    setMetadataAccountIds(new Set(metadataAccountIdsSet));
    setCommittedMetadataAccountIds(new Set(metadataAccountIdsSet));
  };

  useEffect(() => {
    resetItems(currentSeriesId, metadataAccountsData);
    // Only reset at the context level if series ID has changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSeriesId]);

  const itemsToCommit = items.filter(
    (item) => !committedMetadataAccountIds.has(item.metadataAccountId)
  );
  const itemsToRemove = committedItems.filter(
    (item) => !metadataAccountIds.has(item.metadataAccountId)
  );
  const totalOperations = itemsToCommit.length + itemsToRemove.length;

  return (
    <SeriesSelectedNftsContext.Provider
      value={{
        appendItem: (item: ItemMetadataAccount) => {
          setItems([...items, { id: `${items.length + 1}`, ...item }]);
          metadataAccountIds.add(item.metadataAccountId);
        },
        committedItems,
        committedMetadataAccountIds,
        currentSeriesId,
        items,
        itemsToCommit,
        itemsToRemove,
        metadataAccountIds,
        removeItem: (metadataAccountId: string) => {
          setItems(
            items.filter((item) => item.metadataAccountId !== metadataAccountId)
          );
          metadataAccountIds.delete(metadataAccountId);
        },
        resetItems: () => resetItems(currentSeriesId, metadataAccountsData),
        setItems,
        shouldExecuteOperation: (
          metadataAccountId: string,
          operation: "add" | "remove"
        ) => {
          // If we're at the operation limit, don't execute
          if (totalOperations < TOTAL_OPERATIONS_LIMIT) {
            return true;
          }

          return operation === "add"
            ? // Simply adding back an item that is already committed, does not
              // increase total operations
              committedMetadataAccountIds.has(metadataAccountId)
            : // Removing an item from "itemsToCommit" so does not increase
              // total operations
              !committedMetadataAccountIds.has(metadataAccountId);
        },
        showMaxActionsPopover,
        totalOperations,
        triggerMaxActionsPopover: () => {
          setShowMaxActionsPopover(true);
          setTimeout(() => setShowMaxActionsPopover(false), 2000);
        },
      }}
    >
      {children}
    </SeriesSelectedNftsContext.Provider>
  );
}

type ProviderProps = {
  children: any;
  currentSeriesId: string;
  nftQueryRef: MaybeUndef<PreloadedQuery<useSeriesPageMetadataAccountsQuery>>;
};

export function SeriesSelectedNftsContextProvider(
  props: ProviderProps
): JSX.Element {
  const { currentSeriesId, nftQueryRef } = props;
  if (nftQueryRef == null) {
    return (
      <SeriesSelectedNftsContext.Provider value={defaultData}>
        {props.children}
      </SeriesSelectedNftsContext.Provider>
    );
  }

  return (
    <Inner currentSeriesId={currentSeriesId} nftQueryRef={nftQueryRef}>
      {props.children}
    </Inner>
  );
}
