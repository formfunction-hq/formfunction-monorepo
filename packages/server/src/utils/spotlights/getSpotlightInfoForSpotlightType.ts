import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import SpotlightType from "src/types/enums/SpotlightType";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  AssetExpress,
  SpotlightExpressStatus_Enum,
  SpotlightInfo,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import getAssetCdnUrl from "formfn-shared/dist/utils/getAssetCdnUrl";
import getImgixUrl from "src/utils/getImgixUrl";
import getSpotlightStatusForNftStatus from "src/utils/spotlights/getSpotlightStatusForNftStatus";
import getSpotlightLabelForNftKind from "src/utils/spotlights/getSpotlightLabelForNftKind";
import CONVERT_SERIES_INCLUDE from "src/constants/include/ConvertSeriesInclude";
import getContentTypeFromFilename from "formfn-shared/dist/utils/getContentTypeFromFilename";
import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";
import convertUser from "src/utils/convert/convertUser";

const EMPTY_RESPONSE = {
  asset: {
    contentType: "",
    downloadUrl: "",
    id: "",
    path: "",
  },
  description: "",
  label: "",
  status: SpotlightExpressStatus_Enum.Override,
  statusOverride: null,
  title: "",
  url: "",
  users: [],
};

async function getSpotlightInfoForNft(objectId: string) {
  const prisma = getPrisma();
  const nft = await prisma.nft.findFirst({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    where: { id: objectId },
  });
  if (nft == null) {
    return EMPTY_RESPONSE;
  }
  const nftKind = getNftKind(
    nft.isMasterEdition,
    nft.isPnft,
    nft.maxSupply,
    nft.MasterEditionNft?.maxSupply ?? null,
    nft.Series?.CandyMachine != null
  );
  const nftStatus = nft.status as NftStatusExpress_Enum;

  return {
    asset: {
      contentType: nft.NftMetadata.contentType,
      downloadUrl: nft.NftMetadata.contentType.includes("video")
        ? getAssetCdnUrl(nft.NftMetadata.image)
        : getImgixUrl(nft.NftMetadata.image),
      id: nft.NftMetadata.image,
      path: nft.NftMetadata.image,
    },
    description: nft.NftMetadata.description,
    label: getSpotlightLabelForNftKind(nftKind),
    status: nft.hasBeenSold
      ? SpotlightExpressStatus_Enum.Sold
      : getSpotlightStatusForNftStatus(nftStatus),
    title: nft.NftMetadata.name,
    url: getNftLinkRelative(
      nft.Owner.username,
      nft.mint,
      nft.NftMetadata.assetWidth,
      nft.NftMetadata.assetHeight
    ),
    users: [convertUser(nft.Creator)],
  };
}

async function getSpotlightInfoForSeries(objectId: string) {
  const prisma = getPrisma();
  const series = await prisma.series.findFirst({
    include: CONVERT_SERIES_INCLUDE,
    where: { id: objectId },
  });
  if (series == null) {
    return EMPTY_RESPONSE;
  }
  const seriesAssetPath = series.Photo_PhotoToSeries_avatarPhotoId.storagePath!;

  return {
    asset: {
      contentType: getContentTypeFromFilename(seriesAssetPath),
      downloadUrl: getImgixUrl(seriesAssetPath),
      id: seriesAssetPath,
      path: seriesAssetPath,
    },
    description: series.description,
    label: "Series Spotlight",
    // We don't want to show a status for Series unless there's an override.
    // If there is no override, statusOverride will be null and we will not show it
    status: SpotlightExpressStatus_Enum.Override,
    title: series.name,
    url: getSeriesLinkRelative(series.User.username, series.slug),
    users: [convertUser(series.User)],
  };
}

export default async function getSpotlightInfoForSpotlightType(
  type: SpotlightType,
  objectId: string
): Promise<
  // Just removing "__typename"s to make the return types a bit cleaner
  Omit<SpotlightInfo, "__typename" | "asset"> & {
    asset: Omit<AssetExpress, "__typename">;
  }
> {
  switch (type) {
    case SpotlightType.Nft:
      return getSpotlightInfoForNft(objectId);
    case SpotlightType.Series:
      return getSpotlightInfoForSeries(objectId);
    case SpotlightType.Campaign:
    case SpotlightType.Adhoc:
    case SpotlightType.Merchandise:
      return EMPTY_RESPONSE;
    default:
      return assertUnreachable(type);
  }
}
