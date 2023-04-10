import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import { Request } from "express";
import logError from "src/utils/analytics/logError";
import getBundlrClient from "src/utils/arweave/bundlr/getBundlrClient";

const FUNDING_MULTIPLIER = 1.5;

export default async function maybeFundAccountBalance(
  req: Request,
  bytes: number
): Promise<void> {
  try {
    const bundlr = await getBundlrClient();
    const price = await bundlr.getPrice(bytes);
    const fundingAmount = price.times(FUNDING_MULTIPLIER);
    const balance = await bundlr.getLoadedBalance();

    // Check against potential funding amount in case price
    // estimation is not 100% accurate
    if (fundingAmount.isGreaterThan(balance)) {
      let fundData;
      try {
        fundData = await bundlr.fund(fundingAmount.integerValue(), 1);
      } catch (err: any) {
        logError(AnalyticsEvent.FundingBundlrAccountFail, err, req, {
          balance: balance.toString(),
          description: "failed to add funds to bundlr node",
          fromAddress: bundlr.address,
          fundingAmount: fundingAmount.toString(),
          price: price.toString(),
          priceMinusBalance: price.minus(balance).toString(),
        });
        return;
      }

      logEvent(AnalyticsEvent.FundingBundlrAccountSuccess, req, {
        description: "adding funds to account for Bundlr upload",
        ...fundData,
        balance,
        fromAddress: bundlr.address,
        fundingAmount: fundingAmount.integerValue(),
        price,
      });
    }
  } catch (e) {
    logError(AnalyticsEvent.FundingBundlrAccountFail, e as Error, req, {
      description: "Failed to fetch Bundlr price/balance",
    });
  }
}
