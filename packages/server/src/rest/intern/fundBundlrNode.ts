import { NextFunction, Request, Response } from "express";
import nullthrows from "nullthrows";
import BigNumber from "bignumber.js";
import LAMPORTS_PER_SOL from "src/utils/lamportsPerSol";
import getBundlrClient from "src/utils/arweave/bundlr/getBundlrClient";

export default async function fundBundlrNode(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { amountInSol, nodeUrlOverride } = req.body;

  const bundlr = await getBundlrClient(nodeUrlOverride);
  const fundingAmount = nullthrows(
    amountInSol,
    "sol funding amount not provided"
  );

  const fundData = await bundlr.fund(
    new BigNumber(Number(fundingAmount) * LAMPORTS_PER_SOL).integerValue(),
    1
  );
  const newBalance = await bundlr.getLoadedBalance();

  res.json({
    balance: newBalance,
    balanceInSol: Number(newBalance) / LAMPORTS_PER_SOL,
    fundData,
  });
}
