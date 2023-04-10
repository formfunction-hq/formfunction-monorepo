/* eslint-disable no-await-in-loop */
import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import sleepMs from "formfn-shared/dist/utils/sleepMs";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import sendShutdownEmail from "../../utils/email/sendShutdownEmail";

const BATCH_SIZE = 100;

const SLEEP_TIME_BETWEEN_BATCHES_IN_MS = 1_000;

export default async function sendShutdownEmailsEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { dryRun } = req.body;
  const prisma = getPrisma();
  const emails = filterNulls(
    (
      await prisma.user.findMany({
        where: { email: { not: null } },
      })
    ).map((user) => user.email)
  );

  if (dryRun != null) {
    res.json({
      dryRun: true,
      numEmails: emails.length,
    });
    return;
  }

  const results = [];
  for (let i = 0; i < Math.ceil(emails.length / BATCH_SIZE); i += 1) {
    results.push(
      await sendShutdownEmail(
        emails.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE),
        req
      )
    );

    await sleepMs(SLEEP_TIME_BETWEEN_BATCHES_IN_MS);
  }

  res.json({ results, success: true });
}
