import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function healthcheck(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const user = await prisma.user.findFirst({ orderBy: { timeCreated: "asc" } });

  res.json({ firstUserId: user?.id, success: true });
}
