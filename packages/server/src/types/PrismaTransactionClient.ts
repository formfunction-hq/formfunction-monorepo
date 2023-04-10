import { Prisma, PrismaClient } from "@prisma/client";

/**
 * Prisma client within a Prisma.$transaction call.
 */
type PrismaTransactionClient = Omit<
  PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  "$use" | "$connect" | "$disconnect" | "$on" | "$transaction"
>;

export default PrismaTransactionClient;
