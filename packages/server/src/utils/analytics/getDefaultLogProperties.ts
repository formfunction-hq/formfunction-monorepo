import { Request } from "express";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import getPublicKey from "src/utils/headers/getPublicKey";
import getOperationName from "src/utils/request/getOperationName";

export default function getDefaultLogProperties(req?: MaybeUndef<Request>) {
  const publicKey = req == null ? null : getPublicKey(req);
  return {
    graphql_operation_name: req == null ? null : getOperationName(req),
    headers: req?.headers,
    host: req?.get("host"),
    hostname: req?.hostname,
    ip: req?.ip,
    ips: req?.ips,
    node_env: process.env.NODE_ENV,
    origin: req?.get("origin"),
    originalUrl: req?.originalUrl,
    path: req?.path,
    public_key: publicKey?.toString() ?? undefined,
    query: req?.query,
  };
}
