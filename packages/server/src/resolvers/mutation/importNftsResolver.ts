import { Prisma } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import toObject from "formfn-shared/dist/utils/toObject";
import invariant from "tiny-invariant";
import pLimit from "p-limit";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import convertMetadataAccount from "src/utils/convert/convertMetadataAccount";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import getPublicKey from "src/utils/headers/getPublicKey";
import getTransactionsAndMintToImport from "src/utils/import/getTransactionsAndMintToImport";
import getEditionUpdateFields from "src/utils/nft/getEditionUpdateFields";
import getPrisma from "src/utils/prisma/getPrisma";
import getSyncNftToCollaboratorQueries from "src/utils/prisma/getSyncNftToCollaboratorQueries";
import upsertNftAttribute from "src/utils/prisma/upsertNftAttribute";
import getNftMintOwner from "src/utils/solana/getNftMintOwner";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";
import {
  ImportNftsInput,
  ImportNftsResponse,
  NftStatusExpress_Enum,
  RequestStatusExpress_Enum,
} from "src/__generated__/generated";
import getUsersToCreateFromTransactions from "src/utils/nft/getUsersToCreateFromTransactions";
import SOLD_TRANSACTION_TYPES from "src/constants/SoldTransactionTypes";

const limit = pLimit(20);

export default async function importNftsResolver(
  context: MyContext,
  input: ImportNftsInput
): Promise<ImportNftsResponse> {
  const userPublicKey = getPublicKey(context.req);
  invariant(userPublicKey != null, "User must be signed in");

  const offPlatformMetadata = filterNulls(
    await Promise.all(
      input.mintAddresses.map((mint) =>
        limit(async () => {
          const metadataAccount = await AccountLoader.loadNft(mint);
          if (metadataAccount == null) {
            return null;
          }
          const converted = await convertMetadataAccount(
            metadataAccount,
            context.req
          );
          if (converted == null) {
            return null;
          }
          converted.nft.isOffPlatform = false;
          return converted;
        })
      )
    )
  );

  const prisma = getPrisma();
  const nfts = await Promise.all(
    offPlatformMetadata.map(async (metadata) => {
      ///
      /// Create transactions and users for those transactions
      ///
      const { txs: txsToImport, mint: mintToImport } =
        await getTransactionsAndMintToImport(
          userPublicKey.toString(),
          metadata.mint
        );
      const nftTxsCreateData: Array<Prisma.NftTransactionCreateManyInput> =
        txsToImport.map((tx) => ({
          auctionCount: tx.auctionCount,
          creatorId: userPublicKey.toString(),
          fromUserId: tx.fromAddress,
          ixIndex: tx.ixIndex ?? undefined,
          ixInnerIndex: tx.ixInnerIndex ?? undefined,
          mint: tx.mint,
          price:
            tx.priceInLamports != null ? Number(tx.priceInLamports) : undefined,
          source: tx.source,
          timeCreated: tx.timeCreated,
          toUserId: tx.toAddress,
          txid: tx.txid,
          type: tx.type,
        }));
      const [usersToCreate, masterEditionUpdateFields] = await Promise.all([
        getUsersToCreateFromTransactions(txsToImport),
        getEditionUpdateFields(metadata.mint),
      ]);
      // Need to upsert b/c we import NFTs concurrently
      const userUpsertMany = usersToCreate.map((address) =>
        prisma.user.upsert({
          create: {
            id: address,
            username: address,
          },
          update: {
            username: address,
          },
          where: {
            id: address,
          },
        })
      );
      const txsCreateMany = prisma.nftTransaction.createMany({
        data: nftTxsCreateData,
      });

      ///
      /// Create the NFT itself
      ///
      const owner = await getNftMintOwner(new PublicKey(mintToImport));
      invariant(owner != null, `There must be an owner for ${mintToImport}`);
      if (metadata.updateAuthority !== userPublicKey.toString()) {
        return {
          error: true,
          errorMessage: `Update authority is ${metadata.updateAuthority}, but user is ${userPublicKey.toString} `,
        };
      }
      const asset =
        // @ts-ignore TODO: fix this later by modifying MetadataOffchainGqlType
        metadata.offchainData.animation_url ?? metadata.offchainData.image;
      const latestSoldTx = txsToImport.find((tx) =>
        SOLD_TRANSACTION_TYPES.includes(tx.type)
      );

      // @ts-ignore TODO: fix this later by modifying MetadataOffchainGqlType
      const { attributes } = metadata.offchainData;
      const attributeIds: Array<{ attributeId: string }> = filterNulls(
        await Promise.all(
          attributes != null && attributes.length > 0
            ? attributes.map((val: any) =>
                upsertNftAttribute({
                  traitType: val.trait_type,
                  value: val.value,
                })
              )
            : []
        )
      );

      // TODO: do we want to import series data?
      const priceInLamports =
        latestSoldTx == null ? null : Number(latestSoldTx.priceInLamports);
      const nftCreate = prisma.nft.create({
        data: {
          Creator: {
            connect: {
              id: userPublicKey.toString(),
            },
          },
          NftListing: {
            create: {},
          },
          // Note: technically, for Holaplex limited editions we should fetch the metadata account
          // for the limited edition instead of the master edition... but practically I don't think it matters.
          NftMetadata: {
            create: {
              assetArweaveTxid: null,
              contentType: metadata.contentType,
              creators: JSON.stringify(metadata.data.creators ?? []),
              description: metadata.offchainData.description ?? "",
              editionNonce: metadata.editionNonce,
              id: metadata.id,
              image: asset,
              isMutable: true,
              key: 4,
              mint: mintToImport,
              name: metadata.data.name,
              sellerFeeBasisPoints: metadata.data.sellerFeeBasisPoints,
              symbol: metadata.data.symbol,
              updateAuthority: metadata.updateAuthority,
              uri: metadata.data.uri,
            },
          },
          NftStatus: {
            connect: {
              value: NftStatusExpress_Enum.Owned,
            },
          },
          NftToAttribute: {
            createMany: {
              data: attributeIds,
            },
          },
          Owner: {
            connectOrCreate: {
              create: {
                id: owner.toString(),
                username: owner.toString(),
              },
              where: {
                id: owner.toString(),
              },
            },
          },
          auctionCount: txsToImport.filter((tx) =>
            SOLD_TRANSACTION_TYPES.includes(tx.type)
          ).length,
          hasBeenSold: latestSoldTx != null,
          id: mintToImport,
          isImported: true,
          mint: mintToImport,
          priceLastSoldForInLamports: priceInLamports,
          ...(masterEditionUpdateFields ?? {}),
        },
        include: CONVERT_NFT_TO_METADATA_INCLUDE,
      });

      try {
        ///
        /// Kick off the DB mutations
        ///
        const results = await prisma.$transaction(
          filterNulls([...userUpsertMany, nftCreate, txsCreateMany])
        );

        const queries = await getSyncNftToCollaboratorQueries(
          mintToImport,
          (metadata.data.creators ?? []).map((creator) => ({
            address: creator.address,
            share: creator.share,
            verified: creator.status === RequestStatusExpress_Enum.Approved,
          })),
          userPublicKey.toString()
        );
        await prisma.$transaction(queries);

        return {
          masterEditionMint: metadata.mint,
          nft: results[results.length - 2] as ConvertNftToMetadataAccountType,
        };
      } catch (e) {
        return {
          error: true,
          errorMessage: (e as Error).message,
          metadata: toObject(metadata),
          nftTxids: nftTxsCreateData.map((tx) => tx.txid),
          nftTxsCreateData,
          usersToCreate,
        };
      }
    })
  );

  const mintAddressesFailedToImport = input.mintAddresses.filter(
    (mint) => nfts.find((nft) => nft?.masterEditionMint === mint) == null
  );

  const response = {
    __typename: Typename.ImportNftsResponse as Typename.ImportNftsResponse,
    metadataAccountsImported: filterNulls(
      nfts.map((result) =>
        result.error === true ? null : convertNftToMetadataAccount(result.nft!)
      )
    ),
    mintAddressesFailedToImport,
  };

  if (mintAddressesFailedToImport.length > 0) {
    logError(
      AnalyticsEvent.ImportNftsError,
      `Failed to import ${mintAddressesFailedToImport.length} NFT(s)`,
      context.req,
      {
        failedNfts: nfts.filter((result) => result.error === true),
        input,
        numFailed: response.mintAddressesFailedToImport.length,
        numImported: response.metadataAccountsImported.length,
        response,
      }
    );
  } else {
    logEvent(AnalyticsEvent.ImportNftsSuccess, context.req, {
      input,
      numImported: response.metadataAccountsImported.length,
      response,
    });
  }

  return response;
}
