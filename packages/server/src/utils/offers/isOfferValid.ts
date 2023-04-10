import { NftTransaction } from "@prisma/client";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import { NftTransactionExpress } from "src/__generated__/generated";

export default function isOfferValid(
  mostRecentInvalidatingTx: Maybe<NftTransaction>,
  offerTransaction: NftTransactionExpress,
  offerCurrencyId: string,
  campaignGoalCurrencyId: MaybeUndef<string>,
  hasBeenSold: boolean
): boolean {
  return (
    (mostRecentInvalidatingTx == null ||
      dayjs(offerTransaction.timeCreated).isAfter(
        dayjs(mostRecentInvalidatingTx.timeCreated)
      )) &&
    (campaignGoalCurrencyId == null ||
      hasBeenSold ||
      // If the NFT is in a campaign, only offers that match the campaign's goal currency are valid
      offerCurrencyId === campaignGoalCurrencyId)
  );
}
