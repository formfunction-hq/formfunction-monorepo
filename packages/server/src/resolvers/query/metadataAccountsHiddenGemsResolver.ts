import { Prisma } from "@prisma/client";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  MetadataAccountsHiddenGemsResponse,
  NftDisclosureTypeExpress_Enum,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import Typename from "src/types/enums/Typename";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import DEFAULT_HIDDEN_GEMS_CONFIG from "src/constants/flags/hiddenGemsConfig";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import dayjs from "src/utils/dates/dayjsex";

export default async function metadataAccountsHiddenGemsResolver(): Promise<MetadataAccountsHiddenGemsResponse> {
  const prisma = getPrisma();
  const { mintAddressList, numberToDisplay } = await getLdFlag(
    LaunchDarklyFlag.HiddenGemsConfig,
    DEFAULT_HIDDEN_GEMS_CONFIG
  );

  const where: Prisma.NftWhereInput = {
    NftDisclosure: { none: { type: NftDisclosureTypeExpress_Enum.Nsfw } },
    hasBeenSold: false,
    isImported: false,
    isMasterEdition: true,
    isPnft: false,
    status: NftStatusExpress_Enum.Listed,
  };

  const totalCount = await prisma.nft.count({
    where: {
      ...where,
      mint: {
        in: mintAddressList,
      },
    },
  });
  // We want to show a different set each day of the week
  const skip = dayjs().day() * numberToDisplay;
  const gems = await prisma.nft.findMany({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    orderBy: { timeCreated: "desc" },
    // Ensure we don't skip too many
    skip: skip > totalCount - numberToDisplay ? 0 : skip,
    take: numberToDisplay,
    where: {
      ...where,
      mint: {
        in: mintAddressList,
      },
    },
  });

  if (gems.length >= numberToDisplay) {
    return {
      __typename: Typename.MetadataAccountsHiddenGemsResponse,
      metadataAccounts: gems.map((nft) => convertNftToMetadataAccount(nft)),
    };
  }

  logError(
    AnalyticsEvent.HiddenGemsQueueEmpty,
    new Error(
      "LaunchDarklyFlag.HiddenGemsConfig mint address list needs to be updated - falling back to db query."
    )
  );

  // If we didn't find enough results using the prepared list, do a general
  // search instead.
  const generalResults = await prisma.nft.findMany({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    orderBy: { timeCreated: "desc" },
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
    __typename: Typename.MetadataAccountsHiddenGemsResponse,
    metadataAccounts: converted.slice(0, numberToDisplay),
  };
}
