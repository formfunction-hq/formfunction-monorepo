import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import getPrisma from "src/utils/prisma/getPrisma";

/**
 * Since most actions on our platform can be taken directly on-chain
 * it is possible that they are taken by users that have not yet
 * registered on the platform. In these cases, we must create
 * "empty" profiles for these users before inserting any txs from
 * these users.
 */
export default async function getUsersToCreateFromTransactions(
  txs: Array<NftTransactionOnchain>
) {
  const prisma = getPrisma();
  const fromAddresses = txs.map((tx) => tx.fromAddress);
  const toAddresses = txs.map((tx) => tx.toAddress);
  const allUserAddresses = removeDuplicatesWithSet([
    ...fromAddresses,
    ...toAddresses,
  ]);
  const existingUsers = filterNulls(
    await prisma.user.findMany({
      where: {
        id: {
          in: allUserAddresses,
        },
      },
    })
  ).map((user) => user.id);
  return allUserAddresses.filter((address) => !existingUsers.includes(address));
}
