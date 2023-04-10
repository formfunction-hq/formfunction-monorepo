import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import PlainButton from "components/buttons/PlainButton";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import FlexBox from "components/layout/FlexBox";
import LoadingSpinner from "components/loading/LoadingSpinner";
import TooniesSwapModal from "components/modal/TooniesSwapModal";
import { CampaignTooniesSwapContentPaginationQuery } from "components/pages/campaign/campaign-v1/__generated__/CampaignTooniesSwapContentPaginationQuery.graphql";
import { CampaignTooniesSwapContent_MetadataAccount$key } from "components/pages/campaign/campaign-v1/__generated__/CampaignTooniesSwapContent_MetadataAccount.graphql";
import { CampaignTooniesSwapContent_Query$key } from "components/pages/campaign/campaign-v1/__generated__/CampaignTooniesSwapContent_Query.graphql";
import { CampaignTooniesSwapQuery } from "components/pages/campaign/campaign-v1/__generated__/CampaignTooniesSwapQuery.graphql";
import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import { GenerativeSeriesContextProvider } from "context/GenerativeSeriesContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useGenerativeSeriesPageMetadataAccounts, {
  generativeSeriesMetadataAccountsQuery,
} from "hooks/generative-series-page/useGenerativeSeriesPageMetadataAccounts";
import { useGenerativeSeriesPageMetadataAccountsQuery } from "hooks/generative-series-page/__generated__/useGenerativeSeriesPageMetadataAccountsQuery.graphql";
import useFlagsTyped from "hooks/useFlagsTyped";
import useUserContext from "hooks/useUserContext";
import useViewerId from "hooks/useViewerId";
import { Suspense, useState } from "react";
import {
  PreloadedQuery,
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import { useParams } from "react-router-dom";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

// TODO: replace query with actual toonies nfts
const query = graphql`
  query CampaignTooniesSwapQuery($viewerId: String!) {
    metadataAccountsCreated {
      metadataAccounts(first: 100, input: { creatorAddress: $viewerId }) {
        edges {
          node {
            ...CampaignTooniesSwapContent_MetadataAccount
          }
        }
      }
    }

    metadataAccountsCollected {
      metadataAccounts(first: 100, input: { collectorAddress: $viewerId }) {
        edges {
          node {
            ...CampaignTooniesSwapContent_MetadataAccount
          }
        }
      }
    }
  }
`;

const fragment = graphql`
  fragment CampaignTooniesSwapContent_MetadataAccount on MetadataAccount
  @relay(plural: true) {
    mint
    nft {
      Owner {
        id
      }
    }

    ...ListingCardForMetadata_MetadataAccount
  }
`;

const seriesNftsFragment = graphql`
  fragment CampaignTooniesSwapContent_Query on query_root
  @refetchable(queryName: "CampaignTooniesSwapContentPaginationQuery") {
    metadataAccountsForExplore {
      metadataAccounts(after: $after, first: $first, input: $input)
        @connection(key: "CampaignTooniesSwapContent_Query_metadataAccounts") {
        edges {
          node {
            ...CampaignTooniesSwapContent_MetadataAccount
          }
        }
      }
    }
  }
`;

function Content({
  metadataAccounts,
  viewerId,
}: {
  metadataAccounts: CampaignTooniesSwapContent_MetadataAccount$key;
  viewerId: string;
}) {
  const [nftToSwapMint, setNftToSwapMint] = useState<Maybe<string>>(null);
  const metadataAccountsData = useFragment(fragment, metadataAccounts);
  const filteredMetadataAccounts = metadataAccountsData.filter(
    (metadataAccount) => metadataAccount.nft.Owner!.id === viewerId
  );

  return (
    <>
      <TooniesSwapModal
        nftToSwapMint={nftToSwapMint ?? ""}
        isShown={nftToSwapMint != null}
        onHide={() => setNftToSwapMint(null)}
      />
      <FlexBox flexDirection="column" gap={48}>
        <FlexBox flexDirection="column" gap={24} alignItems="center">
          <Header2 colorClass={ColorClass.Primary} textAlign="center">
            Toonies Swap
          </Header2>
          <Body1 colorClass={ColorClass.Secondary} textAlign="center">
            You can swap one of your Toonies for a proof of ownership token and
            a physical collectible by filling out a form that will be sent to
            the project creators.
          </Body1>
        </FlexBox>
        <NftGridFullWidth>
          {filteredMetadataAccounts.map((metadataAccount) => (
            <PlainButton
              key={metadataAccount.mint}
              // For some reason text was getting center aligned in listing card without this
              style={{ textAlign: "left" }}
              onClick={() => setNftToSwapMint(metadataAccount.mint)}
            >
              <ListingCardForMetadata
                disableLink
                metadataAccount={metadataAccount}
              />
            </PlainButton>
          ))}
        </NftGridFullWidth>
      </FlexBox>
    </>
  );
}

function QueryLoaderCreatedAndCollected() {
  const viewerId = useViewerId();
  const queryData = useLazyLoadQuery<CampaignTooniesSwapQuery>(query, {
    // TODO: only show tab for logged in users?
    viewerId: viewerId!,
  });
  const metadataAccounts = [
    ...queryData.metadataAccountsCollected.metadataAccounts.edges,
    ...queryData.metadataAccountsCreated.metadataAccounts.edges,
  ].map(({ node }) => node);

  return <Content metadataAccounts={metadataAccounts} viewerId={viewerId!} />;
}

function DataLoaderSeriesNfts({
  metadataAccountsQueryRef,
}: {
  metadataAccountsQueryRef: PreloadedQuery<useGenerativeSeriesPageMetadataAccountsQuery>;
}) {
  const viewerId = useViewerId();
  const queryData =
    usePreloadedQuery<useGenerativeSeriesPageMetadataAccountsQuery>(
      generativeSeriesMetadataAccountsQuery,
      metadataAccountsQueryRef
    );
  const { data } = usePaginationFragment<
    CampaignTooniesSwapContentPaginationQuery,
    CampaignTooniesSwapContent_Query$key
  >(seriesNftsFragment, queryData);

  return (
    <Content
      metadataAccounts={data.metadataAccountsForExplore.metadataAccounts.edges.map(
        ({ node }) => node
      )}
      viewerId={viewerId!}
    />
  );
}

function QueryLoaderSeriesNfts({ seriesSlug }: { seriesSlug: string }) {
  const { user } = useUserContext();
  const { username } = useParams();
  const metadataAccountsQueryRef = useGenerativeSeriesPageMetadataAccounts(
    null,
    username,
    seriesSlug ?? "",
    user!.id
  );
  if (metadataAccountsQueryRef == null) {
    return null;
  }

  return (
    <DataLoaderSeriesNfts metadataAccountsQueryRef={metadataAccountsQueryRef} />
  );
}

export default function CampaignTooniesSwap() {
  const { campaignSlug } = useParams();
  const {
    campaignsConfig: { campaignsBySlug },
  } = useFlagsTyped();
  const seriesSlug = campaignsBySlug[campaignSlug!].candyMachineSeriesSlug;
  if (seriesSlug == null) {
    // Makes it a little easier to test on local
    return (
      <Suspense
        fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
      >
        <QueryLoaderCreatedAndCollected />;
      </Suspense>
    );
  }

  return (
    <Suspense
      fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
    >
      <GenerativeSeriesContextProvider
        defaultValues={{ availabilitySet: new Set() }}
      >
        <QueryLoaderSeriesNfts seriesSlug={seriesSlug} />
      </GenerativeSeriesContextProvider>
    </Suspense>
  );
}
