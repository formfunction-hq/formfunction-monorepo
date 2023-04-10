import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import { Suspense } from "react";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { useParams } from "react-router-dom";
import styles from "css/pages/common/nft/NftPage.module.css";
import Header2 from "components/text/Header2";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import useSetPageTitle from "hooks/useSetPageTitle";
import useLogPageView from "hooks/useLogPageView";
import usePollingFetchKey from "hooks/usePollingFetchKey";
import { RelayConnectionIdsProvider } from "context/RelayConnectionIdsContext";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import useUserContext from "hooks/useUserContext";
import useNftPageTxs from "hooks/nft-page/useNftPageTxs";
import useNftPageClaims from "hooks/nft-page/useNftPageClaims";
import useNftPageEditions from "hooks/nft-page/useNftPageEditions";
import useNftPagePnftAuctionNfts from "hooks/nft-page/useNftPagePnftAuctionNfts";
import useNftPageOfferTxs from "hooks/nft-page/useNftPageOfferTxs";
import { useNftPageClaimsQuery } from "hooks/nft-page/__generated__/useNftPageClaimsQuery.graphql";
import { useNftPageEditionsQuery } from "hooks/nft-page/__generated__/useNftPageEditionsQuery.graphql";
import { useNftPageOfferTxsQuery } from "hooks/nft-page/__generated__/useNftPageOfferTxsQuery.graphql";
import { useNftPagePnftAuctionNftsQuery } from "hooks/nft-page/__generated__/useNftPagePnftAuctionNftsQuery.graphql";
import { useNftPageTxsQuery } from "hooks/nft-page/__generated__/useNftPageTxsQuery.graphql";
import useNftPageNft, { nftQuery } from "hooks/nft-page/useNftPageNft";
import { useNftPageNftQuery } from "hooks/nft-page/__generated__/useNftPageNftQuery.graphql";
import NftPageContent from "components/pages/common/nft/NftPageContent";
import { useQueryLoaderHookType } from "react-relay/relay-hooks/useQueryLoader";
import NftPageSkeleton from "components/pages/common/nft/NftPageSkeleton";
import useNftAssetDimensions from "hooks/nft-page/useNftAssetDimensions";
import useNftPageEditionsBuyerInfo from "hooks/nft-page/useNftPageEditionBuyerInfo";
import { useNftPageEditionBuyerInfoQuery } from "hooks/nft-page/__generated__/useNftPageEditionBuyerInfoQuery.graphql";
import useNftPageCampaign from "hooks/nft-page/useNftPageCampaign";
import { useNftPageCampaignQuery } from "hooks/nft-page/__generated__/useNftPageCampaignQuery.graphql";

type InnerProps = {
  claimsQueryRef: MaybeUndef<PreloadedQuery<useNftPageClaimsQuery>>;
  editionBuyerInfoQueryRef: MaybeUndef<
    PreloadedQuery<useNftPageEditionBuyerInfoQuery>
  >;
  editionsQueryRef: MaybeUndef<PreloadedQuery<useNftPageEditionsQuery>>;
  loadClaimsQuery: useQueryLoaderHookType<useNftPageClaimsQuery>[1];
  loadEditionBuyerInfoQuery: useQueryLoaderHookType<useNftPageEditionBuyerInfoQuery>[1];
  loadNftQuery: useQueryLoaderHookType<useNftPageNftQuery>[1];
  mint: string;
  nftCampaignQueryRef: MaybeUndef<PreloadedQuery<useNftPageCampaignQuery>>;
  nftQueryRef: PreloadedQuery<useNftPageNftQuery>;
  offerTransactionsQueryRef: MaybeUndef<
    PreloadedQuery<useNftPageOfferTxsQuery>
  >;
  pnftAuctionNftsQueryRef: MaybeUndef<
    PreloadedQuery<useNftPagePnftAuctionNftsQuery>
  >;
  transactionsQueryRef: MaybeUndef<PreloadedQuery<useNftPageTxsQuery>>;
};

function Inner({
  claimsQueryRef,
  editionBuyerInfoQueryRef,
  editionsQueryRef,
  loadClaimsQuery,
  loadEditionBuyerInfoQuery,
  loadNftQuery,
  mint,
  nftCampaignQueryRef,
  nftQueryRef,
  offerTransactionsQueryRef,
  pnftAuctionNftsQueryRef,
  transactionsQueryRef,
}: InnerProps): JSX.Element {
  const data = usePreloadedQuery<useNftPageNftQuery>(nftQuery, nftQueryRef);
  useSetPageTitle(data.metadataAccountForMint?.data?.name ?? "NFT Not Found");

  if (data.metadataAccountForMint == null) {
    return (
      <div>
        <Header2 colorClass={ColorClass.Primary} textAlign="center">
          Could not find NFT
        </Header2>
        <Body1
          className={styles.couldNotFindDescription}
          colorClass={ColorClass.Secondary}
          textAlign="center"
        >
          If you just minted this NFT, please wait a few seconds, then try
          refreshing.
        </Body1>
      </div>
    );
  }

  return (
    <NftPageContent
      claimsQueryRef={claimsQueryRef}
      editionBuyerInfoQueryRef={editionBuyerInfoQueryRef}
      editionsQueryRef={editionsQueryRef}
      loadClaimsQuery={loadClaimsQuery}
      loadEditionBuyerInfoQuery={loadEditionBuyerInfoQuery}
      loadNftQuery={loadNftQuery}
      metadataAccount={data.metadataAccountForMint}
      mint={mint}
      nftCampaignQueryRef={nftCampaignQueryRef}
      offerTransactionsQueryRef={offerTransactionsQueryRef}
      pnftAuctionNftsQueryRef={pnftAuctionNftsQueryRef}
      queryRoot={data}
      transactionsQueryRef={transactionsQueryRef}
    />
  );
}

export default function NftPage(): JSX.Element {
  const params = useParams();
  const { userId } = useUserContext();
  useLogPageView();
  const mint = params.mint!;
  const fetchKey = usePollingFetchKey();

  // It's important that this query gets kicked off first, because while it's loading,
  // the entire page suspends.
  const { loadNftQuery, nftQueryRef } = useNftPageNft(mint, fetchKey);

  const transactionsQueryRef = useNftPageTxs(mint, fetchKey);
  const { loadClaimsQuery, claimsQueryRef } = useNftPageClaims(
    mint,
    userId ?? ""
  );
  // NOTE: Polling introduces some weird issues, see
  // https://github.com/formfunction-hq/formfn-monorepo/pull/1039 for more details.
  // We may want to do a more thorough fix in the future, but for now we'll just disable polling.
  const editionsQueryRef = useNftPageEditions(mint, 0);
  const { editionBuyerInfoQueryRef, loadEditionBuyerInfoQuery } =
    useNftPageEditionsBuyerInfo(mint);
  const offerTransactionsQueryRef = useNftPageOfferTxs(mint, 0);
  const pnftAuctionNftsQueryRef = useNftPagePnftAuctionNfts(mint);
  const { nftCampaignQueryRef } = useNftPageCampaign(mint);
  const dimensions = useNftAssetDimensions();

  return (
    <PageWithHeaderAndFooter>
      <ResponsivePageBody>
        <RelayConnectionIdsProvider>
          <Suspense
            fallback={dimensions && <NftPageSkeleton dimensions={dimensions} />}
          >
            {nftQueryRef != null && (
              <Inner
                claimsQueryRef={claimsQueryRef}
                editionBuyerInfoQueryRef={editionBuyerInfoQueryRef}
                editionsQueryRef={editionsQueryRef}
                loadClaimsQuery={loadClaimsQuery}
                loadEditionBuyerInfoQuery={loadEditionBuyerInfoQuery}
                loadNftQuery={loadNftQuery}
                mint={mint}
                nftCampaignQueryRef={nftCampaignQueryRef}
                nftQueryRef={nftQueryRef}
                offerTransactionsQueryRef={offerTransactionsQueryRef}
                pnftAuctionNftsQueryRef={pnftAuctionNftsQueryRef}
                transactionsQueryRef={transactionsQueryRef}
              />
            )}
          </Suspense>
        </RelayConnectionIdsProvider>
      </ResponsivePageBody>
    </PageWithHeaderAndFooter>
  );
}
