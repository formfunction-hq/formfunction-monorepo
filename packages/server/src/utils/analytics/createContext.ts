import { Request, Response } from "express";
import * as Sentry from "@sentry/node";
import MyContext from "src/types/MyContext";
import getVerifiedPublicKey from "src/utils/auth/getVerifiedPublicKey";
import getOperationName from "src/utils/request/getOperationName";

export default async function createContext({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<MyContext> {
  const operationName = getOperationName(req);
  // ... create other context fields
  const transaction = Sentry.startTransaction({
    name: operationName ?? "GraphQLTransaction",
    op: "gql", // this will be the default name, unless the gql query has a name
  });

  const span = transaction.startChild({
    description: "getVerifiedPublicKey",
    op: "init",
  });
  const verifiedPublicKey = getVerifiedPublicKey(req);
  span.finish();

  return { req, res, transaction, verifiedPublicKey };
}
