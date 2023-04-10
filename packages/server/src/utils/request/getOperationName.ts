import { Request } from "express";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

export default function getOperationName(req: Request) {
  const operationName = req.headers["x-operation-name"] as MaybeUndef<string>;
  return operationName;
}
