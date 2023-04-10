import { NextFunction, Request, Response } from "express";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import { PublicKey } from "@solana/web3.js";

/**
 * Loads the passed in account and returns it.
 */
export default async function loadAccount(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { address } = req.query;

  const account = await ConnectionWrapper.getAccountInfo(
    new PublicKey(address as string)
  );

  res.json({ account, dataInHex: account?.data.toString("hex") });
}
