import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

// Where clause to use for fetching open offers (not cancelled/refunded/accepted)
// *made* by the specified user.
export default function getOpenOffersMadeByUserWhereClause(
  userId: Maybe<PublicKeyOrString>
) {
  return userId != null
    ? {
        AND: [
          { userId: userId.toString() },
          { refundTxid: null },
          { saleTransactionId: null },
        ],
      }
    : {};
}
