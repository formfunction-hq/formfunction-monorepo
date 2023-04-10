import { Prisma } from "@prisma/client";

// Need to add secondary sort by price because some txs may happen at exact same (block)time.
const NFT_TRANSACTION_ORDER_BY: Array<Prisma.NftTransactionOrderByWithRelationInput> =
  [{ timeCreated: "desc" }, { price: "desc" }];

export default NFT_TRANSACTION_ORDER_BY;
