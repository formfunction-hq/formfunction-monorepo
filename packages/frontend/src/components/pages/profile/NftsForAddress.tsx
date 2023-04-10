import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import NftGridFullWidth from "components/grids/nft/NftGridFullWidth";
import {
  PreloadedQuery,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import styles from "css/pages/profile/NftsForAddress.module.css";
import {
  NftsForAddress_User$data,
  NftsForAddress_User$key,
} from "components/pages/profile/__generated__/NftsForAddress_User.graphql";
import ProfileCreatorStory from "components/pages/profile/ProfileCreatorStory";
import { ProfilePageForUserMetadataAccountsPaginationQuery } from "components/pages/profile/__generated__/ProfilePageForUserMetadataAccountsPaginationQuery.graphql";
import VideoQuality from "types/enums/VideoQuality";
import ProfileTabType from "types/enums/ProfileTabType";
import { ProfilePageForUserMetadataAccounts_Query$key } from "components/pages/profile/__generated__/ProfilePageForUserMetadataAccounts_Query.graphql";
import {
  nftFragment,
  nftsCollectedAndListedFragment,
  nftsCollectedFragment,
} from "components/pages/profile/ProfilePageForUser";
import ProfileSeries from "components/pages/profile/ProfileSeries";
import ProfileCreatedSection from "components/pages/profile/ProfileCreatedSection";
import groupBy from "formfn-shared/dist/utils/array/groupBy";
import objectSwapKeysAndValues from "formfn-shared/dist/utils/object/objectSwapKeysAndValues";
import invariant from "tiny-invariant";
import { ProfilePageForUserMetadataAccountsCollected_Query$key } from "components/pages/profile/__generated__/ProfilePageForUserMetadataAccountsCollected_Query.graphql";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import flat from "formfn-shared/dist/utils/array/flat";
import objectFromEntries from "formfn-shared/dist/utils/object/objectFromEntries";
import objectEntries from "formfn-shared/dist/utils/object/objectEntries";
import { ProfileSeriesSeries_Query$key } from "components/pages/profile/__generated__/ProfileSeriesSeries_Query.graphql";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import Header3 from "components/text/Header3";
import GiftIcon from "components/icons/GiftIcon";
import ColorValue from "types/enums/ColorValue";
import Body1 from "components/text/Body1";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";
import { useProfilePageMetadataAccountsQuery } from "hooks/profile-page/__generated__/useProfilePageMetadataAccountsQuery.graphql";
import { profilePageMetadataAccountsQuery } from "hooks/profile-page/useProfilePageMetadataAccounts";
import { COLLECTED_TAB_PAGE_SIZE } from "constants/PageSizes";
import { range } from "formfn-shared/dist/utils/range";
import ListingCardLoadingSkeleton from "components/auction/ListingCardLoadingSkeleton";
import {
  NftsForAddress_MetadataAccount$data,
  NftsForAddress_MetadataAccount$key,
} from "components/pages/profile/__generated__/NftsForAddress_MetadataAccount.graphql";
import getSortSeriesBySeriesOrderCompareFn from "utils/series/getSortSeriesBySeriesOrderCompareFn";
import BigToggleButton from "components/buttons/BigToggleButton";
import ComponentSize from "types/enums/ComponentSize";
import useBreakpoint from "hooks/useBreakpoint";
import dayjs from "utils/dates/dayjsex";
import hasAuctionEnded from "utils/hasAuctionEnded";
import NftStatusExpress_enum from "types/relay/NftStatusExpress_enum";
import useCreatedNftsForAddressStatusToggle from "hooks/useCreatedNftsForAddressStatusToggle";
import CreatedNftsForAddressStatusToggle from "types/enums/CreatedNftsForAddressStatusToggle";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";
import useNftGridFullWidthColumnCount from "hooks/grids/useNftGridFullWidthColumnCount";
import ProfileCampaigns from "components/pages/profile/ProfileCampaigns";
import { Suspense } from "react";
import CampaignGridFullWidthLoading from "components/campaign/CampaignGridFullWidthLoading";
import { useProfilePageCreatedCampaignsQuery } from "hooks/profile-page/__generated__/useProfilePageCreatedCampaignsQuery.graphql";
import ProfileCampaignsWhereUserIsActiveSupporter from "components/pages/profile/ProfileCampaignsWhereUserIsActiveSupporter";
import { useProfilePageCampaignsWhereUserIsActiveSupporterQuery } from "hooks/profile-page/__generated__/useProfilePageCampaignsWhereUserIsActiveSupporterQuery.graphql";
import useViewerId from "hooks/useViewerId";
import useCollectedNftsForAddressStatusToggle from "hooks/useCollectedNftsForAddressStatusToggle";
import CollectedNftsForAddressStatusToggle from "types/enums/CollectedNftsForAddressStatusToggle";
import { ProfilePageForUserMetadataAccountsCollectedAndListed_Query$key } from "components/pages/profile/__generated__/ProfilePageForUserMetadataAccountsCollectedAndListed_Query.graphql";

const SERIES_ID_DELIMITER = "_";
const BUY_NOW_STATUSES: Array<NftStatusExpress_enum> = [
  "ListedEditions",
  "ListedInstantSale",
];

const CREATED_STATUS_TOGGLE_TO_NUMBER = {
  [CreatedNftsForAddressStatusToggle.All]: 0,
  [CreatedNftsForAddressStatusToggle.Auction]: 1,
  [CreatedNftsForAddressStatusToggle.BuyNow]: 2,
};
const CREATED_NUMBER_TO_STATUS_TOGGLE = objectSwapKeysAndValues(
  CREATED_STATUS_TOGGLE_TO_NUMBER
);

const COLLECTED_STATUS_TOGGLE_TO_NUMBER = {
  [CollectedNftsForAddressStatusToggle.All]: 0,
  [CollectedNftsForAddressStatusToggle.Listed]: 1,
};
const COLLECTED_NUMBER_TO_STATUS_TOGGLE = objectSwapKeysAndValues(
  COLLECTED_STATUS_TOGGLE_TO_NUMBER
);

const metadataAccountFragment = graphql`
  fragment NftsForAddress_MetadataAccount on MetadataAccount
  @relay(plural: true) {
    id

    # eslint-disable-next-line relay/unused-fields
    nft {
      auctionEndTime
      creatorId
      isMasterEdition
      isAirdrop
      isPnft
      mint
      ownerId
      status

      Series {
        id
        mint
        slug
        name
        nftOrder
        type
      }
    }

    ...ListingCardForMetadata_MetadataAccount
  }
`;

const fragment = graphql`
  fragment NftsForAddress_User on User {
    id
    displayName
    username
    # eslint-disable-next-line relay/unused-fields
    seriesOrder

    CreatorStory {
      id
    }

    ...ProfileCreatorStory_User
    ...ProfileSeries_User
  }
`;

function shouldShowInGiftedNftsSection(
  nft: NftsForAddress_MetadataAccount$data[number]
) {
  const {
    nft: { isAirdrop, isPnft },
  } = nft;

  return isAirdrop || isPnft;
}

function getPnftSectionLabel(
  tab: ProfileTabType,
  userData: NftsForAddress_User$data
) {
  const username = !isEmptyString(userData.displayName)
    ? userData.displayName!
    : userData.username;
  switch (tab) {
    case ProfileTabType.Created:
      return `These NFTs were gifted by ${username} to their supporters or bidders of their auctions`;
    case ProfileTabType.Collected:
      return `These NFTs were gifted to ${username} for being a supporter of various NFTs and campaigns or by participating in certain auctions`;
    case ProfileTabType.Campaigns:
    case ProfileTabType.CampaignsWhereUserIsActiveSupporter:
    case ProfileTabType.CreatorStory:
    case ProfileTabType.Series:
      return null;
    default:
      return assertUnreachable(tab);
  }
}

function getSeriesMintFromKey(seriesKey: string) {
  const [mint, _key] = seriesKey.split(SERIES_ID_DELIMITER);
  return mint;
}

function getSeriesNameFromKey(seriesKey: string) {
  const [_mint, ...key] = seriesKey.split(SERIES_ID_DELIMITER);
  return key.join(SERIES_ID_DELIMITER);
}

function getSortedNftsForSeries(accounts: NftsForAddress_MetadataAccount$data) {
  invariant(accounts.length > 0, "Each entry should have non-zero accounts");
  const order = accounts[0]!.nft.Series?.nftOrder as Array<string>;
  if (order == null) {
    return accounts;
  }

  const orderAsObject = objectFromEntries(order.map((mint, i) => [mint, i]));
  return [...accounts].sort(
    (a, b) => orderAsObject[a.nft.mint] - orderAsObject[b.nft.mint]
  );
}

function metadataAccountsForTab(
  data: NftsForAddress_MetadataAccount$data,
  collectedData: NftsForAddress_MetadataAccount$data,
  collectedAndListedData: NftsForAddress_MetadataAccount$data,
  tab: ProfileTabType,
  createdStatusToggle: CreatedNftsForAddressStatusToggle,
  collectedStatusToggle: CollectedNftsForAddressStatusToggle
) {
  if (tab === ProfileTabType.Created) {
    switch (createdStatusToggle) {
      case CreatedNftsForAddressStatusToggle.All:
        return data;
      case CreatedNftsForAddressStatusToggle.Auction:
        return data.filter(
          ({ nft }) =>
            nft.status === "Auction" &&
            nft.auctionEndTime != null &&
            !hasAuctionEnded(dayjs(nft.auctionEndTime))
        );
      case CreatedNftsForAddressStatusToggle.BuyNow:
        return data.filter(({ nft }) => BUY_NOW_STATUSES.includes(nft.status));
      default:
        return assertUnreachable(createdStatusToggle);
    }
  }

  if (tab === ProfileTabType.Collected) {
    switch (collectedStatusToggle) {
      case CollectedNftsForAddressStatusToggle.All:
        return collectedData;
      case CollectedNftsForAddressStatusToggle.Listed:
        return collectedAndListedData;
      default:
        return assertUnreachable(collectedStatusToggle);
    }
  }

  return [];
}

type Props = {
  createdCampaignsQueryRef: PreloadedQuery<useProfilePageCreatedCampaignsQuery>;
  nftQueryRef: PreloadedQuery<useProfilePageMetadataAccountsQuery>;
  series: ProfileSeriesSeries_Query$key;
  supportedCampaignsQueryRef: PreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>;
  tab: ProfileTabType;
  user: NftsForAddress_User$key;
};

function Inner({
  createdCampaignsQueryRef,
  metadataAccounts,
  metadataAccountsCollected,
  metadataAccountsCollectedAndListed,
  series,
  supportedCampaignsQueryRef,
  tab,
  user,
  isLoadingNextCollected,
  isLoadingNextCollectedAndListed,
  totalCountCollected,
  totalCountCollectedAndListed,
}: {
  createdCampaignsQueryRef: PreloadedQuery<useProfilePageCreatedCampaignsQuery>;
  isLoadingNextCollected: boolean;
  isLoadingNextCollectedAndListed: boolean;
  metadataAccounts: NftsForAddress_MetadataAccount$key;
  metadataAccountsCollected: NftsForAddress_MetadataAccount$key;
  metadataAccountsCollectedAndListed: NftsForAddress_MetadataAccount$key;
  series: ProfileSeriesSeries_Query$key;
  supportedCampaignsQueryRef: PreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>;
  tab: ProfileTabType;
  totalCountCollected: number;
  totalCountCollectedAndListed: number;
  user: NftsForAddress_User$key;
}): JSX.Element {
  const viewerId = useViewerId();
  const numNftsForGenerative = useNftGridFullWidthColumnCount(2);
  const userData = useFragment(fragment, user);
  const [createdStatusToggle, setCreatedStatusToggle] =
    useCreatedNftsForAddressStatusToggle();
  const [collectedStatusToggle, setCollectedStatusToggle] =
    useCollectedNftsForAddressStatusToggle();
  const { isMobileBreakpoint } = useBreakpoint();
  const metadataAccountsData = useFragment(
    metadataAccountFragment,
    metadataAccounts
  );
  const metadataAccountsCollectedData = useFragment(
    metadataAccountFragment,
    metadataAccountsCollected
  );
  const metadataAccountsCollectedAndListedData = useFragment(
    metadataAccountFragment,
    metadataAccountsCollectedAndListed
  );
  const numAllCreated = metadataAccountsData.length;
  const numAuction = metadataAccountsData.filter(
    ({ nft }) =>
      nft.status === "Auction" &&
      nft.auctionEndTime != null &&
      !hasAuctionEnded(dayjs(nft.auctionEndTime))
  ).length;

  const numBuyNow = metadataAccountsData.filter(({ nft }) =>
    BUY_NOW_STATUSES.includes(nft.status)
  ).length;

  const userIdForFilter = userData.id;
  const accounts = metadataAccountsForTab(
    metadataAccountsData,
    metadataAccountsCollectedData,
    metadataAccountsCollectedAndListedData,
    tab,
    createdStatusToggle,
    collectedStatusToggle
  );
  const accountsBySeries =
    tab === ProfileTabType.Created
      ? groupBy([...accounts], (account) => {
          if (
            account.nft.Series == null ||
            // We don't want to show collabs as series
            account.nft.creatorId !== userData.id
          ) {
            return null;
          }
          // Include name in the grouping key for sorting purposes
          return `${account.nft.Series.mint}_${account.nft.Series.name}`;
        })
      : {};
  const accountsInSeries = new Set(
    flat(objectEntries(accountsBySeries).map((val) => val[1])).map(
      (val) => val.id
    )
  );
  const collabAccounts =
    tab === ProfileTabType.Created
      ? accounts.filter((node) => node.nft.creatorId !== userData.id)
      : [];
  const accountsNotInSections = accounts.filter(
    (node) =>
      !shouldShowInGiftedNftsSection(node) &&
      !accountsInSeries.has(node.id) &&
      collabAccounts.find(({ id }) => id === node.id) == null
  );
  const airdropsAndPnftsToShowForTab = accounts.filter((node) => {
    const { isMasterEdition, creatorId, ownerId } = node.nft;
    if (!shouldShowInGiftedNftsSection(node)) {
      return false;
    }

    switch (tab) {
      case ProfileTabType.Collected:
        return !isMasterEdition && ownerId === userIdForFilter;
      case ProfileTabType.Created:
        return isMasterEdition && creatorId === userIdForFilter;
      case ProfileTabType.Campaigns:
      case ProfileTabType.CampaignsWhereUserIsActiveSupporter:
      case ProfileTabType.CreatorStory:
      case ProfileTabType.Series:
        return false;
      default:
        return assertUnreachable(tab);
    }
  });

  // This logic makes the assumption that ALL profile NFTs are loaded at once, without pagination.
  // Given that we don't currently paginate profile NFTs, doing the grouping of
  // series sections client-side is sufficient. When we do implement pagination, we will
  // need to revisit this.
  const orderAsObject = objectFromEntries(
    (userData.seriesOrder as Array<string>).map((mint, i) => [mint, i])
  );
  const seriesSection = objectEntries<string>(accountsBySeries)
    .sort(
      getSortSeriesBySeriesOrderCompareFn(
        (i) => orderAsObject[getSeriesMintFromKey(i[0])],
        (i) => getSeriesNameFromKey(i[0])
      )
    )
    .map((val, i) => {
      const seriesKey = val[0];
      const seriesId = seriesKey.split(SERIES_ID_DELIMITER)[0];
      const accountsInner = getSortedNftsForSeries(val[1]);
      const seriesInner = accountsInner[0].nft.Series!;
      invariant(
        accountsInner.length > 0,
        "Each entry should have non-zero accounts"
      );
      return (
        <ProfileCreatedSection
          key={seriesId}
          accounts={
            seriesInner.type === "GenerativeMint"
              ? accountsInner.slice(0, numNftsForGenerative)
              : accountsInner
          }
          href={getSeriesLinkRelative(
            userData.username,
            seriesInner.slug,
            // @ts-ignore
            seriesInner.type
          )}
          label="View series"
          name={seriesInner.name}
          showDivider={!(i === 0 && accountsNotInSections.length === 0)}
        />
      );
    });

  const airdropsAndPnfts = (
    <NftGridFullWidth>
      {airdropsAndPnftsToShowForTab.map((node) => (
        <ListingCardForMetadata
          key={node.id}
          metadataAccount={node}
          desiredVideoQuality={VideoQuality.X2}
        />
      ))}
    </NftGridFullWidth>
  );

  const airdropsAndPnftSection = airdropsAndPnftsToShowForTab.length > 0 && (
    <div className={styles.pnfts}>
      <div
        className={
          [accountsNotInSections, seriesSection, collabAccounts].some(
            (section) => section.length > 0
          )
            ? styles.divider
            : undefined
        }
      />
      <Header3 colorClass={ColorClass.Primary}>
        <GiftIcon size={24} colorValue={ColorValue.Primary} /> Airdrops and
        Participation NFTs
      </Header3>
      <Body1 className={styles.pnftSubtitle} colorClass={ColorClass.Secondary}>
        {getPnftSectionLabel(tab, userData)}
      </Body1>
      {airdropsAndPnfts}
    </div>
  );

  const onPlatform = (
    <>
      <NftGridFullWidth>
        {accountsNotInSections.map((node) => (
          <ListingCardForMetadata
            key={node.id}
            metadataAccount={node}
            desiredVideoQuality={VideoQuality.X2}
          />
        ))}
        {tab === ProfileTabType.Collected &&
          ((isLoadingNextCollected &&
            collectedStatusToggle ===
              CollectedNftsForAddressStatusToggle.All) ||
            (isLoadingNextCollectedAndListed &&
              collectedStatusToggle ===
                CollectedNftsForAddressStatusToggle.Listed)) &&
          range(COLLECTED_TAB_PAGE_SIZE).map((val) => (
            <ListingCardLoadingSkeleton key={val} />
          ))}
      </NftGridFullWidth>
      {seriesSection}
      {collabAccounts.length > 0 && (
        <ProfileCreatedSection
          accounts={collabAccounts}
          name="Collabs"
          showDivider={[accountsNotInSections, seriesSection].some(
            (section) => section.length > 0
          )}
        />
      )}
      {airdropsAndPnftSection}
    </>
  );

  const content = {
    [ProfileTabType.Created]: onPlatform,
    [ProfileTabType.Collected]: (
      <>
        {onPlatform}
        <Body2
          className={
            [accountsNotInSections, airdropsAndPnftsToShowForTab].some(
              (section) => section.length > 0
            )
              ? styles.collectionDescription
              : undefined
          }
          colorClass={ColorClass.Secondary}
          textAlign="center"
        >
          This tab shows every piece that{" "}
          {!isEmptyString(userData.displayName)
            ? userData.displayName!
            : userData.username}{" "}
          has collected on Formfunction, including pieces that were later
          transferred or sold.
        </Body2>
      </>
    ),
    [ProfileTabType.Campaigns]: (
      <Suspense fallback={<CampaignGridFullWidthLoading />}>
        <ProfileCampaigns
          createdCampaignsQueryRef={createdCampaignsQueryRef}
          isViewingOwnProfile={viewerId === userData.id && viewerId != null}
          profileUsername={userData.username}
        />
      </Suspense>
    ),
    [ProfileTabType.CampaignsWhereUserIsActiveSupporter]: (
      <Suspense fallback={<CampaignGridFullWidthLoading />}>
        <ProfileCampaignsWhereUserIsActiveSupporter
          isViewingOwnProfile={viewerId === userData.id && viewerId != null}
          profileUsername={userData.username}
          supportedCampaignsQueryRef={supportedCampaignsQueryRef}
        />
      </Suspense>
    ),
    [ProfileTabType.CreatorStory]: <ProfileCreatorStory user={userData} />,
    [ProfileTabType.Series]: <ProfileSeries user={userData} series={series} />,
  };

  return (
    <div className={styles.gridContainer}>
      {tab === ProfileTabType.Created && (
        <div className={styles.createdBigToggle}>
          <BigToggleButton
            labels={[
              <div>
                All&nbsp;&nbsp;
                <span className={ColorClass.Ghost}>{numAllCreated}</span>
              </div>,
              <div>
                {isMobileBreakpoint ? "Auction" : "Live Auction"}&nbsp;&nbsp;
                <span className={ColorClass.Ghost}>{numAuction}</span>
              </div>,
              <div>
                Buy Now&nbsp;&nbsp;
                <span className={ColorClass.Ghost}>{numBuyNow}</span>
              </div>,
            ]}
            onToggle={(val) =>
              setCreatedStatusToggle(CREATED_NUMBER_TO_STATUS_TOGGLE[val])
            }
            position={CREATED_STATUS_TOGGLE_TO_NUMBER[createdStatusToggle]}
            size={ComponentSize.Small}
          />
        </div>
      )}
      {tab === ProfileTabType.Collected && (
        <div className={styles.collectedBigToggle}>
          <BigToggleButton
            labels={[
              <div>
                All&nbsp;&nbsp;
                <span className={ColorClass.Ghost}>{totalCountCollected}</span>
              </div>,
              <div>
                {isMobileBreakpoint ? "Listed" : "Listed By User"}&nbsp;&nbsp;
                <span className={ColorClass.Ghost}>
                  {totalCountCollectedAndListed}
                </span>
              </div>,
            ]}
            onToggle={(val) => {
              setCollectedStatusToggle(COLLECTED_NUMBER_TO_STATUS_TOGGLE[val]);
            }}
            position={COLLECTED_STATUS_TOGGLE_TO_NUMBER[collectedStatusToggle]}
            size={ComponentSize.Small}
          />
        </div>
      )}
      <div>{content[tab]}</div>
    </div>
  );
}

export default function NftsForAddress({
  createdCampaignsQueryRef,
  nftQueryRef,
  tab,
  user,
  series,
  supportedCampaignsQueryRef,
}: Props): JSX.Element {
  const metadataAccountsPreloadedQuery =
    usePreloadedQuery<useProfilePageMetadataAccountsQuery>(
      profilePageMetadataAccountsQuery,
      nftQueryRef
    );
  const { data } = usePaginationFragment<
    ProfilePageForUserMetadataAccountsPaginationQuery,
    ProfilePageForUserMetadataAccounts_Query$key
  >(nftFragment, metadataAccountsPreloadedQuery);
  const {
    data: metadataAccountsCollectedData,
    hasNext: hasNextCollected,
    isLoadingNext: isLoadingNextCollected,
    loadNext: loadNextCollected,
  } = usePaginationFragment<
    useProfilePageMetadataAccountsQuery,
    ProfilePageForUserMetadataAccountsCollected_Query$key
  >(nftsCollectedFragment, metadataAccountsPreloadedQuery);
  const {
    data: metadataAccountsCollectedAndListedData,
    hasNext: hasNextCollectedAndListed,
    isLoadingNext: isLoadingNextCollectedAndListed,
    loadNext: loadNextCollectedAndListed,
  } = usePaginationFragment<
    useProfilePageMetadataAccountsQuery,
    ProfilePageForUserMetadataAccountsCollectedAndListed_Query$key
  >(nftsCollectedAndListedFragment, metadataAccountsPreloadedQuery);
  const totalCountCollected =
    metadataAccountsCollectedData.metadataAccountsCollected.metadataAccounts
      .totalCount;
  const totalCountCollectedAndListed =
    metadataAccountsCollectedAndListedData.metadataAccountsCollected
      .metadataAccountsListedByUser.totalCount;

  // Note: this will load next even if the user has not enabled the "All" toggle
  useLoadNextOnBottomScroll(
    hasNextCollected &&
      !isLoadingNextCollected &&
      tab === ProfileTabType.Collected,
    loadNextCollected,
    COLLECTED_TAB_PAGE_SIZE
  );
  // Note: this will load next even if the user has not enabled the "Listed by user" toggle
  useLoadNextOnBottomScroll(
    hasNextCollectedAndListed &&
      !isLoadingNextCollectedAndListed &&
      tab === ProfileTabType.Collected,
    loadNextCollectedAndListed,
    COLLECTED_TAB_PAGE_SIZE
  );

  return (
    <Inner
      createdCampaignsQueryRef={createdCampaignsQueryRef}
      metadataAccounts={data.metadataAccountsCreated.metadataAccounts.edges.map(
        ({ node }) => node
      )}
      metadataAccountsCollectedAndListed={metadataAccountsCollectedAndListedData.metadataAccountsCollected.metadataAccountsListedByUser.edges.map(
        ({ node }) => node
      )}
      metadataAccountsCollected={metadataAccountsCollectedData.metadataAccountsCollected.metadataAccounts.edges.map(
        ({ node }) => node
      )}
      user={user}
      series={series}
      supportedCampaignsQueryRef={supportedCampaignsQueryRef}
      isLoadingNextCollected={isLoadingNextCollected}
      isLoadingNextCollectedAndListed={isLoadingNextCollectedAndListed}
      tab={tab}
      totalCountCollected={totalCountCollected}
      totalCountCollectedAndListed={totalCountCollectedAndListed}
    />
  );
}
