import { NextFunction, Request, Response } from "express";
import pLimit from "p-limit";
import syncNftMetadataForMint from "src/rest/intern/nfts/syncNftMetadataForMint";
import getPrisma from "src/utils/prisma/getPrisma";
import updateNftMetadata, {
  MetadataUpdateFields,
} from "src/utils/solana/updateNftMetadata";

type RevealResult = {
  error?: any;
  mint: string;
  result: "onchain-update-failed" | "db-update-failed" | "success";
};

const limit = pLimit(10);

// TODO: Update to using prod data later, probably a KV store with
// all of these pre-defined per token variant
export const MEDIA_URL =
  "https://firebasestorage.googleapis.com/v0/b/formfn-ed6b4.appspot.com/o/nft-images/ffLogo.jpg";
export const UPDATE_METADATA: MetadataUpdateFields = {
  asset: { type: "image/png", uri: MEDIA_URL },
  description: "OG Fofu. Can be swapped for a physical collectible.",
  name: "OG Fofu",
};

async function revealTooniesNft(
  req: Request,
  mint: string,
  updateFields: MetadataUpdateFields
): Promise<RevealResult> {
  try {
    // 1. Sync metadata for given NFT with provided data from Toonies
    // TODO: update update_authority in this call as well
    await updateNftMetadata(req, mint, updateFields);
  } catch (e: any) {
    return { error: e, mint, result: "onchain-update-failed" };
  }

  try {
    // 2. Sync onchain NFT with DB NFT
    await syncNftMetadataForMint(mint, false);
  } catch (e: any) {
    return { error: e, mint, result: "db-update-failed" };
  }

  return { mint, result: "success" };
}

export default async function revealTooniesEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mints, seriesId } = req.body;
  const mintsToUpdate = (
    await getPrisma().nft.findMany({
      select: { mint: true },
      where: { OR: [{ mint: { in: mints } }, { Series: { id: seriesId } }] },
    })
  ).map(({ mint }) => mint);

  const results = await Promise.all(
    mintsToUpdate.map((mint) =>
      limit(async () => revealTooniesNft(req, mint, UPDATE_METADATA))
    )
  );

  res.json({ mintsToUpdate, results, success: true });
}
