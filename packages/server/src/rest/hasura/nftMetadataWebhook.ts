import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import uploadFirebaseAssetToArweave, {
  UPLOAD_TXID_DOES_NOT_MATCH,
} from "src/utils/arweave/uploadFirebaseAssetToArweave";
import invariant from "tiny-invariant";
import getNftKind from "formfn-shared/dist/utils/nft/getNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

/**
 * Uploads the NFT asset to Arweave.
 * We do this in a webhook in an async way to
 * improve performance when minting new NFTs.
 *
 * See uploadNftToArweaveResolver.ts for more details.
 */
export default async function nftMetadataWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { id } = body.event.data.new;

  const prisma = getPrisma();
  const nftMetadata = await prisma.nftMetadata.findUnique({
    include: {
      Nft: {
        include: {
          MasterEditionNft: true,
          Series: {
            include: {
              CandyMachine: true,
            },
          },
        },
      },
    },
    where: {
      id,
    },
  });
  invariant(
    nftMetadata != null && nftMetadata.Nft != null,
    "NFT metadata and NFT should not be null"
  );

  const { Nft } = nftMetadata;
  if (Nft.isImported) {
    res.json({
      message: "skipped (imported)",
      success: true,
    });
    return;
  }

  const nftKind = getNftKind(
    Nft.isMasterEdition,
    Nft.isPnft,
    Nft.maxSupply,
    Nft.MasterEditionNft?.maxSupply ?? null,
    Nft.Series?.CandyMachine != null
  );
  switch (nftKind) {
    case NftKind.PnftStandardEdition:
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.StandardEditionPrintUnlimitedSupply: {
      res.json({
        message: "skipped (standard edition)",
        nftKind,
        success: true,
      });
      return;
    }
    case NftKind.Generative: {
      res.json({
        message: "skipped (generative)",
        nftKind,
        success: true,
      });
      return;
    }
    case NftKind.MasterEditionWithNonzeroSupply:
    case NftKind.MasterEditionWithUnlimitedSupply:
    case NftKind.OneOfOne:
    case NftKind.PnftMasterEdition:
      break;
    default:
      assertUnreachable(nftKind);
  }

  const { image: downloadUrl, assetArweaveTxid } = nftMetadata || {};
  if (!downloadUrl || !assetArweaveTxid) {
    logError(
      AnalyticsEvent.UploadNftToArweaveFail,
      "NFT metadata is missing necessary fields",
      req,
      {
        assetArweaveTxid,
        downloadUrl,
        id,
      }
    );
    res.json({ success: false });
    return;
  }

  const downloadUrlSplits = downloadUrl!.split("/");
  const assetId = downloadUrlSplits[downloadUrlSplits.length - 1];

  try {
    await uploadFirebaseAssetToArweave(
      req,
      `nft-images/${assetId}`,
      assetArweaveTxid
    );
  } catch (e: any) {
    if (
      e.message.includes(UPLOAD_TXID_DOES_NOT_MATCH) &&
      assetId.endsWith(".mp4")
    ) {
      // For MP4s, try uploading the GIF instead since we convert
      // the GIF to MP4 for performance reasons and so the arweave txid
      // might differ.
      const assetIdAsGif = `${assetId.split(".mp4")[0]}.gif`;
      await uploadFirebaseAssetToArweave(
        req,
        `nft-images/${assetIdAsGif}`,
        assetArweaveTxid
      );
    } else {
      // Throw the error so Hasura knows the webhook failed
      throw e;
    }
  }

  res.json({ success: true });
}
