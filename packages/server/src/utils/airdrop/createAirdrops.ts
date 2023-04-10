import { Airdrop } from "@prisma/client";
import { Request } from "express";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import ConvertUserType from "src/types/convert/ConvertUserType";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import getPrisma from "src/utils/prisma/getPrisma";
import { AirdropTypeExpress_Enum } from "src/__generated__/generated";
import invariant from "tiny-invariant";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";

export default async function createAirdrops(
  req: Request,
  masterEditionMint: string,
  fromAddress: string,
  toAddresses: Array<string>,
  type: AirdropTypeExpress_Enum
): Promise<Array<Airdrop & { ToUser: ConvertUserType }>> {
  const prisma = getPrisma();
  const masterEdition = await prisma.nft.findUnique({
    where: { id: masterEditionMint },
  });
  invariant(masterEdition != null, "Master edition NFT must not be null");
  invariant(
    toAddresses.length === removeDuplicatesWithSet(toAddresses).length,
    "toAddresses should be unique"
  );

  if (masterEdition.creatorId !== fromAddress) {
    logError(
      AnalyticsEvent.AirdropDebug,
      `fromAddress ${fromAddress} does not match master edition's` +
        ` (${masterEditionMint}) creatorId ${masterEdition.creatorId}`,
      req,
      { fromAddress, masterEdition, toAddresses }
    );
  }

  logEvent(AnalyticsEvent.AirdropCreated, req, {
    fromAddress,
    masterEditionMint,
    toAddresses,
    type,
  });

  const userIdsInDb = (
    await prisma.user.findMany({
      select: { id: true },
      where: { id: { in: toAddresses } },
    })
  ).map(({ id }) => id);
  const userIdsNotInDb = toAddresses.filter(
    (userId) => !userIdsInDb.includes(userId)
  );
  // First create user objects for all users that are not in our DB
  await prisma.user.createMany({
    data: userIdsNotInDb.map((userId) => ({
      id: userId,
      username: userId,
    })),
  });

  // Next, create the airdrop objects
  await prisma.airdrop.createMany({
    data: toAddresses.map((toAddress) => ({
      fromAddress: masterEdition.creatorId,
      masterEditionMint,
      toAddress,
      type,
    })),
  });
  // Unfortunately createMany doesn't support `include` so we run a
  // separate query
  const airdrops = await prisma.airdrop.findMany({
    include: { ToUser: { include: CONVERT_USER_INCLUDE } },
    where: {
      fromAddress: masterEdition.creatorId,
      masterEditionMint,
      toAddress: { in: toAddresses },
    },
  });

  return airdrops;
}
