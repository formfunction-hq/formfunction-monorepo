import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertNftTransactionType from "src/types/convert/ConvertNftTransactionType";
import Typename from "src/types/enums/Typename";
import bigintToNumber from "src/utils/bigintToNumber";
import convertPrice from "src/utils/convert/convertPrice";
import convertUser from "src/utils/convert/convertUser";
import getNftTransactionNftInfo from "src/utils/graphql/getNftTransactionNftInfo";
import {
  NftTransactionExpress,
  NftTransactionSourceExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";

export default function convertNftTransaction(
  prismaNftTransaction: ConvertNftTransactionType
): NftTransactionExpress {
  const { Creator, From, To } = prismaNftTransaction;

  return {
    Creator: Creator == null ? null : convertUser(Creator),
    From: From == null ? null : convertUser(From),
    To: To == null ? null : convertUser(To),
    __typename: Typename.NftTransaction,
    auctionCount: prismaNftTransaction.auctionCount,
    comment: prismaNftTransaction.comment,
    creatorId: prismaNftTransaction.creatorId,
    fromAddress: prismaNftTransaction.fromUserId,
    id: prismaNftTransaction.id,
    mint: prismaNftTransaction.mint,
    nftInfo: getNftTransactionNftInfo(prismaNftTransaction.Nft),
    price: convertPrice(
      bigintToNumber(prismaNftTransaction.price),
      prismaNftTransaction.Currency
    ),
    priceInLamports: bigintToNumber(prismaNftTransaction.price),
    source:
      prismaNftTransaction.source as Maybe<NftTransactionSourceExpress_Enum>,
    timeCreated: prismaNftTransaction.timeCreated,
    toAddress: prismaNftTransaction.toUserId,
    txid: prismaNftTransaction.txid,
    type: prismaNftTransaction.type as NftTransactionTypeExpress_Enum,
    usdPrice: prismaNftTransaction.usdPrice?.toNumber(),
  };
}
