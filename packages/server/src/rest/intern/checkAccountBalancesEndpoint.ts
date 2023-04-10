import { NextFunction, Request, Response } from "express";
import getConnection from "src/utils/solana/getConnection";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import loadAuctionHouseSdk from "src/utils/solana/loadAuctionHouseSdk";
import getAccountBalance from "formfn-shared/dist/utils/solana/getAccountBalance";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import nullthrows from "nullthrows";
import convertBase58PrivateKeyToKeypair from "src/utils/solana/convertBase58PrivateKeyToKeypair";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";

const DEFAULT_MIN_BALANCE = LAMPORTS_PER_SOL * 2;

function getStatusForBalance(
  lamports: number,
  minBalance = DEFAULT_MIN_BALANCE
): "ok" | "low_on_funds" {
  return lamports < minBalance ? "low_on_funds" : "ok";
}

async function getInfoForAccount(
  account: PublicKey,
  description: string,
  minBalance = DEFAULT_MIN_BALANCE
) {
  const accountBalance =
    (await getAccountBalance(getConnection(), account)) ?? 0;
  return {
    account: account.toString(),
    balanceInSol: accountBalance / LAMPORTS_PER_SOL,
    description,
    minBalanceInSol: minBalance / LAMPORTS_PER_SOL,
    status: getStatusForBalance(accountBalance, minBalance),
  };
}

/**
 * Checks the Solana account balance for accounts that pay fees on behalf of users.
 */
export default async function checkAccountBalancesEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const allFeeAccounts = await Promise.all(
    Object.values(CurrencyNameExpress_Enum).map(async (currencyVal) => {
      const sdk = loadAuctionHouseSdk(currencyVal);
      const { feeAccount } = sdk;
      return getInfoForAccount(
        feeAccount,
        `Fee account for ${currencyVal}`,
        currencyVal === CurrencyNameExpress_Enum.Solana
          ? undefined
          : // Fee accounts for other currencies don't need as high of a balance
            LAMPORTS_PER_SOL / 2
      );
    })
  );

  const bundlrFundingKey = nullthrows(
    process.env.SOLANA_KEY,
    "solana wallet pkey is not set in env"
  );
  const bundlrFundingKeypair =
    convertBase58PrivateKeyToKeypair(bundlrFundingKey);
  const bundlrAccountInfo = await getInfoForAccount(
    bundlrFundingKeypair.publicKey,
    "Bundlr funding account"
  );

  const authorityAccountInfo = await getInfoForAccount(
    getAuthorityKeypair().publicKey,
    "Authority account",
    // This is used for the most stuff, so let's get warned early
    LAMPORTS_PER_SOL * 5
  );

  const allAccountInfo = [
    ...allFeeAccounts,
    bundlrAccountInfo,
    authorityAccountInfo,
  ];

  const accountsLowOnFunds = allAccountInfo.filter(
    (info) => info.status === "low_on_funds"
  );

  const response = {
    accountsLowOnFunds,
    allAccounts: allAccountInfo,
  };

  if (accountsLowOnFunds.length > 0) {
    logError(
      AnalyticsEvent.AccountsLowOnFunds,
      `Found ${accountsLowOnFunds.length} accounts low on funds`,
      req,
      response
    );
  }

  res.json(response);
}
