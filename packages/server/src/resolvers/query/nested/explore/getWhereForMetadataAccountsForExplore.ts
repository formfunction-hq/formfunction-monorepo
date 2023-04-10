import { Prisma } from "@prisma/client";
import { MaybeUndef, Undef } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import {
  CurrencyNameExpress_Enum,
  ExploreAvailabilityV2,
  ExploreExtra,
  ExploreMarket,
  MetadataAccountsForExploreInput,
  NftKind,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import groupBy from "formfn-shared/dist/utils/array/groupBy";

function isOneOfOneTab(nftKinds: MaybeUndef<Array<NftKind>>) {
  return nftKinds?.includes(NftKind.OneOfOne) ?? false;
}

function isEditionsTab(nftKinds: MaybeUndef<Array<NftKind>>) {
  return (
    (nftKinds?.includes(NftKind.MasterEditionWithNonzeroSupply) ||
      nftKinds?.includes(NftKind.MasterEditionWithUnlimitedSupply)) ??
    false
  );
}

function getAttributesFilter({
  attributes,
}: MetadataAccountsForExploreInput): Prisma.NftWhereInput {
  if (attributes == null || attributes.length === 0) {
    return {};
  }

  const groupedByTraitType = groupBy(
    attributes,
    (attribute) => attribute.traitType
  );

  return {
    AND: Object.keys(groupedByTraitType).map((traitType) => ({
      OR: groupedByTraitType[traitType].map((attribute) => ({
        NftToAttribute: {
          some: {
            Attribute: {
              traitType: attribute.traitType,
              value: attribute.value,
            },
          },
        },
      })),
    })),
  };
}

function getAvailabilitySetFilters({
  availabilitySet: availabilitySetInit,
  nftKind,
}: MetadataAccountsForExploreInput): Array<Prisma.NftWhereInput> {
  const availabilitySet = availabilitySetInit ?? [
    ExploreAvailabilityV2.LiveAuction,
    ExploreAvailabilityV2.ReservePrice,
  ];

  if (availabilitySet.length === 0) {
    return [];
  }

  if (isEditionsTab(nftKind)) {
    const availabilityFilters: Array<Prisma.NftWhereInput> = [];
    if (availabilitySet.includes(ExploreAvailabilityV2.Available)) {
      availabilityFilters.push({
        status: { equals: NftStatusExpress_Enum.ListedEditions },
      });
    }
    if (availabilitySet.includes(ExploreAvailabilityV2.SoldOut)) {
      availabilityFilters.push({
        status: {
          in: [
            NftStatusExpress_Enum.SoldOutEditions,
            NftStatusExpress_Enum.OwnedStoppedMintingForEditions,
          ],
        },
      });
    }

    return availabilityFilters;
  }

  if (isOneOfOneTab(nftKind)) {
    const availabilityFilters: Array<Prisma.NftWhereInput> = [];
    if (availabilitySet.includes(ExploreAvailabilityV2.InstantSale)) {
      availabilityFilters.push({
        status: { equals: NftStatusExpress_Enum.ListedInstantSale },
      });
    }
    if (
      availabilitySet.includes(ExploreAvailabilityV2.LiveAuctionWithBids) &&
      !availabilitySet.includes(ExploreAvailabilityV2.LiveAuctionWithoutBids)
    ) {
      availabilityFilters.push({
        NftListing: {
          auctionEndTime: {
            gt: new Date(),
          },
        },
        NftTransaction: {
          some: {
            // The filter we really want is NftTransaction.auctionCount == Nft.auctionCount.
            // But, Prisma makes it hard to do that, so we filter on timeCreated as an approximation.
            timeCreated: {
              gt: dayjs()
                .subtract(dayjs.duration({ days: 3 }))
                .toDate(),
            },
            type: NftTransactionTypeExpress_Enum.Bid,
          },
        },
        status: {
          in: [NftStatusExpress_Enum.Auction],
        },
      });
    }
    if (
      availabilitySet.includes(ExploreAvailabilityV2.LiveAuctionWithoutBids) &&
      !availabilitySet.includes(ExploreAvailabilityV2.LiveAuctionWithBids)
    ) {
      availabilityFilters.push({
        NftListing: {
          auctionEndTime: {
            gt: new Date(),
          },
        },
        NftTransaction: {
          none: {
            // The filter we really want is NftTransaction.auctionCount == Nft.auctionCount.
            // But, Prisma makes it hard to do that, so we filter on timeCreated as an approximation.
            timeCreated: {
              gt: dayjs()
                .subtract(dayjs.duration({ days: 3 }))
                .toDate(),
            },
            type: NftTransactionTypeExpress_Enum.Bid,
          },
        },
        status: {
          in: [NftStatusExpress_Enum.Auction],
        },
      });
    }
    if (
      availabilitySet.includes(ExploreAvailabilityV2.LiveAuction) ||
      // If both these availability types are included, it's more efficient to use this filter
      (availabilitySet.includes(ExploreAvailabilityV2.LiveAuctionWithBids) &&
        availabilitySet.includes(ExploreAvailabilityV2.LiveAuctionWithoutBids))
    ) {
      availabilityFilters.push({
        NftListing: {
          auctionEndTime: {
            gt: new Date(),
          },
        },
        status: {
          in: [NftStatusExpress_Enum.Auction],
        },
      });
    }
    if (availabilitySet.includes(ExploreAvailabilityV2.ReservePrice)) {
      availabilityFilters.push({
        status: {
          in: [
            NftStatusExpress_Enum.Listed,
            NftStatusExpress_Enum.ListingScheduled,
          ],
        },
      });
    }
    if (availabilitySet.includes(ExploreAvailabilityV2.Sold)) {
      availabilityFilters.push({
        AND: [
          { hasBeenSold: { equals: true } },
          { status: { equals: NftStatusExpress_Enum.Owned } },
        ],
      });
    }

    return availabilityFilters;
  }

  return [];
}

function getContentTypeFilter(
  contentTypes: MaybeUndef<Array<string>>
): Prisma.NftWhereInput {
  if (contentTypes == null || contentTypes.length === 0) {
    return {};
  }

  return {
    NftMetadata: {
      contentType: {
        in: contentTypes,
      },
    },
  };
}

function getExtrasFilter({
  extras,
}: MetadataAccountsForExploreInput): Prisma.NftWhereInput {
  // TODO[@bonham000][Explore]: Change when input is changed to gqlNonNullListOfNonNull.
  const extrasInput = extras ?? [];
  return {
    NftListing: {
      pnftIdForAuction: extrasInput.includes(ExploreExtra.HasPnft)
        ? { not: null }
        : undefined,
      unlockableId: extrasInput.includes(ExploreExtra.HasUnlockable)
        ? { not: null }
        : undefined,
    },
  };
}

function getMarketFilter({
  market,
}: MetadataAccountsForExploreInput): Prisma.NftWhereInput {
  if (
    market.length === Object.keys(ExploreMarket).length ||
    market.length === 0
  ) {
    return {};
  }
  if (market[0] === ExploreMarket.Primary) {
    return {
      hasBeenSold: {
        equals: false,
      },
    };
  }
  return {
    hasBeenSold: {
      equals: true,
    },
  };
}

function getNftKindFilter(nftKind: NftKind): Undef<Prisma.NftWhereInput> {
  switch (nftKind) {
    case NftKind.Generative:
    case NftKind.OneOfOne:
      return {
        isMasterEdition: true,
        isPnft: false,
        maxSupply: 0,
      };
    case NftKind.MasterEditionWithNonzeroSupply:
      return {
        isMasterEdition: true,
        isPnft: false,
        maxSupply: { gt: 0 },
      };
    case NftKind.MasterEditionWithUnlimitedSupply:
      return {
        isMasterEdition: true,
        isPnft: false,
        maxSupply: null,
      };
    case NftKind.PnftMasterEdition:
      return {
        isMasterEdition: true,
        isPnft: true,
      };
    case NftKind.PnftStandardEdition:
      return {
        isMasterEdition: false,
        isPnft: true,
      };
    // TODO[editions]: figure out how to query for these
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.StandardEditionPrintUnlimitedSupply:
      return undefined;
    default:
      return assertUnreachable(nftKind);
  }
}

function getNftKindsFilter({
  nftKind,
}: MetadataAccountsForExploreInput): Prisma.NftWhereInput {
  if (nftKind != null && nftKind.length > 0) {
    const kindFilters = nftKind.map((kind) => getNftKindFilter(kind));
    return {
      OR: filterNulls(kindFilters),
    };
  }

  return {};
}

function getPriceAndCurrencyFilters({
  currencyNames,
  highPriceLamports,
  lowPriceLamports,
}: MetadataAccountsForExploreInput): Prisma.NftWhereInput {
  const priceAndCurrencyFilters: Array<Prisma.NftWhereInput> = [];
  const hasCurrencyNames = currencyNames != null && currencyNames.length > 0;
  if (hasCurrencyNames) {
    priceAndCurrencyFilters.push({
      NftListing: {
        Currency: {
          name: { in: currencyNames as Array<CurrencyNameExpress_Enum> },
        },
      },
    });
  }
  if (hasCurrencyNames && lowPriceLamports != null) {
    priceAndCurrencyFilters.push({
      NftListing: {
        priceInLamports: { gte: lowPriceLamports },
      },
    });
  }
  if (hasCurrencyNames && highPriceLamports != null) {
    priceAndCurrencyFilters.push({
      NftListing: {
        priceInLamports: { lte: highPriceLamports },
      },
    });
  }
  return {
    ...(priceAndCurrencyFilters.length > 0
      ? { AND: priceAndCurrencyFilters }
      : {}),
  };
}

function getSeriesFilter({
  series,
}: MetadataAccountsForExploreInput): Prisma.NftWhereInput {
  if (series == null) {
    return {};
  }

  return {
    Series: {
      User:
        series.creatorUsername == null
          ? undefined
          : {
              username: series.creatorUsername,
            },
      creatorId: series.creatorId ?? undefined,
      slug: series.seriesSlug,
    },
  };
}

function getTagFilter({
  tag,
}: MetadataAccountsForExploreInput): Prisma.NftWhereInput {
  if (tag != null && tag !== "") {
    return {
      NftToTag: {
        some: {
          Tag: {
            value: tag,
          },
        },
      },
    };
  }

  return {};
}

function getOwnerFilter({
  ownerId,
}: MetadataAccountsForExploreInput): Prisma.NftWhereInput {
  if (ownerId != null) {
    return { Owner: { id: ownerId } };
  }

  return {};
}

export default function getWhereForMetadataAccountsForExplore(
  input: MetadataAccountsForExploreInput
): Undef<Prisma.NftWhereInput> {
  const contentTypeFilter = getContentTypeFilter(input.contentTypes);
  const marketFilter = getMarketFilter(input);
  const extraFilter = getExtrasFilter(input);
  const priceFilter = getPriceAndCurrencyFilters(input);
  const tagFilter = getTagFilter(input);
  const kindFilter = getNftKindsFilter(input);
  const availabilityFilters = getAvailabilitySetFilters(input);
  const attributesFilter = getAttributesFilter(input);
  const seriesFilter = getSeriesFilter(input);
  const ownerFilter = getOwnerFilter(input);

  return {
    AND: [
      attributesFilter,
      contentTypeFilter,
      seriesFilter,
      marketFilter,
      extraFilter,
      priceFilter,
      tagFilter,
      kindFilter,
      ownerFilter,
      // Using `OR: []` will filter out everything
      { OR: availabilityFilters.length > 0 ? availabilityFilters : undefined },
    ],
  };
}
