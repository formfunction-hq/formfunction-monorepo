import HeliusTransactionSource from "src/types/enums/helius/HeliusTransactionSource";
import Typename from "src/types/enums/Typename";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import isNotNull from "formfn-shared/dist/utils/isNotNull";
import getNftTransactionNftInfo from "src/utils/graphql/getNftTransactionNftInfo";
import getHeliusTransactionFromAndTo from "src/utils/solana/polyweave/getHeliusTransactionFromAndTo";
import getHeliusTransactionNftTransactionType from "src/utils/solana/polyweave/getHeliusTransactionNftTransactionType";
import getHeliusTransactions from "src/utils/solana/polyweave/getHeliusTransactions";
import {
  NftTransactionExpress,
  NftTransactionSourceExpress_Enum,
} from "src/__generated__/generated";
import DEFAULT_AUCTION_COUNT from "src/constants/DefaultAuctionCount";
import logError from "src/utils/analytics/logError";
import toObject from "formfn-shared/dist/utils/toObject";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";

export default async function getExchangeArtTransactionsHelius(
  creatorId: string,
  mint: PublicKeyOrString
): Promise<Array<NftTransactionExpress>> {
  const heliusTxs = await getHeliusTransactions(mint.toString());

  return heliusTxs
    .filter(
      (heliusTx) =>
        heliusTx.source === HeliusTransactionSource.ExchangeArt &&
        getHeliusTransactionNftTransactionType(heliusTx) != null
    )
    .map((heliusTx) => {
      try {
        return {
          __typename: Typename.NftTransaction as Typename.NftTransaction,
          auctionCount: DEFAULT_AUCTION_COUNT,
          creatorId,
          fromAddress: getHeliusTransactionFromAndTo(heliusTx).from.toString(),
          id: heliusTx.signature,
          mint: mint.toString(),
          nftInfo: getNftTransactionNftInfo(null),
          priceInLamports: heliusTx.amount,
          source: NftTransactionSourceExpress_Enum.ExchangeArt,
          timeCreated: heliusTx.timestamp.toDate(),
          toAddress: getHeliusTransactionFromAndTo(heliusTx).to.toString(),
          txid: heliusTx.signature,
          type: getHeliusTransactionNftTransactionType(heliusTx)!,
        };
      } catch (e) {
        logError(
          AnalyticsEvent.HeliusError,
          e as Error,
          null,
          toObject(heliusTx)
        );
        return null;
      }
    })
    .filter(isNotNull);
}
