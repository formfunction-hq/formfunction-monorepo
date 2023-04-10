import { ConnectionHandler, RecordSourceSelectorProxy } from "relay-runtime";
import getNftOfferTransactionsConnection from "utils/relay/getNftOfferTransactionsConnection";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

export default function deleteOfferTransactionNodes<T>(
  store: RecordSourceSelectorProxy<T>,
  mint: string,
  viewerId: MaybeUndef<string>,
  offerTransactionIds?: Array<string>
) {
  const conn = getNftOfferTransactionsConnection(store, mint, viewerId);
  const edges = conn!.getLinkedRecords("edges");

  edges!
    .filter(
      (record) =>
        // Delete all if offerTransactionIds is not provided
        offerTransactionIds == null ||
        offerTransactionIds.includes(
          String(
            record
              .getLinkedRecord("node")!
              .getLinkedRecord("transaction")!
              .getValue("id")!
          )
        )
    )
    .forEach((record) =>
      ConnectionHandler.deleteNode(
        conn!,
        record.getLinkedRecord("node")!.getDataID()
      )
    );
}
