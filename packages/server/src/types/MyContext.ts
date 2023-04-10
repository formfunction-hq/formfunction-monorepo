import { Request, Response } from "express";
import { Transaction } from "@sentry/types";
import { PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

type MyContext = {
  req: Request;
  res: Response;
  transaction: Transaction;
  verifiedPublicKey: Maybe<PublicKey>;
};

export default MyContext;
