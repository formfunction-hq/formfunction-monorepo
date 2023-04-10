import styles from "css/modal/ManageSeriesPiecesModal.module.css";
import graphql from "babel-plugin-relay/macro";
import {
  useFragment,
  useLazyLoadQuery,
  useMutation,
  usePaginationFragment,
  ConnectionHandler,
} from "react-relay";
import InputLabel from "components/input/InputLabel";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import {
  RefObject,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import logIfNotProd from "utils/logIfNotProd";
import { ManageSeriesPiecesModalMetadataAccountsQuery } from "components/modal/__generated__/ManageSeriesPiecesModalMetadataAccountsQuery.graphql";
import { ManageSeriesPiecesModalMetadataAccountsPaginationQuery } from "components/modal/__generated__/ManageSeriesPiecesModalMetadataAccountsPaginationQuery.graphql";
import {
  ManageSeriesPiecesModalMetadataAccounts_Query$data,
  ManageSeriesPiecesModalMetadataAccounts_Query$key,
} from "components/modal/__generated__/ManageSeriesPiecesModalMetadataAccounts_Query.graphql";
import SeriesNftSearch from "components/series/SeriesNftSearch";
import GenericModal from "components/modal/GenericModal";
import SeriesNftSelectDnd from "components/series/SeriesNftSelectDnd";
import {
  SeriesSelectedNftsContext,
  TOTAL_OPERATIONS_LIMIT,
} from "context/SeriesSelectedNftsContext";
import useSolanaContext from "hooks/useSolanaContext";
import { notify } from "components/toast/notifications";
import getAccountBalance from "formfn-shared/dist/utils/solana/getAccountBalance";
import manageSeriesNftsTxs from "utils/solana/metaplex/manageSeriesNftsTxs";
import { ManageSeriesPiecesModalUpdateSeriesIdMutation } from "components/modal/__generated__/ManageSeriesPiecesModalUpdateSeriesIdMutation.graphql";
import { ManageSeriesPiecesModal_Series$key } from "components/modal/__generated__/ManageSeriesPiecesModal_Series.graphql";
import { PublicKey } from "@solana/web3.js";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import useUserContext from "hooks/useUserContext";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import TinyLabel from "components/text/TinyLabel";
import { Popover } from "antd";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import useWindowDimensions from "hooks/useWindowDimensions";
import HIGHER_THAN_MODAL_Z_INDEX from "constants/HigherThanModalZIndex";
import ElementId from "types/enums/ElementId";
import WaitingForTransactionModal from "components/modal/WaitingForTransactionModal";
import usePreventRefresh from "hooks/usePreventRefresh";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import combineTransactions from "formfn-shared/dist/utils/solana/txs/combineTransactions";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

type Props = {
  isShown: boolean;
  onHide: () => void;
  series: ManageSeriesPiecesModal_Series$key;
};

const seriesFragment = graphql`
  fragment ManageSeriesPiecesModal_Series on Series {
    mint
    slug
    id

    Creator {
      id
      username
    }
  }
`;

// Must be kept in sync with fragment on SeriesPage.tsx
const updateSeriesIdForNftMutation = graphql`
  mutation ManageSeriesPiecesModalUpdateSeriesIdMutation(
    $after: String
    $first: Int!
    $input: UpdateSeriesIdForNftsInput!
  ) {
    updateSeriesIdForNfts(after: $after, first: $first, input: $input) {
      metadataAccountsInSeries {
        edges {
          node {
            id
            mint

            nft {
              id
              creatorId
              isOffPlatform
              ownerId

              Series {
                id
              }
            }

            ...GenericNftSearchRow_MetadataAccount
            ...GenericNftSearchDndRow_MetadataAccount
            ...ListingCardForMetadata_MetadataAccount
          }
        }
      }

      metadataAccountsRemovedFromSeries {
        id

        nft {
          id

          Series {
            id
          }
        }
      }
    }
  }
`;

export const nftQuery = graphql`
  query ManageSeriesPiecesModalMetadataAccountsQuery(
    $after: String
    $first: PaginationAmount!
    $input: MetadataAccountsCreatedInput!
  ) {
    ...ManageSeriesPiecesModalMetadataAccounts_Query
  }
`;

export const nftFragment = graphql`
  fragment ManageSeriesPiecesModalMetadataAccounts_Query on query_root
  @refetchable(
    queryName: "ManageSeriesPiecesModalMetadataAccountsPaginationQuery"
  ) {
    metadataAccountsCreated {
      metadataAccounts(after: $after, first: $first, input: $input)
        @connection(
          key: "ManageSeriesPiecesModal_MetadataAccounts_Query_metadataAccounts"
        ) {
        edges {
          node {
            id
            mint

            nft {
              isMasterEdition
              isImported
            }

            ...ListingCardForMetadata_MetadataAccount
          }
        }
      }
    }

    ...SeriesNftSearchMetadataAccounts_Query
  }
`;

function getNodeByMint(
  data: ManageSeriesPiecesModalMetadataAccounts_Query$data,
  mint: string
) {
  return data.metadataAccountsCreated.metadataAccounts.edges.find(
    ({ node }) => node.mint === mint
  );
}

/**
 * Not all NFTs have the update authority as the creator of the NFTs.
 * For example, imported NFTs that were originally listed and sold on
 * Holaplex as a limited edition print will have the update authority
 * as the owner of the print, not the creator.
 */
function shouldCommitOnchain(
  data: ManageSeriesPiecesModalMetadataAccounts_Query$data,
  mint: string
) {
  const { node } = getNodeByMint(data, mint) ?? {};

  return node != null && (!node.nft.isImported || node.nft.isMasterEdition);
}

function Inner({
  isLoading,
  onHide,
  popoverRef,
  series,
  setIsLoading,
  setIsWaitingForTransactionShown,
}: {
  isLoading: boolean;
  onHide: () => void;
  popoverRef: RefObject<HTMLElement>;
  series: ManageSeriesPiecesModal_Series$key;
  setIsLoading: (val: boolean) => void;
  setIsWaitingForTransactionShown: (val: boolean) => void;
}): JSX.Element {
  const { items, itemsToCommit, itemsToRemove, resetItems } = useContext(
    SeriesSelectedNftsContext
  );
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const { user } = useUserContext();
  const seriesData = useFragment(seriesFragment, series);
  const { connection, anchorWallet } = useSolanaContext();
  const metadataAccountsQuery =
    useLazyLoadQuery<ManageSeriesPiecesModalMetadataAccountsQuery>(nftQuery, {
      first: 200,
      input: {
        creatorAddress: user?.id ?? "",
        includeCollaborations: false,
      },
    });
  const { data: metadataAccountsData } = usePaginationFragment<
    ManageSeriesPiecesModalMetadataAccountsPaginationQuery,
    ManageSeriesPiecesModalMetadataAccounts_Query$key
  >(nftFragment, metadataAccountsQuery);
  const [commitSeriesIds] =
    useMutation<ManageSeriesPiecesModalUpdateSeriesIdMutation>(
      updateSeriesIdForNftMutation
    );
  const resetLoadingStates = () => {
    setIsWaitingForTransactionShown(false);
    setIsLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(resetItems, []);

  const mintAndCommit = async () => {
    const txs = filterNulls(
      await Promise.all([
        manageSeriesNftsTxs(
          connection,
          anchorWallet!,
          new PublicKey(seriesData.mint),
          itemsToCommit
            .filter((item) =>
              shouldCommitOnchain(metadataAccountsData, item.mint)
            )
            .map((item) => new PublicKey(item.mint)),
          false
        ),
        manageSeriesNftsTxs(
          connection,
          anchorWallet!,
          new PublicKey(seriesData.mint),
          itemsToRemove
            .filter((item) =>
              shouldCommitOnchain(metadataAccountsData, item.mint)
            )
            .map((item) => new PublicKey(item.mint)),
          true
        ),
      ])
    );

    if (txs.length > 0) {
      const combinedTx = combineTransactions([...txs]);
      const mintsToAddStrings = itemsToCommit.map((item) => item.mint);
      const mintsToRemoveStrings = itemsToRemove.map((item) => item.mint);
      setIsWaitingForTransactionShown(true);
      let verifyCollectionTxid = null;
      try {
        verifyCollectionTxid = await sendTransactionWithWallet({
          afterSignCallback: (unfinalizedTxid) => {
            commitRawTxMutation({
              extraData: {
                isSeries: true,
                mintsToAdd: mintsToAddStrings,
                mintsToRemove: mintsToRemoveStrings,
                seriesMint: seriesData.mint.toString(),
              },
              mint: seriesData.mint,
              rawTxType: CommitRawTxType.ManageSeriesPieces,
              txid: unfinalizedTxid,
            });
          },
          connection,
          loggingData: {
            mintsToAdd: mintsToAddStrings,
            mintsToRemove: mintsToRemoveStrings,
            seriesMint: seriesData.mint,
            transactionType: "VerifyCollection",
          },
          signers: [],
          txs: [combinedTx],
          wallet: anchorWallet!,
        });
      } catch {
        setIsWaitingForTransactionShown(false);
      }

      if (verifyCollectionTxid == null) {
        resetLoadingStates();
        notify({
          message: "Failed to add NFTs to collection",
          type: "error",
        });
        return;
      }
    }

    const inputs = {
      after: null,
      first: 200,
      input: {
        mintsToAdd: itemsToCommit.map((item) => item.mint),
        mintsToRemove: itemsToRemove.map((item) => item.mint),
        order: items.map((item) => item.mint),
        seriesId: seriesData.mint,
      },
    };
    commitSeriesIds({
      onCompleted: () => {
        resetLoadingStates();
        notify({
          message: "Updated series successfully!",
        });
        onHide();
      },
      onError: () => {
        notifyUnexpectedError();
        resetLoadingStates();
      },
      updater: (store) => {
        // Given that we are both adding, removing, and re-ordering NFTs in a series
        // with this update, we need to manually update the store to make sure the
        // UI reflects the backend state without needing a refresh
        // NOTE: when pagination is enabled, need to pull down `page_info` and
        // update that as well.
        const root = store.getRoot();
        const parentObject = root.getLinkedRecord("metadataAccountsForSeries");
        const conn = ConnectionHandler.getConnection(
          parentObject!,
          "SeriesPage_MetadataAccounts_Query_metadataAccounts",
          {
            input: {
              // IMPORTANT: This needs to stay in sync with the input used in useSeriesPageMetadataAccounts
              slugInput: {
                creatorId: window.location.href.includes("profile")
                  ? seriesData.Creator.id
                  : undefined,
                creatorUsername: window.location.href.includes("profile")
                  ? undefined
                  : seriesData.Creator.username,
                seriesSlug: seriesData.slug,
              },
            },
          }
        );
        if (conn == null) {
          logError(
            AnalyticsEvent.RelayUpdaterError,
            "Connection is null in ManageSeriesPiecesModal updater"
          );
          return;
        }
        const payload = store.getRootField("updateSeriesIdForNfts");
        const metadataAccounts = payload.getLinkedRecord(
          "metadataAccountsInSeries"
        );
        const newEdges = metadataAccounts.getLinkedRecords("edges");
        conn!.setLinkedRecords(newEdges, "edges");

        // Also update the count we use on SeriesPage
        const seriesNftCount = store.get(
          `client:${seriesData.id}:Nfts_aggregate(where:{"status":{"_neq":"Burned"}}):aggregate`
        );
        seriesNftCount?.setValue(newEdges.length, "count");
      },
      variables: inputs,
    });
  };

  const onSubmit = async () => {
    logIfNotProd("submit");
    setIsLoading(true);

    if (anchorWallet?.publicKey == null) {
      notify({
        message: "Please connect your wallet",
        type: "error",
      });
      resetLoadingStates();
      return;
    }

    const balance = await getAccountBalance(
      connection,
      anchorWallet.publicKey!
    );
    if (balance == null) {
      notify({
        description: `You do not have enough funds to manage pieces in your collection`,
        message: "Insufficient funds",
        type: "error",
      });
      resetLoadingStates();
      return;
    }

    mintAndCommit();
  };

  return (
    <>
      <div className={styles.search}>
        {!isBottomTabsWidth && <InputLabel label="Pieces in this Series" />}
        <SeriesNftSearch
          popoverRef={popoverRef}
          metadataAccounts={metadataAccountsData}
        />
        <SeriesNftSelectDnd />
      </div>
      <div className={styles.saveButtonContainer}>
        <div className={styles.saveButtonDivider} />
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.saveButton}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          type="submit"
          onClick={onSubmit}
        >
          Save
        </ButtonWithText>
      </div>
    </>
  );
}

export default function ManageSeriesPiecesModal({
  isShown,
  onHide,
  series,
}: Props): JSX.Element {
  const { height: windowHeight } = useWindowDimensions();
  const popoverRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingForTransactionShown, setIsWaitingForTransactionShown] =
    useState(false);
  const { totalOperations, showMaxActionsPopover } = useContext(
    SeriesSelectedNftsContext
  );
  usePreventRefresh(isLoading);

  return (
    <>
      <WaitingForTransactionModal
        isShown={isShown && isWaitingForTransactionShown}
        message={`Adding and removing pieces from a series is an on-chain action,
        so these changes require your approval.`}
      />
      <GenericModal
        bottomDrawerHeight={windowHeight - 40}
        modalId={ElementId.ManageSeriesPiecesModal}
        className={styles.modal}
        title="Manage Pieces"
        isShown={isShown && !isWaitingForTransactionShown}
        onHide={() => {
          if (isLoading) {
            notify({
              duration: 2,
              message:
                "Please wait until your series update has been finalized",
              type: "info",
            });
            return;
          }

          onHide();
        }}
        excludeRefs={[popoverRef]}
      >
        {isShown && (
          <>
            <div className={styles.modalHeader}>
              <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
                Add, remove, and reorder pieces in this series. Because series
                data on Formfunction is stored on the blockchain and there is a
                transaction size limit, you can only add and remove up to{" "}
                {TOTAL_OPERATIONS_LIMIT} pieces at a time.{" "}
                <TextButton
                  display="inline"
                  type="link_external"
                  buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
                  href="https://help.formfunction.xyz/en/articles/6038867-how-series-work-on-formfunction"
                >
                  Learn more
                </TextButton>
              </Body1>
              <Popover
                zIndex={HIGHER_THAN_MODAL_Z_INDEX}
                visible={showMaxActionsPopover}
                content={
                  <div className={styles.maxActionsPopover}>
                    <Body1 colorClass={ColorClass.Primary}>
                      You&apos;ve reached the max number of actions. Please save
                      your changes!
                    </Body1>
                  </div>
                }
              >
                <TinyLabel
                  textTransform="uppercase"
                  colorClass={ColorClass.Primary}
                >
                  {`${totalOperations}/${TOTAL_OPERATIONS_LIMIT} additions and removals`}
                </TinyLabel>
              </Popover>
            </div>
            <Suspense
              fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
            >
              <Inner
                isLoading={isLoading}
                popoverRef={popoverRef}
                onHide={onHide}
                series={series}
                setIsLoading={setIsLoading}
                setIsWaitingForTransactionShown={
                  setIsWaitingForTransactionShown
                }
              />
            </Suspense>
          </>
        )}
      </GenericModal>
    </>
  );
}
