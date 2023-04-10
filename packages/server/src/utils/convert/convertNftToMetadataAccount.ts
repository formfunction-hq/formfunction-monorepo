import Typename from "src/types/enums/Typename";
import convertUser from "src/utils/convert/convertUser";
import {
  MetadataAccount,
  NftDisclosureTypeExpress_Enum,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import parseCreatorsMetadataString from "src/utils/nft/parseCreatorsMetadataString";
import bigintToNumber from "src/utils/bigintToNumber";
import dayjs from "src/utils/dates/dayjsex";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import getEditionPriceInfo from "src/utils/prisma/getEditionPriceInfo";
import getNftCreators from "src/utils/nft/getNftCreators";
import NftSourceType from "src/types/graphql-source/NftSourceType";
import convertUnlockable from "src/utils/convert/convertUnlockable";
import convertPrice from "src/utils/convert/convertPrice";
import convertSeries from "src/utils/convert/convertSeries";
import convertCandyMachine from "src/utils/convert/convertCandyMachine";
import convertAsset from "src/utils/convert/convertAsset";
import invariant from "tiny-invariant";

function getNftStatus(
  nft: ConvertNftToMetadataAccountType
): NftStatusExpress_Enum {
  if (
    nft.status === NftStatusExpress_Enum.ListingScheduled &&
    nft.NftListing?.scheduledAuctionTime != null &&
    dayjs().isSameOrAfter(dayjs(nft.NftListing.scheduledAuctionTime))
  ) {
    // We have a script that updates the status from
    // ListingScheduled -> Auction, but it only runs every minute, so there would be
    // a slight delay if we didn't include this logic here.
    return NftStatusExpress_Enum.Auction;
  }

  return nft.status as NftStatusExpress_Enum;
}

export default function convertNftToMetadataAccount(
  nft: ConvertNftToMetadataAccountType
): MetadataAccount {
  const metadata = nft.NftMetadata;

  const creatorsFromJson =
    parseCreatorsMetadataString(metadata.creators as any) ?? [];

  const {
    PriceLastSoldCurrency: priceLastSoldCurrency,
    NftListing: nftListing,
  } = nft;
  invariant(nftListing != null);
  const {
    antiBotProtectionEnabled,
    auctionDurationInSeconds,
    auctionEndTime,
    isPnftDropActive,
    pnftIdForAuction,
    priceInLamports,
    scheduledAuctionTime,
    timeExtensionDurationInSeconds,
    Currency: nftListingPriceCurrency,
  } = nftListing;

  const nftKind = getNftKind(
    nft.isMasterEdition,
    nft.isPnft,
    nft.maxSupply,
    nft.MasterEditionNft?.maxSupply ?? null,
    nft.Series?.CandyMachine != null
  );
  // For standard editions, return collaborator info from the master edition.
  // This way, we don't have to keep the collaborators of the master edition
  // and standard editions in sync (e.g. if a collaborator approves a request for the master edition,
  // we don't have to update the standard edition collab info). And we also don't have to
  // duplicate the data when creating new standard edition NFTs.
  //
  // The tradeoff is that if someone updates the creator info of a standard edition (e.g. on
  // NFT armory), and not the master edition, then our DB will get out of sync with
  // on-chain info. But this should be exceedingly rare.
  const nftCollaborators = [
    NftKind.StandardEditionPrintNonzeroSupply,
    NftKind.StandardEditionPrintUnlimitedSupply,
  ].includes(nftKind)
    ? nft.MasterEditionNft?.NftToCollaborator ?? []
    : nft.NftToCollaborator;

  const priceNumber =
    nftListing.editionAllowlistEnabled &&
    nftListing.editionAllowlistPrice != null &&
    (nftListing.editionPublicSaleStartTime == null ||
      dayjs().isBefore(dayjs(nftListing.editionPublicSaleStartTime)))
      ? bigintToNumber(nftListing.editionAllowlistPrice)
      : bigintToNumber(priceInLamports);

  const nftExpress: NftSourceType = {
    CandyMachine:
      nft.Series?.CandyMachine == null
        ? null
        : convertCandyMachine(nft.Series.CandyMachine),
    Creator: convertUser(nft.Creator),
    Owner: nft.Owner == null ? null : convertUser(nft.Owner),
    Series: nft.Series == null ? null : convertSeries(nft.Series),
    // We need this for child resolvers (e.g. maxSupplyOfMasterEditionResolver)
    _MasterEditionNft: nft.MasterEditionNft,
    __typename: Typename.Nft as const,
    // We need this for child resolvers (e.g. campaignFundingTierForNftResolver)
    _campaignFundingTierId: nft.campaignFundingTierId,
    antiBotProtectionEnabled,
    auctionCount: nft.auctionCount,
    auctionDurationInSeconds,
    auctionEndTime,
    creatorId: nft.creatorId,
    disclosures: nft.NftDisclosure.map((disclosure) => ({
      __typename: Typename.NftDisclosure as const,
      details: disclosure.details,
      type: disclosure.type as NftDisclosureTypeExpress_Enum,
    })),
    edition: nft.edition,
    editionAllowlistEnabled: nftListing.editionAllowlistEnabled,
    editionAllowlistSaleStartTime: nftListing.editionAllowlistSaleStartTime,
    editionBuyLimitPerAddress: nftListing.editionBuyLimitPerAddress,
    editionPriceInfo: getEditionPriceInfo(nftListing),
    editionPublicSaleStartTime: nftListing.editionPublicSaleStartTime,
    // Make ID unique from id of Nft GraphQL type
    id: `${nft.id}-${Typename.Nft}`,
    // Will get replaced by downstream resolver
    isAirdrop: false,
    isImported: nft.isImported,
    isMasterEdition: nft.isMasterEdition,
    isOffPlatform: false,
    isPnft: nft.isPnft,
    isPnftDropActive,
    masterEditionMint: nft.masterEditionMint,
    maxSupply: nft.maxSupply,
    maxSupplyOfMasterEdition: nft.MasterEditionNft?.maxSupply,
    maxSupplyOnchain: nft.maxSupply,
    mint: nft.mint,
    ownerId: nft.ownerId,
    pnftIdForAuction,
    price: priceNumber,
    priceLastSoldForInLamports: bigintToNumber(nft.priceLastSoldForInLamports),
    priceLastSoldV2: convertPrice(
      bigintToNumber(nft.priceLastSoldForInLamports),
      priceLastSoldCurrency
    ),
    priceV2: convertPrice(priceNumber, nftListingPriceCurrency),
    scheduledAuctionTime,
    seriesRarityRanking: nft.seriesRarityRanking,
    status: getNftStatus(nft),
    tickSizeInfo: {
      __typename: Typename.TickSizeInfo as const,
      tickSizeConstantInLamports: bigintToNumber(
        nftListing.tickSizeConstantInLamports
      ),
    },
    timeCreated: nft.timeCreated,
    timeExtensionDurationInSeconds,
  };

  return {
    __typename: Typename.MetadataAccount as const,
    accountInfo: {
      __typename: Typename.AccountInfo as const,
      executable: false,
      id: metadata.id,
      // TODO: store in DB
      lamports: 0,
      // TODO: this is wrong... but not sure it really matters for now
      owner: nft.ownerId,
      pubkey: metadata.id,
    },
    assetHeight: metadata.assetHeight,
    assetWidth: metadata.assetWidth,
    contentType: metadata.contentType,
    data: {
      __typename: Typename.MetadataAccountData as const,
      // @ts-ignore: we need this for children resolvers (e.g. attributesResolver)
      _mint: nft.mint,
      creators: getNftCreators(creatorsFromJson, nftCollaborators),
      name: metadata.name,
      sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
      symbol: metadata.symbol,
      uri: metadata.uri,
    },
    editionNonce: metadata.editionNonce,
    id: metadata.id,
    isMutable: metadata.isMutable,
    masterEdition: nft.masterEdition,
    mint: nft.mint,
    nft: nftExpress,
    nonstandardAsset:
      metadata.NonstandardAsset == null
        ? null
        : convertAsset(metadata.NonstandardAsset),
    offchainData: {
      __typename: Typename.MetadataOffchain as const,
      _contentType: metadata.contentType,
      _isOffPlatform: false,
      _mint: nft.mint,
      description: metadata.description,
      image: metadata.image,
    },
    primarySaleHappened: nft.hasBeenSold,
    standardEdition: nft.standardEdition,
    timeCreated: nft?.timeCreated,
    unlockable:
      nftListing.Unlockable == null
        ? null
        : convertUnlockable(nftListing.Unlockable),
    updateAuthority: metadata.updateAuthority,
    videoPlaybackId:
      metadata.Video_NftMetadata_videoPlaybackIdToVideo?.status === "ready"
        ? metadata.videoPlaybackId
        : null,
    videoPreviewPlaybackId:
      metadata.Video_NftMetadata_videoPreviewPlaybackIdToVideo?.status ===
      "ready"
        ? metadata.videoPreviewPlaybackId
        : null,
  };
}
