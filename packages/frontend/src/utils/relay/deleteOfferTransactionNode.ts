import { RecordSourceSelectorProxy } from "relay-runtime";
import deleteOfferTransactionNodes from "utils/relay/deleteOfferTransactionNodes";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

export default function deleteOfferTransactionNode<T>(
  store: RecordSourceSelectorProxy<T>,
  mint: string,
  viewerId: MaybeUndef<string>,
  offerTransactionId: string
) {
  deleteOfferTransactionNodes(store, mint, viewerId, [offerTransactionId]);
}
