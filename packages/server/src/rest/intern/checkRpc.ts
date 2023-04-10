import { NextFunction, Request, Response } from "express";
import invariant from "tiny-invariant";
import Network from "src/types/enums/Network";
import getConnection from "src/utils/solana/getConnection";
import getRpcHostFromNetwork from "src/utils/solana/getRpcHostFromNetwork";

export default async function checkRpc(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { secret } = req.query;

  invariant(secret === "banana", "Invalid request");

  const connection = getConnection();

  res.json({
    // @ts-ignore
    connectionRpc: connection._rpcEndpoint,
    rpc: getRpcHostFromNetwork(process.env.SOLANA_NETWORK as Network),
  });
}
