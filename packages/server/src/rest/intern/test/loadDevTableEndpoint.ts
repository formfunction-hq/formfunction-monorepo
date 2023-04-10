import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function loadDevTableEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const prisma = getPrisma();
  const dev = await prisma.dev.findMany();

  res.json({
    dev,
    success: true,
  });
}
