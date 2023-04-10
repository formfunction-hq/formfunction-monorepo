import SaleType from "@formfunction-hq/formfunction-auction-house/dist/types/enum/SaleType";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";

/**
 * The format of the log line we're looking for is as follows:
 *   buyer_sale_type = Offer
 *   seller_sale_type = InstantSale
 *
 * E.g. https://explorer.solana.com/tx/3xdkgNDWpL454SrNtQKZj24z3zQB2Fi9EbAzefF9tcTnU3MH3betnUnPHJAbZHkGkJPumg3TTJVkniw2qkPCnwdL?cluster=mainnet-beta
 */
export default function getSaleTypeForTx(
  tx: ParsedTransactionWithMeta,
  saleTypes = ["buyer_sale_type", "seller_sale_type"]
): Maybe<SaleType> {
  const programLogs = tx.meta?.logMessages;

  if (programLogs == null) {
    return null;
  }

  const saleTypeLine = programLogs.find((logLine) =>
    saleTypes.map((saleType) => logLine.includes(saleType)).some(Boolean)
  );
  if (saleTypeLine == null) {
    return null;
  }

  const saleTypeLineMatch = saleTypeLine.match(/_sale_type = .*/);
  if (saleTypeLineMatch == null) {
    logError(
      AnalyticsEvent.GetSaleTypeForTxError,
      `Failed to parse, could not find match: ${saleTypeLine}`,
      null,
      { saleTypeLine }
    );
    return null;
  }

  const splits = saleTypeLineMatch[0].split(" ");
  if (splits.length !== 3) {
    logError(
      AnalyticsEvent.GetSaleTypeForTxError,
      `Failed to parse, unexpected splits length: ${saleTypeLine}`,
      null,
      { saleTypeLine, splits, splitsLength: splits.length }
    );
    return null;
  }

  switch (splits[2]) {
    case "Auction":
      return SaleType.Auction;
    case "InstantSale":
      return SaleType.InstantSale;
    case "Offer":
      return SaleType.Offer;
    default:
      return null;
  }
}
