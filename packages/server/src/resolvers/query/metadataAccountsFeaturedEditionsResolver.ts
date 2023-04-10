import { Prisma } from "@prisma/client";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  MetadataAccountsFeaturedEditionsResponse,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import Typename from "src/types/enums/Typename";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import DEFAULT_FEATURED_EDITIONS_CONFIG from "src/constants/flags/featuredEditionsConfig";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";

export default async function metadataAccountsFeaturedEditionsResolver(): Promise<MetadataAccountsFeaturedEditionsResponse> {
  const prisma = getPrisma();
  const { mintAddressList, numberToDisplay } = await getLdFlag(
    LaunchDarklyFlag.FeaturedEditionsConfig,
    DEFAULT_FEATURED_EDITIONS_CONFIG
  );

  const where: Prisma.NftWhereInput = {
    OR: [{ maxSupply: null }, { maxSupply: { gt: 0 } }],
    hasBeenSold: false,
    isImported: false,
    isMasterEdition: true,
    isPnft: false,
    status: {
      in: [
        NftStatusExpress_Enum.ListedEditions,
        NftStatusExpress_Enum.Owned,
        NftStatusExpress_Enum.OwnedStoppedMintingForEditions,
        NftStatusExpress_Enum.SoldOutEditions,
      ],
    },
  };

  const orderBy: Prisma.Enumerable<Prisma.NftOrderByWithRelationInput> = [
    { status: "asc" },
    { timeCreated: "desc" },
  ];

  const featuredEditions = await prisma.nft.findMany({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    orderBy,
    take: numberToDisplay,
    where: {
      ...where,
      mint: {
        in: mintAddressList,
      },
    },
  });

  if (featuredEditions.length >= numberToDisplay) {
    return {
      __typename: Typename.MetadataAccountsFeaturedEditionsResponse,
      metadataAccounts: featuredEditions.map((nft) =>
        convertNftToMetadataAccount(nft)
      ),
    };
  }

  logError(
    AnalyticsEvent.FeaturedEditionsQueueEmpty,
    new Error(
      "LaunchDarklyFlag.FeaturedEditionsConfig mint address list needs to be updated - falling back to db query."
    )
  );

  // If we didn't find enough results using the prepared list, do a general
  // search instead.
  const generalResults = await prisma.nft.findMany({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    orderBy,
    // Take more to avoid duplicate creator NFTs.
    take: 40,
    where,
  });

  const uniqueByUser = removeDuplicatesWithComparison(
    generalResults,
    (val1, val2) => val1.creatorId === val2.creatorId
  );
  const converted = uniqueByUser.map((nft) => convertNftToMetadataAccount(nft));
  return {
    __typename: Typename.MetadataAccountsFeaturedEditionsResponse,
    metadataAccounts: converted.slice(0, numberToDisplay),
  };
}
