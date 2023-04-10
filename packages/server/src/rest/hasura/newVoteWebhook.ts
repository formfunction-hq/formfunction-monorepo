import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import SlackWebhook from "src/types/enums/SlackWebhook";
import logError from "src/utils/analytics/logError";
import isProd from "src/utils/isProd";
import getPrisma from "src/utils/prisma/getPrisma";
import sendSlackNotification from "src/utils/tooling/sendSlackNotification";
import invariant from "tiny-invariant";

/**
 * When new vote is made, update status of artist submission (if necessary).
 *
 * Also send Slack notif.
 */
export default async function newVoteWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { artistSubmissionId, id, voteType, userId } = body.event.data.new;

  const prisma = getPrisma();
  const submission = await prisma.artistSubmission.findUnique({
    where: { id: artistSubmissionId },
  });
  const [voter, submitter, votesForSubmission, prescreenVotes] =
    await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.user.findUnique({ where: { id: submission!.userId } }),
      prisma.vote.findMany({ where: { artistSubmissionId } }),
      prisma.vote.findMany({
        where: {
          artistSubmissionId,
          id: {
            not: id,
          },
          voteType: {
            in: ["PrescreenApprove", "PrescreenReject"],
          },
        },
      }),
    ]);

  invariant(submitter != null);
  if (submitter.isWhitelisted) {
    res.json({
      message: `Submitter ${submitter.id} is already whitelisted, skipping`,
    });
    return;
  }

  if (
    prescreenVotes.length > 0 &&
    ["PrescreenApprove", "PrescreenReject"].includes(voteType)
  ) {
    res.json({
      message: `Submission already has ${prescreenVotes.length} prescreen votes`,
      success: false,
    });
    logError(
      AnalyticsEvent.NewVoteWebhookError,
      `Artist submission ${artistSubmissionId} received vote of type ${voteType}, but it has already been prescreened: (${JSON.stringify(
        prescreenVotes
      )})`,
      req,
      body.event.data.new
    );
    return;
  }

  // TODO: create VoteType enum
  switch (voteType) {
    case "PrescreenReject":
    case "Reject":
      await prisma.artistSubmission.update({
        data: {
          status: "Rejected",
        },
        where: { id: artistSubmissionId },
      });
      break;
    case "PrescreenApprove":
      await prisma.artistSubmission.update({
        data: {
          status: "VoteActive",
        },
        where: { id: artistSubmissionId },
      });
      break;
    case "Approve":
      await prisma.artistSubmission.update({
        data: {
          status: "Approved",
        },
        where: { id: artistSubmissionId },
      });
      break;
    case "Skip":
    case "Upvote":
    default:
      break;
  }

  if (isProd()) {
    await sendSlackNotification(
      SlackWebhook.VoteAlertChannel,
      `Vote of "${voteType}" made by @${voter!.username} on submission by @${
        submitter!.username
      }. Submission now has ${votesForSubmission.length} votes.`
    );
  }

  res.json({ success: true });
}
