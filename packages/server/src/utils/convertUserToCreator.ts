import { User } from "@prisma/client";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function convertUserToCreator(
  userId: string,
  prismaTransactionClient: PrismaTransactionClient
): Promise<User> {
  const prisma =
    prismaTransactionClient != null ? prismaTransactionClient : getPrisma();

  await prisma.whitelist.upsert({
    create: {
      address: userId,
    },
    update: {
      address: userId,
    },
    where: {
      address: userId,
    },
  });

  const user = await prisma.user.update({
    data: { isWhitelisted: true },
    where: { id: userId },
  });

  return user;
}
