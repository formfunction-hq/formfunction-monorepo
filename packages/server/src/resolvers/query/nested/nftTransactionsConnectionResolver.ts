import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import convertNftTransaction from "src/utils/convert/convertNftTransaction";
import getEmptyConnection from "src/utils/graphql/getEmptyConnection";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftTransactionsConnection,
  NftTransactionsInput,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import CONVERT_NFT_TRANSACTION_INCLUDE from "src/constants/include/ConvertNftTransactionInclude";
import { Prisma } from "@prisma/client";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import SOLD_TRANSACTION_TYPES from "src/constants/SoldTransactionTypes";

async function nftTransactionsConnectionResolver(
  _context: Undef<MyContext>,
  after: Maybe<string>,
  first: number,
  input: NftTransactionsInput
): Promise<NftTransactionsConnection> {
  validateFirstInput(first);
  const prisma = getPrisma();
  const afterNumber = after == null ? 0 : Number(after);

  const where: Prisma.NftTransactionFindManyArgs["where"] = {
    OR: [
      {
        mint: input.mint,
        type: {
          in: [
            NftTransactionTypeExpress_Enum.AuctionWon,
            NftTransactionTypeExpress_Enum.Bid,
            NftTransactionTypeExpress_Enum.Burned,
            NftTransactionTypeExpress_Enum.ChangePriceForEditions,
            NftTransactionTypeExpress_Enum.ClaimedPnft,
            NftTransactionTypeExpress_Enum.Imported,
            NftTransactionTypeExpress_Enum.Listed,
            NftTransactionTypeExpress_Enum.ListedEditions,
            NftTransactionTypeExpress_Enum.ListedInstantSale,
            NftTransactionTypeExpress_Enum.ListingCancelled,
            NftTransactionTypeExpress_Enum.Minted,
            NftTransactionTypeExpress_Enum.Sold,
            NftTransactionTypeExpress_Enum.SoldAcceptedOffer,
            NftTransactionTypeExpress_Enum.SoldEditionPrimary,
            NftTransactionTypeExpress_Enum.SoldGenerativeMint,
            NftTransactionTypeExpress_Enum.SoldInstantSale,
            NftTransactionTypeExpress_Enum.StoppedMintingForEditions,
          ],
        },
      },
      {
        Nft: {
          masterEditionMint: input.mint,
        },
        type: {
          in: SOLD_TRANSACTION_TYPES,
        },
      },
    ],
  };

  const [nftTransactions, totalCount, nft] = await Promise.all([
    prisma.nftTransaction.findMany({
      include: CONVERT_NFT_TRANSACTION_INCLUDE,
      orderBy: NFT_TRANSACTION_ORDER_BY,
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.nftTransaction.count({ where }),
    prisma.nft.findUnique({ where: { mint: input.mint } }),
  ]);

  if (nft == null) {
    // TODO: return null instead
    return getEmptyConnection(Typename.NftTransactionsConnection);
  }

  const converted = await Promise.all(
    nftTransactions.map((nftTransaction) =>
      convertNftTransaction(nftTransaction)
    )
  );

  return createOffsetPaginationConnection(
    converted,
    Typename.NftTransactionsEdge,
    Typename.NftTransactionsConnection,
    after,
    first,
    totalCount
  );
}

export default nftTransactionsConnectionResolver;
