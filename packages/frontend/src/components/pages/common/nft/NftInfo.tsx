import styles from "css/pages/common/nft/NftInfo.module.css";
import graphql from "babel-plugin-relay/macro";
import ArtistPillButton from "components/buttons/ArtistPillButton";
import NftLabelAndContent from "components/pages/common/nft/NftLabelAndContent";
import {
  NftInfo_MetadataAccount$data,
  NftInfo_MetadataAccount$key,
  NftStatusExpress_enum,
} from "components/pages/common/nft/__generated__/NftInfo_MetadataAccount.graphql";
import Header2 from "components/text/Header2";
import {
  PreloadedQuery,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import NftActionButton from "components/buttons/NftActionButton";
import NftPrice from "components/pages/common/nft/NftPrice";
import NftListedEllipsisShadowButton from "components/buttons/NftListedEllipsisShadowButton";
import useSolanaContext from "hooks/useSolanaContext";
import NftTransactions from "components/pages/common/nft/NftTransactions";
import { Suspense, useEffect, useState } from "react";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import useBottomTabsContext from "hooks/useBottomTabsContext";
import NftEllipsisShadowButton from "components/buttons/NftEllipsisShadowButton";
import NftTransaction from "components/pages/common/nft/NftTransaction";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import shouldDisplayCollaborator from "utils/shouldDisplayCollaborator";
import isListedForSale from "utils/nft/isListedForSale";
import PnftInfo from "components/pages/common/nft/PnftInfo";
import NftOffer from "components/pages/common/nft/NftOffer";
import dayjs from "utils/dates/dayjsex";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import FontClass from "types/enums/FontClass";
import useUserContext from "hooks/useUserContext";
import { NftInfo_NftPageExtrasResponse$key } from "components/pages/common/nft/__generated__/NftInfo_NftPageExtrasResponse.graphql";
import NftKindLabel from "components/pages/common/nft/kind-label/NftKindLabel";
import { NftInfo_PnftInfoResponse$key } from "components/pages/common/nft/__generated__/NftInfo_PnftInfoResponse.graphql";
import NftEditionsTable from "components/pages/common/nft/editions-table/NftEditionsTable";
import useNftKind from "hooks/useNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import shouldShowOffersForNftKind from "utils/nft/shouldShowOffersForNftKind";
import { useNftPageTxsQuery } from "hooks/nft-page/__generated__/useNftPageTxsQuery.graphql";
import { txsFragment, txsQuery } from "hooks/nft-page/useNftPageTxs";
import { NftTransactionsPaginationQuery } from "hooks/nft-page/__generated__/NftTransactionsPaginationQuery.graphql";
import { useNftPageTxs_Query$key } from "hooks/nft-page/__generated__/useNftPageTxs_Query.graphql";
import { useNftPageClaimsQuery } from "hooks/nft-page/__generated__/useNftPageClaimsQuery.graphql";
import { useNftPageEditionsQuery } from "hooks/nft-page/__generated__/useNftPageEditionsQuery.graphql";
import { useNftPagePnftAuctionNftsQuery } from "hooks/nft-page/__generated__/useNftPagePnftAuctionNftsQuery.graphql";
import {
  useNftPageOfferTxs_Query$data,
  useNftPageOfferTxs_Query$key,
} from "hooks/nft-page/__generated__/useNftPageOfferTxs_Query.graphql";
import { useNftPageOfferTxsQuery } from "hooks/nft-page/__generated__/useNftPageOfferTxsQuery.graphql";
import {
  offerTxsFragment,
  offerTxsQuery,
} from "hooks/nft-page/useNftPageOfferTxs";
import { NftOfferTransactionsPaginationQuery } from "hooks/nft-page/__generated__/NftOfferTransactionsPaginationQuery.graphql";
import PaginationControls, {
  PAGINATION_INITIAL_PAGE,
} from "components/nav/PaginationControls";
import { NFT_TRANSACTIONS_PAGE_SIZE } from "constants/PageSizes";
import getPaginationStartAndEnd from "utils/pagination/getPaginationStartAndEnd";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import NftPageUnlockableInfo from "components/pages/common/nft/NftPageUnlockableInfo";
import UnlockableModal from "components/modal/unlockables/UnlockableModalContainer";
import NftEditionsTableSkeleton from "components/pages/common/nft/editions-table/NftEditionsTableSkeleton";
import HideIfEmpty from "components/containers/HideIfEmpty";
import CrossmintButtonWrapper from "components/buttons/CrossmintButtonWrapper";
import NftInfoDisclosures from "components/pages/common/nft/NftInfoDisclosures";
import NftAllowlistInfo from "components/pages/common/nft/NftAllowlistInfo";

const nftPageExtrasFragment = graphql`
  fragment NftInfo_NftPageExtrasResponse on NftPageExtrasResponse {
    viewerHasOpenOffersPlaced
  }
`;

const pnftFragment = graphql`
  fragment NftInfo_PnftInfoResponse on PnftInfoResponse {
    metadataAccount {
      ...PnftInfo_PnftInfoResponse
    }
  }
`;

const fragment = graphql`
  fragment NftInfo_MetadataAccount on MetadataAccount {
    id

    nft {
      id
      creatorId

      Creator {
        id
        username

        ProfilePhoto {
          id
          photoUrl
        }
      }
      Owner {
        id
        username

        ProfilePhoto {
          id
          photoUrl
        }
      }
      ownerId
      status
    }

    data {
      name
      creators {
        address
        # eslint-disable-next-line relay/unused-fields
        share
        status
        user {
          id
          username
          ProfilePhoto {
            photoUrl
          }
        }
      }
    }

    offchainData {
      description
    }

    ...NftAllowlistInfo_MetadataAccount
    ...CrossmintButtonWrapper_MetadataAccount
    ...NftTransaction_MetadataAccount
    ...NftEllipsisShadowButton_MetadataAccount
    ...NftInfoDisclosures_MetadataAccount
    ...NftListedEllipsisShadowButton_MetadataAccount
    ...NftPrice_MetadataAccount
    ...NftActionButton_MetadataAccount
    ...NftOffer_MetadataAccount
    ...NftKindLabel_MetadataAccount
    ...PnftInfo_MetadataAccount
    ...useNftKind_MetadataAccount
    ...NftPageUnlockableInfo_MetadataAccount
    ...UnlockableModalContainer_MetadataAccount
  }
`;

function shouldShowOffers(
  userId: Undef<string>,
  data: useNftPageOfferTxs_Query$data,
  nftStatus: NftStatusExpress_enum
) {
  // Always show a user's own offer to them so they can cancel and withdraw
  const ownOffer =
    userId != null
      ? data.nftOffers.nftOffers.edges.find(
          ({ node }) => node.transaction.fromAddress === userId
        )
      : null;
  if (ownOffer != null) {
    return true;
  }

  // Otherwise, only show offers when the NFT is in these states
  return ["Listed", "ListedInstantSale", "ListingScheduled", "Owned"].includes(
    nftStatus
  );
}

function Offers({
  metadataAccountData,
  offerTransactionsQueryRef,
}: {
  metadataAccountData: NftInfo_MetadataAccount$data;
  offerTransactionsQueryRef: PreloadedQuery<useNftPageOfferTxsQuery>;
}): Maybe<JSX.Element> {
  const { user } = useUserContext();
  const queryData = usePreloadedQuery<useNftPageOfferTxsQuery>(
    offerTxsQuery,
    offerTransactionsQueryRef
  );

  // TODO: implement pagination using loadNext
  const { data } = usePaginationFragment<
    NftOfferTransactionsPaginationQuery,
    useNftPageOfferTxs_Query$key
  >(offerTxsFragment, queryData);

  if (!shouldShowOffers(user?.id, data, metadataAccountData.nft.status)) {
    return <Body1 colorClass={ColorClass.Primary}>Offers not available</Body1>;
  }

  if (data.nftOffers.nftOffers.edges.length === 0) {
    return <Body1 colorClass={ColorClass.Primary}>No offers yet</Body1>;
  }

  const transactionElems = data.nftOffers.nftOffers.edges.map(
    ({ node: { transaction, expirationDate, isValid } }) => (
      <NftOffer
        isValid={isValid}
        key={transaction.id}
        metadataAccount={metadataAccountData}
        transaction={transaction}
        expirationDate={dayjs(expirationDate)}
      />
    )
  );

  return <NftTransactions>{transactionElems}</NftTransactions>;
}

function Transactions({
  metadataAccountData,
  transactionsQueryRef,
}: {
  metadataAccountData: NftInfo_MetadataAccount$data;
  transactionsQueryRef: PreloadedQuery<useNftPageTxsQuery>;
}): JSX.Element {
  const [currentPage, setCurrentPage] = useState(PAGINATION_INITIAL_PAGE);
  const {
    NftTransactions: { setConnectionId: setNftTransactionsConnectionId },
  } = useRelayConnectionIdsContext();
  const queryData = usePreloadedQuery<useNftPageTxsQuery>(
    txsQuery,
    transactionsQueryRef
  );

  // TODO: implement pagination using loadNext
  const { data } = usePaginationFragment<
    NftTransactionsPaginationQuery,
    useNftPageTxs_Query$key
  >(txsFragment, queryData);

  useEffect(() => {
    setNftTransactionsConnectionId(data.nftTransactions.nftTransactions.__id);
  }, [
    data.nftTransactions.nftTransactions.__id,
    setNftTransactionsConnectionId,
  ]);

  const { end, start } = getPaginationStartAndEnd(
    currentPage,
    NFT_TRANSACTIONS_PAGE_SIZE
  );
  const edgesFiltered = data.nftTransactions.nftTransactions.edges.filter(
    ({ node: transaction }) =>
      !(
        transaction.type === "Transferred" &&
        transaction.fromAddress === transaction.toAddress
      )
  );
  const transactionElems = edgesFiltered
    .slice(start, end)
    .map(({ node: transaction }) => (
      <NftTransaction
        key={transaction.id}
        metadataAccount={metadataAccountData}
        nftTransaction={transaction}
      />
    ));

  return (
    <div>
      <NftTransactions>{transactionElems}</NftTransactions>
      <PaginationControls
        currentPage={currentPage}
        pageSize={NFT_TRANSACTIONS_PAGE_SIZE}
        setCurrentPage={setCurrentPage}
        totalCount={edgesFiltered.length}
      />
    </div>
  );
}

type Props = {
  claimsQueryRef: PreloadedQuery<useNftPageClaimsQuery>;
  editionsQueryRef: PreloadedQuery<useNftPageEditionsQuery>;
  metadataAccount: NftInfo_MetadataAccount$key;
  nftPageExtras: NftInfo_NftPageExtrasResponse$key;
  offerTransactionsQueryRef: PreloadedQuery<useNftPageOfferTxsQuery>;
  pnftAuctionNftsQueryRef: PreloadedQuery<useNftPagePnftAuctionNftsQuery>;
  pnftInfo: NftInfo_PnftInfoResponse$key;
  transactionsQueryRef: PreloadedQuery<useNftPageTxsQuery>;
};

export default function NftInfo({
  claimsQueryRef,
  editionsQueryRef,
  metadataAccount,
  nftPageExtras,
  offerTransactionsQueryRef,
  pnftAuctionNftsQueryRef,
  pnftInfo,
  transactionsQueryRef,
}: Props): JSX.Element {
  const { anchorWallet } = useSolanaContext();
  const { hasBottomTabs } = useBottomTabsContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);
  const pnftData = useFragment(pnftFragment, pnftInfo);
  const nftPageExtrasData = useFragment(nftPageExtrasFragment, nftPageExtras);
  const { nft } = metadataAccountData;
  const { description } = metadataAccountData.offchainData;
  const isOwner =
    anchorWallet?.publicKey != null &&
    arePublicKeysEqual(anchorWallet.publicKey, nft.ownerId);
  const creators = (metadataAccountData.data.creators ?? [])
    .filter((creator) => shouldDisplayCollaborator(creator, nft.creatorId))
    .sort(getCompareByProperty("share", SortOrder.Desc));
  const isMasterEditionPnft = nftKind === NftKind.PnftMasterEdition;
  const showEditionsTable = [
    NftKind.MasterEditionWithNonzeroSupply,
    NftKind.MasterEditionWithUnlimitedSupply,
    NftKind.PnftMasterEdition,
  ].includes(nftKind);

  const typeLabel = (
    <NftKindLabel
      metadataAccount={metadataAccountData}
      pnftAuctionNftsQueryRef={pnftAuctionNftsQueryRef}
    />
  );

  return (
    <div className={styles.container}>
      <UnlockableModal metadataAccount={metadataAccountData} />
      <div className={styles.nameAndButton}>
        <Header2 colorClass={ColorClass.Primary}>
          {metadataAccountData.data.name}
          {typeLabel != null && (
            <div className={styles.typeLabel}>{typeLabel}</div>
          )}
        </Header2>
        {isOwner &&
        isListedForSale(metadataAccountData.nft.status) &&
        !hasBottomTabs ? (
          <div className={styles.ellipsisButton}>
            <NftListedEllipsisShadowButton
              metadataAccount={metadataAccountData}
            />
          </div>
        ) : (
          !hasBottomTabs && (
            <div className={styles.ellipsisButton}>
              <NftEllipsisShadowButton metadataAccount={metadataAccountData} />
            </div>
          )
        )}
      </div>
      <div className={styles.creatorAndOwner}>
        <NftLabelAndContent label="Creator">
          <ArtistPillButton
            name={nft.Creator?.username ?? nft.creatorId}
            src={nft.Creator?.ProfilePhoto?.photoUrl ?? null}
          />
        </NftLabelAndContent>
        {creators.length > 0 && (
          <NftLabelAndContent label="Collaborators">
            <div className={styles.collaborators}>
              {creators.map((creator) => (
                <ArtistPillButton
                  key={creator.address}
                  name={creator.user?.username ?? creator.address}
                  src={creator.user?.ProfilePhoto?.photoUrl}
                />
              ))}
            </div>
          </NftLabelAndContent>
        )}
        {nft.ownerId !== nft.creatorId && (
          <NftLabelAndContent label="Owner">
            <ArtistPillButton
              name={nft.Owner?.username ?? nft.ownerId}
              src={nft.Owner?.ProfilePhoto?.photoUrl ?? null}
            />
          </NftLabelAndContent>
        )}
      </div>
      {description != null && description.length > 0 && (
        <NftLabelAndContent label="Description">
          <Body1 className={styles.description} colorClass={ColorClass.Primary}>
            {description}
          </Body1>
        </NftLabelAndContent>
      )}
      <NftInfoDisclosures metadataAccount={metadataAccountData} />
      <NftPrice metadataAccount={metadataAccountData} />
      {/* If no children are rendered, we don't want to display a double row gap by rendering an empty div */}
      <HideIfEmpty className={styles.buttons}>
        {!isMasterEditionPnft && (
          <NftActionButton
            metadataAccount={metadataAccountData}
            offerTransactionsQueryRef={offerTransactionsQueryRef}
          />
        )}
        <CrossmintButtonWrapper metadataAccount={metadataAccountData} />
        {anchorWallet?.publicKey != null && (
          <Suspense fallback={null}>
            <NftAllowlistInfo metadataAccount={metadataAccountData} />
          </Suspense>
        )}
      </HideIfEmpty>
      {showEditionsTable && (
        <Suspense fallback={<NftEditionsTableSkeleton />}>
          <NftEditionsTable editionsQueryRef={editionsQueryRef} />
        </Suspense>
      )}
      <NftPageUnlockableInfo
        componentType="standard"
        metadataAccount={metadataAccountData}
      />
      {pnftData.metadataAccount != null && (
        // Note: This intentionally has no loading fallback.
        <Suspense fallback={null}>
          <PnftInfo
            auctionNftMetadataAccount={metadataAccountData}
            claimsQueryRef={claimsQueryRef}
            componentType="standard"
            pnftMetadataAccount={pnftData.metadataAccount}
          />
        </Suspense>
      )}
      {!isMasterEditionPnft &&
        // We don't want to show this section once a piece has gone on auction,
        // or if the nftKind is not compatible with offers, except if the current
        // viewer has an open offer (because they should be able to cancel it)
        ((nft.status !== "Auction" && shouldShowOffersForNftKind(nftKind)) ||
          nftPageExtrasData.viewerHasOpenOffersPlaced) && (
          <NftLabelAndContent label="Offers">
            <Suspense
              fallback={
                <LoadingSpinner
                  fontClass={FontClass.Body1}
                  colorValue={ColorValue.BrightPurple}
                  className={styles.spinner}
                />
              }
            >
              <Offers
                metadataAccountData={metadataAccountData}
                offerTransactionsQueryRef={offerTransactionsQueryRef}
              />
            </Suspense>
          </NftLabelAndContent>
        )}
      <NftLabelAndContent label="Activity">
        <Suspense
          fallback={
            <LoadingSpinner
              fontClass={FontClass.Body1}
              colorValue={ColorValue.BrightPurple}
              className={styles.spinner}
            />
          }
        >
          <Transactions
            metadataAccountData={metadataAccountData}
            transactionsQueryRef={transactionsQueryRef}
          />
        </Suspense>
      </NftLabelAndContent>
      <NftPageUnlockableInfo
        componentType="subtle"
        metadataAccount={metadataAccountData}
      />
      {pnftData.metadataAccount != null && (
        // Note: This intentionally has no loading fallback.
        <Suspense fallback={null}>
          <PnftInfo
            auctionNftMetadataAccount={metadataAccountData}
            claimsQueryRef={claimsQueryRef}
            componentType="subtle"
            pnftMetadataAccount={pnftData.metadataAccount}
          />
        </Suspense>
      )}
    </div>
  );
}
