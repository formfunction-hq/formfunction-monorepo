import { PublicKey } from "@solana/web3.js";
import axios, { AxiosResponse } from "axios";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import parseSolscanTransferTx, {
  SolscanTransferTx,
} from "src/utils/solana/txs/parse/parseSolscanTransferTx";

type SolscanTransferAPIResponse = {
  data: {
    begin: number;
    hasNext: boolean;
    items: Array<SolscanTransferTx>;
    total: number;
  };
  success: boolean;
};

/**
 * Util method that fetches all transfer txs for given mint.
 * We use Solscan's API since it is faster than doing the
 * on-chain operations ourselves.
 *
 * If we ever need to do this in-house, there is a prototype
 * that was built in https://github.com/formfunction-hq/formfn-monorepo/pull/148
 * that we can extend for this use-case.
 */
export default async function getAllTransferTxs(
  mint: PublicKey,
  limit = 100
): Promise<Array<NftTransactionOnchain>> {
  // Log this so we can tell how much we're hitting Solscan (since they have rate limits)
  logEvent(AnalyticsEvent.GetAllTransferTxs, null, { mint: mint.toString() });

  try {
    const { data: response }: AxiosResponse<SolscanTransferAPIResponse> =
      await axios.get(
        `https://api.solscan.io/transfer/token?token_address=${mint.toString()}&type=all&offset=0&limit=${limit}`
      );

    return filterNulls(
      await Promise.all(
        response.data.items.map((tx) => parseSolscanTransferTx(tx))
      )
    );
  } catch (e) {
    logError(AnalyticsEvent.GetAllTransferTxsError, e as Error, null, {
      mint: mint.toString(),
    });

    return [];
  }
}
