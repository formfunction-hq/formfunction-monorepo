import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import convertNftTransaction from "src/utils/convert/convertNftTransaction";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CampaignActivityForSlugInput,
  NftTransactionsConnection,
} from "src/__generated__/generated";
import CONVERT_NFT_TRANSACTION_INCLUDE from "src/constants/include/ConvertNftTransactionInclude";
import invariant from "tiny-invariant";
import getCampaignsConfig from "src/utils/launch-darkly/getCampaignsConfig";
import getCampaignSoldTransactionsWhereClause from "src/utils/campaigns/getCampaignSoldTransactionsWhereClause";

export default async function nftTransactionsForCampaignActivityConnectionResolver(
  _context: Undef<MyContext>,
  after: Maybe<string>,
  first: number,
  input: CampaignActivityForSlugInput
): Promise<NftTransactionsConnection> {
  invariant(
    input.creatorId != null || input.creatorUsername != null,
    "One of creatorId and creatorUsername must be non-null"
  );
  const prisma = getPrisma();
  const afterNumber = after == null ? 0 : Number(after);
  const campaignsConfig = await getCampaignsConfig();
  const campaign = campaignsConfig.campaignsBySlug[input.campaignSlug];
  const where = getCampaignSoldTransactionsWhereClause(campaign);

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
