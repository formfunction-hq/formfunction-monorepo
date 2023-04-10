import getPrisma from "src/utils/prisma/getPrisma";
import axios from "axios";
import arraysEqual from "formfn-shared/dist/utils/array/arraysEqual";
import getSyncNftToCollaboratorQueries from "src/utils/prisma/getSyncNftToCollaboratorQueries";
import uploadFileFromUrl from "src/utils/firebase/uploadFileFromUrl";
import { nanoid } from "nanoid";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import DEFAULT_MAX_FILE_SIZE_FOR_MINT from "formfn-shared/dist/constants/DefaultMaxFileSizeForMint";
import getContentTypeFromExt from "formfn-shared/dist/utils/getContentTypeFromExt";
import {
  Attribute,
  Nft,
  NftMetadata,
  NftToAttribute,
  NftToCollaborator,
  Prisma,
  PrismaPromise,
  Request,
} from "@prisma/client";
import { RequestStatusExpress_Enum } from "src/__generated__/generated";
import parseCreatorsMetadataString from "src/utils/nft/parseCreatorsMetadataString";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";
import CreatorOnchain from "src/types/CreatorOnchain";
import getFileExtFromContentType from "src/utils/getFileExtFromContentType";
import fetchOffchainMetadata from "src/utils/nft/fetchOffchainMetadata";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";

type PrismaNftToCollaborator = NftToCollaborator & {
  Request: Maybe<Request>;
};

type PrismaMetadataWithIncludes = NftMetadata & {
  Nft: Maybe<
    Nft & {
      NftToAttribute: Array<
        NftToAttribute & {
          Attribute: Attribute;
        }
      >;
      NftToCollaborator: Array<PrismaNftToCollaborator>;
    }
  >;
};

export const SYNC_NFT_METADATA_INCLUDE = {
  Nft: {
    include: {
      NftToAttribute: {
        include: {
          Attribute: true,
        },
      },
      NftToCollaborator: {
        include: {
          Request: true,
        },
      },
    },
  },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.NftMetadataInclude;

export enum SyncStatus {
  OutOfSync = "out-of-sync",
  Synced = "synced",
}

export type SyncNftResult = {
  error: any;
  mint: string;
  statuses?: {
    creators: SyncStatus;
    name: SyncStatus;
    offchainMetadata: SyncStatus;
  };
};

function updateNftMetadata(
  mint: string,
  data: Prisma.NftMetadataUpdateInput
): PrismaPromise<NftMetadata> {
  return getPrisma().nftMetadata.update({ data, where: { mint } });
}

function areCreatorsListsEqual(
  prismaCreators: Array<{ address: string; share: number; verified: boolean }>,
  onchainCreators: Array<CreatorOnchain>
): boolean {
  const prismaAddresses = prismaCreators.map((val) => val.address).sort();
  const onchainAddresses = onchainCreators.map((val) => val.address).sort();

  if (!arraysEqual(prismaAddresses, onchainAddresses)) {
    return false;
  }

  return prismaAddresses.every((address: string) => {
    const prismaCreator = prismaCreators.find(
      (val) => val.address === address
    )!;
    const onchainCreator = onchainCreators.find(
      (val) => val.address === address
    )!;

    return (
      prismaCreator.share === onchainCreator.share &&
      (Number(prismaCreator.verified) === Number(onchainCreator.verified) ||
        // If our DB says a collaborator is NOT verified but they are verified onchain,
        // we still consider the situation to be "in-sync". This is because someone may verify
        // a collaborator off-platform, which is different than them verifying a collaborator on Formfunction
        // (e.g. if they verify off-platform, they may not intended for the collaborator to show up on Formfunction's
        // UI).
        !prismaCreator.verified)
    );
  });
}

function isNftNameSynced(input: {
  dbName: string;
  onchainName: string;
}): SyncStatus {
  const { dbName, onchainName } = input;
  const isInSync = onchainName === dbName;
  return isInSync ? SyncStatus.Synced : SyncStatus.OutOfSync;
}

function isNftOffchainMetadataSynced(input: {
  dbUri: string;
  onchainUri: string;
}): SyncStatus {
  const { dbUri, onchainUri } = input;
  const isInSync = dbUri === onchainUri;
  return isInSync ? SyncStatus.Synced : SyncStatus.OutOfSync;
}

function areNftCreatorsSynced(input: {
  dbCollaborators: Array<PrismaNftToCollaborator>;
  dbCreators: Prisma.JsonValue;
  dbNftCreatorAddress: string;
  onchainCreators: Maybe<Array<CreatorOnchain>>;
}): SyncStatus {
  const { onchainCreators, dbCreators, dbNftCreatorAddress, dbCollaborators } =
    input;
  if (onchainCreators == null) {
    // We don't want to wipe all creators so don't sync cases like these
    return SyncStatus.Synced;
  }
  const collaborators = dbCollaborators.map((collaborator: any) => ({
    address: collaborator.collaboratorId,
    share: collaborator.share,
    verified:
      collaborator.Request?.status === RequestStatusExpress_Enum.Approved ||
      collaborator.collaboratorId === dbNftCreatorAddress,
  }));

  const isInSync =
    areCreatorsListsEqual(
      parseCreatorsMetadataString(dbCreators?.toString() ?? "") ?? [],
      onchainCreators
    ) && areCreatorsListsEqual(collaborators, onchainCreators);
  return isInSync ? SyncStatus.Synced : SyncStatus.OutOfSync;
}

function getSyncNftNameDbQuery(input: {
  dbName: string;
  mint: string;
  onchainName: string;
}): PrismaPromise<NftMetadata> {
  const { onchainName, mint } = input;

  return updateNftMetadata(mint, { name: onchainName });
}

async function getSyncNftOffchainMetadataQueries(input: {
  dbMetadata: PrismaMetadataWithIncludes;
  dbUri: string;
  onchainUri: string;
}): Promise<{
  error: Maybe<string>;
  queries: Array<PrismaPromise<any>>;
}> {
  const {
    dbUri,
    onchainUri,
    dbMetadata: { mint },
  } = input;
  const [newOffchainMetadata, existingOffchainMetadata] = await Promise.all([
    fetchOffchainMetadata(onchainUri),
    fetchOffchainMetadata(dbUri),
  ]);
  const queries: Array<PrismaPromise<any>> = [];
  if (newOffchainMetadata == null || existingOffchainMetadata == null) {
    return {
      error: `Could not load: ${
        newOffchainMetadata == null
          ? ` - newOffchainMetadata: ${onchainUri}`
          : ""
      } ${
        existingOffchainMetadata == null
          ? ` - existingOffchainMetadata: ${dbUri}`
          : ""
      }`,
      queries,
    };
  }
  const { description: newDescription, image: newImageSrc } =
    newOffchainMetadata;
  const { image: oldImageSrc, description: oldDescription } =
    existingOffchainMetadata;

  if (newImageSrc !== oldImageSrc) {
    const imageMetadata = await axios({
      method: "HEAD",
      url: newImageSrc,
    });
    const fileSize = imageMetadata.headers["content-length"];
    if (
      fileSize == null ||
      parseInt(fileSize, 10) > DEFAULT_MAX_FILE_SIZE_FOR_MINT
    ) {
      return {
        error: "New image file exceeds max file size allowed of 100MB",
        queries,
      };
    }

    const fileExtFromImageSrc = (newImageSrc as string).split("?ext=")[1];
    const contentType =
      fileExtFromImageSrc != null
        ? getContentTypeFromExt(fileExtFromImageSrc)
        : imageMetadata.headers["content-type"];
    if (contentType == null || contentType === "unknown") {
      return {
        error: "Unsupported file type for image found on new metadata",
        queries,
      };
    }

    const fileExtFromContentType = getFileExtFromContentType(contentType);
    const { dimensions, fileName } = await uploadFileFromUrl(
      newImageSrc,
      `nft-images/${nanoid()}.${fileExtFromContentType}`,
      true
    );
    queries.push(
      updateNftMetadata(mint, {
        assetHeight: dimensions?.height,
        assetWidth: dimensions?.width,
        contentType,
        image: fileName,
      })
    );
  }

  queries.push(
    updateNftMetadata(mint, {
      ...(newDescription !== oldDescription
        ? { description: newDescription }
        : {}),
      uri: onchainUri,
    })
  );

  const dbAttributes = (input.dbMetadata.Nft?.NftToAttribute ?? [])
    .map(({ Attribute: { traitType, value } }) => ({
      trait_type: traitType,
      value,
    }))
    .sort(getCompareByProperty("trait_type"));
  const onchainAttributes = (newOffchainMetadata.attributes ?? []).sort(
    getCompareByProperty("trait_type")
  );
  if (jsonStringify(dbAttributes) !== jsonStringify(onchainAttributes)) {
    const prisma = getPrisma();
    const clearAttributes = prisma.nftToAttribute.deleteMany({
      where: { nftId: mint },
    });
    const createNewAttributes = onchainAttributes.map((attr) =>
      prisma.nftToAttribute.create({
        data: {
          Attribute: {
            connectOrCreate: {
              create: {
                traitType: attr.trait_type,
                value: attr.value,
              },
              where: {
                traitType_value: {
                  traitType: attr.trait_type,
                  value: attr.value,
                },
              },
            },
          },
          Nft: {
            connect: {
              id: mint,
            },
          },
        },
      })
    );
    queries.push(clearAttributes, ...createNewAttributes);
  }

  return { error: null, queries };
}

export default async function syncNftMetadata(
  dbMetadata: PrismaMetadataWithIncludes,
  dryRun: boolean
): Promise<SyncNftResult> {
  const { mint, Nft: nft, creators, name, uri } = dbMetadata;
  const metadataAccount = await AccountLoader.loadNft(mint);

  if (metadataAccount == null) {
    return {
      error: "Onchain MetadataAccount is null",
      mint,
    };
  }

  if (nft == null) {
    return {
      error: "Nft does not exist in database",
      mint,
    };
  }

  const {
    name: onchainName,
    creators: onchainCreators,
    uri: onchainOffchainMetadataUri,
  } = metadataAccount;
  const returnFields = {
    comparisonInfo: {
      db: {
        creators,
        name,
        offchainMetadataUri: uri,
      },
      onchain: {
        onchainCreators,
        onchainName,
        onchainOffchainMetadataUri,
      },
    },
    mint,
  };

  const [nameSyncStatus, offchainMetadataUriSyncStatus, creatorsSyncStatus] = [
    isNftNameSynced({ dbName: name, onchainName }),
    isNftOffchainMetadataSynced({
      dbUri: uri,
      onchainUri: onchainOffchainMetadataUri,
    }),
    areNftCreatorsSynced({
      dbCollaborators: nft.NftToCollaborator,
      dbCreators: creators,
      dbNftCreatorAddress: nft.creatorId,
      onchainCreators: onchainCreators.map((creator) => ({
        ...creator,
        address: creator.address.toString(),
      })),
    }),
  ];

  const statuses = {
    creators: creatorsSyncStatus,
    name: nameSyncStatus,
    offchainMetadata: offchainMetadataUriSyncStatus,
  };
  if (dryRun) {
    return {
      ...returnFields,
      error: null,
      mint,
      statuses,
    };
  }
  if (
    [nameSyncStatus, offchainMetadataUriSyncStatus, creatorsSyncStatus].every(
      (val) => val === SyncStatus.Synced
    )
  ) {
    return {
      ...returnFields,
      error: null,
      mint,
      statuses,
    };
  }

  const prisma = getPrisma();
  const syncNameQuery =
    nameSyncStatus === SyncStatus.OutOfSync
      ? getSyncNftNameDbQuery({ dbName: name, mint, onchainName })
      : null;
  const syncOffchainMetadataQueries =
    offchainMetadataUriSyncStatus === SyncStatus.OutOfSync
      ? await getSyncNftOffchainMetadataQueries({
          dbMetadata,
          dbUri: uri,
          onchainUri: onchainOffchainMetadataUri,
        })
      : null;

  if (syncOffchainMetadataQueries?.error != null) {
    return {
      ...returnFields,
      error: `Error when attempting to sync offchain metadata: ${syncOffchainMetadataQueries.error}`,
      statuses,
    };
  }

  const syncCreatorsQueries =
    creatorsSyncStatus === SyncStatus.OutOfSync
      ? await getSyncNftToCollaboratorQueries(
          mint,
          onchainCreators!.map((creator) => ({
            ...creator,
            address: creator.address.toString(),
          })),
          nft.creatorId
        )
      : null;

  try {
    // Apply the DB operations all at once at the end to:
    //   1. Prevent the $transaction for being open for too long
    //   2. Make sure this is an atomic operation (all or nothing)
    await prisma.$transaction([
      ...(syncNameQuery != null ? [syncNameQuery] : []),
      ...(syncOffchainMetadataQueries?.queries ?? []),
      ...(syncCreatorsQueries ?? []),
    ]);

    return {
      ...returnFields,
      error: null,
      statuses: {
        creators: SyncStatus.Synced,
        name: SyncStatus.Synced,
        offchainMetadata: SyncStatus.Synced,
      },
    };
  } catch (e: any) {
    return {
      ...returnFields,
      error: e.message,
    };
  }
}
