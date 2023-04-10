import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  CreateSafetyCheckSubmissionInput,
  CreateSafetyCheckSubmissionResponse,
} from "src/__generated__/generated";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";
import getSafetyCheckReopenDate from "formfn-shared/dist/utils/safety-check/getSafetyCheckReopenDate";
import dayjs from "src/utils/dates/dayjsex";
import { User } from "@prisma/client";

async function canUserSubmit(
  userId: string,
  input: CreateSafetyCheckSubmissionInput
): Promise<User> {
  if (!input.isCopyrightVerified) {
    throw new Error("You must verify copyright");
  }

  const prisma = getPrisma();
  const [user, submissions] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: userId,
      },
    }),
    prisma.artistSubmission.findMany({
      orderBy: {
        timeCreated: "desc",
      },
      where: {
        userId,
      },
    }),
  ]);

  invariant(user != null);
  invariant(user.twitterName != null);
  if (user.isWhitelisted) {
    throw new Error("You are already approved as an artist");
  }

  const activeSubmission = submissions.find(
    ({ status }) => status === "VoteActive"
  );
  const mostRecentRejectedSubmission = submissions.find(
    ({ status }) => status === "Rejected"
  );
  const approvedSubmission = submissions.find(
    ({ status }) => status === "Approved"
  );

  if (approvedSubmission != null) {
    throw new Error("You already have an approved submission");
  }

  if (mostRecentRejectedSubmission?.timeCreated != null) {
    const reopenDate = getSafetyCheckReopenDate(
      dayjs(mostRecentRejectedSubmission.timeCreated)
    );
    if (dayjs().isBefore(reopenDate)) {
      throw new Error(
        `You must wait until ${reopenDate.format(
          "MMMM D, YYYY"
        )} to submit again`
      );
    }
  }

  if (activeSubmission != null) {
    throw new Error("You already has an active submission");
  }

  return user;
}

export default async function createSafetyCheckSubmissionResolver(
  context: MyContext,
  input: CreateSafetyCheckSubmissionInput
): Promise<CreateSafetyCheckSubmissionResponse> {
  const verifiedPublicKey = assertUserSignedRequest(context);
  const userId = verifiedPublicKey.toString();
  const prisma = getPrisma();
  const user = await canUserSubmit(userId, input);

  const submission = await prisma.artistSubmission.create({
    data: {
      Asset:
        input.processVideo == null
          ? undefined
          : {
              create: {
                ...input.processVideo,
                userId,
              },
            },
      User: {
        connect: {
          id: userId,
        },
      },
      artProcess: input.artProcess,
      artistStatement: "",
      discordHandle: user.discordHandle,
      // TODO[@arcticmatt]: if Instagram linking is added, we should take this from user
      instagramName: input.instagramName,
      isCopyrightVerified: input.isCopyrightVerified,
      twitterName: user.twitterName!,
      websiteUrl: input.websiteUrl,
    },
  });

  return {
    __typename: Typename.CreateSafetyCheckSubmissionResponse,
    id: submission.id,
  };
}
