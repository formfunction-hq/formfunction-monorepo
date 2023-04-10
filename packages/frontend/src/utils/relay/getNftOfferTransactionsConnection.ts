import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { ConnectionHandler, RecordSourceSelectorProxy } from "relay-runtime";

// Keep in sync with useNftPageOfferTxs
export default function getNftOfferTransactionsConnection<T>(
  store: RecordSourceSelectorProxy<T>,
  mint: string,
  viewerId: MaybeUndef<string>
) {
  const root = store.getRoot();
  const parentObject = root.getLinkedRecord("nftOffers");
  return ConnectionHandler.getConnection(
    parentObject!,
    "NftOffers_Query_nftOffers",
    {
      input: {
        mint,
        viewerId,
      },
    }
  );
}
