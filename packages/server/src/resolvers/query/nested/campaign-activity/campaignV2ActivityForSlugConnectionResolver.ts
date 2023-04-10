import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import convertNftTransaction from "src/utils/convert/convertNftTransaction";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CampaignV2ActivityForSlugInput,
  NftTransactionsConnection,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import CONVERT_NFT_TRANSACTION_INCLUDE from "src/constants/include/ConvertNftTransactionInclude";
import getCampaignForCampaignForSlugInput from "src/utils/campaigns/getCampaignForCampaignForSlugInput";
import getEmptyConnection from "src/utils/graphql/getEmptyConnection";
import { Prisma } from "@prisma/client";

export default async function campaignV2ActivityForSlugConnectionResolver(
  context: Undef<MyContext>,
  after: Maybe<string>,
  first: number,
  input: CampaignV2ActivityForSlugInput
): Promise<NftTransactionsConnection> {
  const { verifiedPublicKey } = context ?? { verifiedPublicKey: null };
  const prisma = getPrisma();
  const afterNumber = after == null ? 0 : Number(after);
  const { campaign } = await getCampaignForCampaignForSlugInput(
    input,
    verifiedPublicKey?.toString()
  );

  if (campaign == null) {
    return getEmptyConnection(Typename.NftTransactionsConnection);
  }

  const where: Prisma.NftTransactionFindManyArgs["where"] = {
    Nft: {
      CampaignFundingTier: {
        campaignId: campaign.id,
      },
    },
    // We only want primary sales
    auctionCount: 0,
    type: {
      in: [
        NftTransactionTypeExpress_Enum.AuctionWon,
        NftTransactionTypeExpress_Enum.Bid,
        NftTransactionTypeExpress_Enum.SoldAcceptedOffer,
        NftTransactionTypeExpress_Enum.SoldGenerativeMint,
        NftTransactionTypeExpress_Enum.SoldInstantSale,
        NftTransactionTypeExpress_Enum.SoldEditionPrimary,
      ],
    },
  };
  const [nftTransactions, totalCount] = await Promise.all([
    prisma.nftTransaction.findMany({
      include: CONVERT_NFT_TRANSACTION_INCLUDE,
      orderBy: NFT_TRANSACTION_ORDER_BY,
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.nftTransaction.count({ where }),
  ]);

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
