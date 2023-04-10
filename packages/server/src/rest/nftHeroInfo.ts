import { NextFunction, Request, Response } from "express";
import invariant from "tiny-invariant";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function nftHeroInfo(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mint } = req.query;

  const prisma = getPrisma();
  const prismaNft = await prisma.nft.findUnique({
    include: {
      Creator: {
        include: {
          Photo_PhotoToUser_profilePhotoId: true,
        },
      },
      NftMetadata: true,
    },
    where: { mint: mint as string },
  });
  invariant(prismaNft != null, "Cannot be null");

  const contentSrc = prismaNft.NftMetadata.image;
  const artistName = prismaNft.Creator.username;
  const artistSrc =
    prismaNft.Creator.Photo_PhotoToUser_profilePhotoId?.photoUrl;
  const nftSrc = `/@${artistName}/${prismaNft.mint}`;
  const playbackId = prismaNft.NftMetadata.videoPreviewPlaybackId;

  res.json({
    artistName,
    artistSrc,
    contentSrc,
    nftSrc,
    playbackId,
  });
}
