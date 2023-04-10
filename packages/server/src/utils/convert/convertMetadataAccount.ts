import { Request } from "express";
import axios, { AxiosResponse } from "axios";
import Typename from "src/types/enums/Typename";
import convertNft from "src/utils/convert/convertNft";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  Maybe,
  MetadataAccount,
  RequestStatusExpress_Enum,
} from "src/__generated__/generated";
import getOffPlatformNft from "src/utils/solana/getOffPlatformNft";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { NftToTag, Tag } from "@prisma/client";
import logError from "src/utils/analytics/logError";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import logEvent from "src/utils/analytics/logEvent";
import { Nft as MetaplexNft } from "@metaplex-foundation/js";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import invariant from "tiny-invariant";
import findEditionPda from "formfn-shared/dist/utils/solana/pdas/findEditionPda";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";

function getContentTypeFromOffchainMetadata(metadata: any) {
  const files = metadata.properties?.files;
  if (files == null) {
    return null;
  }

  const types = files.map((file: any) => file.type);

  // There may be multiple files. Prioritize videos, then gifs, then images
  const videoType = types.find((type: string) => type.includes("video"));
  const gifType = types.find((type: string) => type.includes("gif"));
  const imageType = types.find((type: string) => type.includes("image"));

  return videoType ?? gifType ?? imageType;
}

async function getContentTypeFromUri(uri: MaybeUndef<string>) {
  if (uri == null) {
    return null;
  }

  try {
    const head = await axios.head(uri);
    return head.headers["content-type"];
  } catch {
    // swallow
  }

  return null;
}

/**
 * This is slow! Should only be used for off-platform NFTs.
 *
 * We store info of on-platform NFTs in our own DB for perf reasons.
 */
export default async function convertMetadataAccount(
  metadataAccount: MetaplexNft,
  req?: MaybeUndef<Request>
): Promise<Maybe<MetadataAccount>> {
  const prisma = getPrisma();
  let offchain: AxiosResponse;
  let nft: Maybe<
    ConvertNftToMetadataAccountType & {
      NftToTag: Array<NftToTag & { Tag: Tag }>;
    }
  >;

  if (!metadataAccount.uri) {
    logEvent(AnalyticsEvent.ConvertOffPlatformNftInvalidMetadata, req, {
      metadataAccount,
    });

    return null;
  }

  try {
    [offchain, nft] = await Promise.all([
      axios(metadataAccount.uri),
      prisma.nft.findUnique({
        include: {
          ...CONVERT_NFT_TO_METADATA_INCLUDE,
          NftToTag: { include: { Tag: true } },
        },
        where: { id: metadataAccount.address.toString() },
      }),
    ]);
  } catch (err: any) {
    logError(AnalyticsEvent.ConvertOffPlatformNftFail, err, req, {
      metadataAccount,
    });
    return null;
  }

  if (offchain.data.image == null) {
    return null;
  }

  let contentType = getContentTypeFromOffchainMetadata(offchain.data);
  try {
    if (contentType == null) {
      const [animationContentType, imageContentType] = await Promise.all([
        getContentTypeFromUri(offchain.data.animation_url),
        getContentTypeFromUri(offchain.data.image),
      ]);
      contentType = animationContentType ?? imageContentType ?? "image/png";
    }
  } catch {
    // swallow
  }

  const convertedNft =
    nft == null
      ? await getOffPlatformNft(metadataAccount.address)
      : (await convertNft(nft)).nft;
  const accountInfo = await ConnectionWrapper.getAccountInfo(
    metadataAccount.address
  );
  invariant(accountInfo != null);
  const [edition] = await findEditionPda(metadataAccount.address);

  return {
    __typename: Typename.MetadataAccount,
    accountInfo: {
      __typename: Typename.AccountInfo,
      executable: accountInfo.executable,
      id: metadataAccount.address.toString(),
      lamports: accountInfo.lamports,
      owner: accountInfo.owner.toString(),
      pubkey: metadataAccount.address.toString(),
    },
    contentType,
    data: {
      __typename: Typename.MetadataAccountData,
      creators: metadataAccount.creators?.map((creator) => ({
        __typename: Typename.MetadataCreator,
        address: creator.address.toString(),
        share: creator.share,
        status: creator.verified
          ? RequestStatusExpress_Enum.Approved
          : RequestStatusExpress_Enum.Pending,
      })),
      name: metadataAccount.name,
      sellerFeeBasisPoints: metadataAccount.sellerFeeBasisPoints,
      symbol: metadataAccount.symbol,
      uri: metadataAccount.uri,
    },
    editionNonce: metadataAccount.editionNonce,
    id: metadataAccount.address.toString(),
    isMutable: metadataAccount.isMutable,
    masterEdition: edition.toString(),
    mint: metadataAccount.address.toString(),
    nft: convertedNft,
    offchainData: {
      ...offchain.data,
      _contentType: contentType,
      _isOffPlatform: true,
      _mint: metadataAccount.address.toString(),
      image: offchain.data.animation_url ?? offchain.data.image,
    },
    primarySaleHappened: metadataAccount.primarySaleHappened,
    standardEdition: edition.toString(),
    tags: nft == null ? [] : nft.NftToTag.map((val) => val.Tag.value),
    timeCreated: nft?.timeCreated,
    updateAuthority: metadataAccount.updateAuthorityAddress.toString(),
  };
}
