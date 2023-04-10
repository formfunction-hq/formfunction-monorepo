import graphql from "babel-plugin-relay/macro";
import { commitMutation, PayloadError } from "relay-runtime";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import {
  commitRawTxMutation as commitRawTxMutationType,
  commitRawTxMutation$data,
} from "utils/relay/__generated__/commitRawTxMutation.graphql";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";

const rawTxMutation = graphql`
  mutation commitRawTxMutation(
    $txid: String!
    $type: String!
    $mint: String!
    $extraData: String
  ) {
    insert_NftTransactionRaw_one(
      object: { txid: $txid, type: $type, mint: $mint, extraData: $extraData }
    ) {
      txid
      mint
    }
  }
`;

type OnCompleted =
  | ((
      response: commitRawTxMutation$data,
      errors: ReadonlyArray<PayloadError> | null | undefined
    ) => void)
  | null
  | undefined;

type OnError = ((error: Error) => void) | null | undefined;

export default function commitRawTxMutation({
  extraData = {},
  mint,
  onCompleted,
  onError,
  rawTxType,
  txid,
}: {
  extraData?: { [key: string]: any };
  mint: string;
  onCompleted?: OnCompleted;
  onError?: OnError;
  rawTxType: CommitRawTxType;
  txid: string;
}) {
  let extraDataStr = "failed to serialize, check logs";
  try {
    extraDataStr = jsonStringify(extraData);
  } catch (e: any) {
    logError(AnalyticsEvent.InsertRawTxSerializeExtraDataFail, e);
  }

  commitMutation<commitRawTxMutationType>(RelayEnvironment, {
    mutation: rawTxMutation,
    onCompleted,
    onError: (e) => {
      logError(AnalyticsEvent.InsertRawTxFail, e, {
        ...extraData,
        mint,
        rawTxType,
        txid,
      });
      if (onError != null) {
        onError(e);
      }
    },
    variables: {
      extraData: extraDataStr,
      mint,
      txid,
      type: rawTxType,
    },
  });
}
