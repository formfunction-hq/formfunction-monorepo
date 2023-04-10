import { Request, Response } from "express";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import getConnection from "src/utils/solana/getConnection";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";

async function performAirdrop(req: Request) {
  const { rpcUrl } = req.query;
  let connection;
  if (rpcUrl != null) {
    connection = new Connection(rpcUrl as string);
  } else {
    connection = getConnection();
  }
  const accounts = await getLdFlag<Array<string>>(
    LaunchDarklyFlag.AirdropSolAccounts,
    []
  );

  const randomIndex = Math.floor(Math.random() * accounts.length);
  const account = accounts[randomIndex];
  const wallet = new PublicKey(account);
  const airdropSignature = await connection.requestAirdrop(
    wallet,
    1 * LAMPORTS_PER_SOL
  );
  const latestBlockhash = await connection.getLatestBlockhash();
  await connection.confirmTransaction(
    {
      ...latestBlockhash,
      signature: airdropSignature,
    },
    "confirmed"
  );
  const accountInfo = await connection.getAccountInfo(new PublicKey(account));
  const amountInLamports = accountInfo?.lamports;

  return {
    account,
    amountInLamports,
    amountInSol:
      amountInLamports == null ? null : amountInLamports / LAMPORTS_PER_SOL,
  };
}

export default async function airdropSol(req: Request, res: Response) {
  try {
    const result = await performAirdrop(req);
    await logEvent(AnalyticsEvent.AirdropSuccess, req, result);
    res.json(result);
  } catch (e) {
    await logError(AnalyticsEvent.AirdropFail, e as Error, req);
    res.json({ errorMessage: (e as Error).message });
  }
}
