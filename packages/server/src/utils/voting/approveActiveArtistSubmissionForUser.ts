import getPrisma from "src/utils/prisma/getPrisma";

/**
 * If a user gets approved through means other than the voting process (e.g. if we manually
 * allowlist them), then we should also remove their active artist submission from voting
 * (if it exists) so they can't get rejected by manual approval.
 */
export default async function approveActiveArtistSubmissionForUser(
  userId: string
) {
  const prisma = getPrisma();
  const activeSubmission = await prisma.artistSubmission.findFirst({
    where: {
      status: {
        in: ["Pending", "VoteActive"],
      },
      userId,
    },
  });
  if (activeSubmission == null) {
    return;
  }

  await prisma.artistSubmission.update({
    data: {
      status: "ApprovedWithoutVoting",
    },
    where: {
      id: activeSubmission.id,
    },
  });
}
