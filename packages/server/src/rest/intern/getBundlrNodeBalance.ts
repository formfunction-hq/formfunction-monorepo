import { NextFunction, Request, Response } from "express";
import LAMPORTS_PER_SOL from "src/utils/lamportsPerSol";
import getBundlrClient from "src/utils/arweave/bundlr/getBundlrClient";
import { Undef } from "formfn-shared/dist/types/UtilityTypes";

export default async function getBundlrNodeBalance(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { nodeUrlOverride } = req.query;

  const bundlr = await getBundlrClient(nodeUrlOverride as Undef<string>);
  const balance = await bundlr.getLoadedBalance();
  res.json({
    balance: Number(balance),
    balanceInSol: Number(balance) / LAMPORTS_PER_SOL,
  });
}
