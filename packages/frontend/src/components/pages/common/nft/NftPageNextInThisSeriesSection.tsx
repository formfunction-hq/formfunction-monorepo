import styles from "css/pages/common/nft/NftPageNextInThisSeriesSection.module.css";
import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import ListingCardLoadingSkeleton from "components/auction/ListingCardLoadingSkeleton";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import { NftPageNextInThisSeriesPaginationQuery } from "components/pages/common/nft/__generated__/NftPageNextInThisSeriesPaginationQuery.graphql";
import { NftPageNextInThisSeriesSection_Query$key } from "components/pages/common/nft/__generated__/NftPageNextInThisSeriesSection_Query.graphql";
import { range } from "formfn-shared/dist/utils/range";
import { Suspense } from "react";
import {
  PreloadedQuery,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import Header3 from "components/text/Header3";
import ColorClass from "types/enums/ColorClass";
import MaybeImgix from "components/images/MaybeImgix";
import Imgix from "react-imgix";
import { NftPageNextInThisSeriesSection_SeriesExpress$key } from "components/pages/common/nft/__generated__/NftPageNextInThisSeriesSection_SeriesExpress.graphql";
import FullViewportWidth from "components/containers/FullViewportWidth";
import Body1 from "components/text/Body1";
import { Link } from "react-router-dom";
import { useNftPageNextInThisSeriesQuery } from "hooks/nft-page/__generated__/useNftPageNextInThisSeriesQuery.graphql";
import { nextInThisSeriesQuery } from "hooks/nft-page/useNftPageNextInThisSeries";
import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";
import useNftGridFullWidthColumnCount from "hooks/grids/useNftGridFullWidthColumnCount";

function Header({
  seriesLink,
  seriesPreviewImageAssetSrc,
}: {
  seriesLink: string;
  seriesPreviewImageAssetSrc: string;
}) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <Link to={seriesLink}>
          <MaybeImgix src={seriesPreviewImageAssetSrc}>
            <Imgix
              className={styles.photo}
              src={seriesPreviewImageAssetSrc}
              width={150}
            />
            <img className={styles.photo} src={seriesPreviewImageAssetSrc} />
          </MaybeImgix>
        </Link>
        <Header3 colorClass={ColorClass.DarkPurple}>
          Next in this series
        </Header3>
      </div>
      <div className={styles.headerDivider} />
    </div>
  );
}

const seriesFragment = graphql`
  fragment NftPageNextInThisSeriesSection_SeriesExpress on SeriesExpress {
    id
    slug
    type

    AvatarPhoto {
      id
      photoUrl
    }

    Creator {
      username
    }
  }
`;

const metadataAccountsFragment = graphql`
  fragment NftPageNextInThisSeriesSection_Query on query_root
  @refetchable(queryName: "NftPageNextInThisSeriesPaginationQuery") {
    metadataAccountsForSeries {
      metadataAccounts(after: $after, first: $first, input: $input)
        @connection(key: "NftPage_NextInThisSeriesQuery_metadataAccounts") {
        edges {
          node {
            id

            ...ListingCardForMetadata_MetadataAccount
          }
        }
      }
    }
  }
`;

function Inner({
  metadataAccountsQueryRef,
}: {
  metadataAccountsQueryRef: PreloadedQuery<useNftPageNextInThisSeriesQuery>;
}) {
  const queryData = usePreloadedQuery<useNftPageNextInThisSeriesQuery>(
    nextInThisSeriesQuery,
    metadataAccountsQueryRef
  );
  const count = useNftGridFullWidthColumnCount(1);

  const { data } = usePaginationFragment<
    NftPageNextInThisSeriesPaginationQuery,
    NftPageNextInThisSeriesSection_Query$key
  >(metadataAccountsFragment, queryData);

  if (
    data.metadataAccountsForSeries == null ||
    data.metadataAccountsForSeries.metadataAccounts.edges.length === 0
  ) {
    return (
      <Body1 colorClass={ColorClass.DarkPurple}>
        No other pieces to show right now
      </Body1>
    );
  }
  const itemsToShow =
    data.metadataAccountsForSeries.metadataAccounts.edges.slice(0, count);

  return (
    <>
      {itemsToShow.map(({ node: metadataAccount }) => (
        <ListingCardForMetadata
          key={metadataAccount.id}
          metadataAccount={metadataAccount}
        />
      ))}
    </>
  );
}

type Props = {
  metadataAccountsQueryRef: PreloadedQuery<useNftPageNextInThisSeriesQuery>;
  series: NftPageNextInThisSeriesSection_SeriesExpress$key;
};

export default function NftPageNextInThisSeriesSection({
  metadataAccountsQueryRef,
  series,
}: Props): JSX.Element {
  const data = useFragment(seriesFragment, series);
  const count = useNftGridFullWidthColumnCount(1);

  return (
    <FullViewportWidth>
      <div className={styles.container}>
        <ResponsiveContainer>
          <Header
            seriesLink={getSeriesLinkRelative(
              data.Creator.username,
              data.slug,
              data.type
            )}
            seriesPreviewImageAssetSrc={data.AvatarPhoto.photoUrl}
          />
          <NftGridFullWidth>
            <Suspense
              fallback={range(count).map((i) => (
                <ListingCardLoadingSkeleton key={i} />
              ))}
            >
              <Inner metadataAccountsQueryRef={metadataAccountsQueryRef} />
            </Suspense>
          </NftGridFullWidth>
        </ResponsiveContainer>
      </div>
    </FullViewportWidth>
  );
}
