import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";
import createCollabRequestNotification from "src/utils/notifications/create/createCollabRequestNotification";

export default async function notifyCollabRequestWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { collaboratorId, nftId } = body.event.data.new;

  const prisma = getPrisma();
  const [collaborator, nft] = await Promise.all([
    prisma.user.findUnique({ where: { id: collaboratorId } }),
    prisma.nft.findUnique({
      include: {
        Creator: true,
        NftMetadata: true,
        Series: {
          include: {
            CandyMachine: true,
          },
        },
      },
      where: { id: nftId },
    }),
  ]);

  invariant(nft != null, "NFT must not be null");
  invariant(collaborator != null, "Collaborator must not be null");

  if (collaborator.id === nft.Creator.id) {
    res.json({
      message: "Should not send notification to the creator",
      status: "skipped",
    });
    return;
  }

  if (nft.Series?.CandyMachine != null) {
    res.json({
      message:
        "We do not create collab request notifications for generative NFTs, " +
        "because it would be too spammy",
      status: "skipped",
    });
    return;
  }

  await createCollabRequestNotification(
    {
      nftMint: nft.mint,
    },
    collaborator.id,
    nft.creatorId
  );

  res.json({ success: true }).send();
}
