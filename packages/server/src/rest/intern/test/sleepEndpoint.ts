import { NextFunction, Request, Response } from "express";
import isNumber from "formfn-shared/dist/utils/numbers/isNumber";
import sleepMs from "formfn-shared/dist/utils/sleepMs";

export default async function sleepEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { ms } = req.query;
  await sleepMs(ms != null && isNumber(String(ms)) ? Number(ms) : 1000);
  res.json({ ms, success: true });
}
