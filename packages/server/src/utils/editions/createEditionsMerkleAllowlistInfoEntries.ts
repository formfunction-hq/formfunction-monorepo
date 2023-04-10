import MerkleAllowlistBuyersList from "@formfunction-hq/formfunction-auction-house/dist/types/merkle-tree/MerkleAllowlistBuyersList";
import pLimit from "p-limit";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";
import getUserConnectOrCreate from "src/utils/prisma/getUserConnectOrCreate";
import invariant from "tiny-invariant";

const limit = pLimit(20);

export default async function createEditionsMerkleAllowlistInfoEntries(
  prisma: PrismaTransactionClient,
  input: {
    addresses: Array<string>;
    merkleAllowlist: Array<MerkleAllowlistBuyersList>;
    merkleRootIndexOffset?: number;
    mint: string;
  }
): Promise<Array<MerkleAllowlistBuyersList>> {
  const { addresses, merkleAllowlist, merkleRootIndexOffset, mint } = input;

  await Promise.all(
    // Do this instead of using createMany so we can use getUserConnectOrCreate
    addresses.map((address) =>
      limit(() => {
        const merkleInfo = merkleAllowlist.find((info) =>
          info.buyersChunk.find((buyer) => buyer.address.toString() === address)
        );
        invariant(merkleInfo != null);
        const buyerInfo = merkleInfo.buyersChunk.find(
          (buyer) => buyer.address.toString() === address
        );
        invariant(buyerInfo != null);
        return prisma.editionsMerkleAllowlistInfo.create({
          data: {
            Nft: { connect: { mint } },
            User: getUserConnectOrCreate(address),
            amountAllowed: buyerInfo.amount,
            proof: buyerInfo.serializedProof,
            rootIndex: buyerInfo.merkleTreeIndex + (merkleRootIndexOffset ?? 0),
          },
        });
      })
    )
  );

  return merkleAllowlist;
}
