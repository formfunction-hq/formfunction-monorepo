import { Nft } from "@prisma/client";
import getPrisma from "src/utils/prisma/getPrisma";
import getUserConnectOrCreate from "src/utils/prisma/getUserConnectOrCreate";

export default function updateNftOwner(
  mint: string,
  newOwnerId: string
): Promise<Nft> {
  return getPrisma().nft.update({
    data: {
      Owner: getUserConnectOrCreate(newOwnerId),
    },
    where: {
      mint,
    },
  });
}
