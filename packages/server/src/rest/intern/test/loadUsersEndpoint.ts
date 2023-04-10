import { NextFunction, Request, Response } from "express";
import isNumber from "formfn-shared/dist/utils/numbers/isNumber";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function loadUsersEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { count } = req.query;
  const countAsNumber =
    count != null && isNumber(String(count)) ? Number(count) : 10;
  const prisma = getPrisma();
  const users = await prisma.user.findMany({
    take: countAsNumber,
  });

  res.json({
    success: true,
    users,
  });
}
