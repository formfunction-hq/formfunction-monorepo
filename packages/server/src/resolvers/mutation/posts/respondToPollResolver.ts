import MyContext from "src/types/MyContext";
import {
  RespondToPollInput,
  RespondToPollResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import invariant from "tiny-invariant";
import convertPoll from "src/utils/convert/convertPoll";
import CONVERT_POLL_INCLUDE from "src/constants/include/ConvertPollInclude";
import filterNulls from "formfn-shared/dist/utils/filterNulls";

export default async function respondToPollResolver(
  context: MyContext,
  input: RespondToPollInput
): Promise<RespondToPollResponse> {
  const verifiedPublicKey = assertUserSignedRequest(
    context,
    "Please sign in to respond to this poll"
  );
  const { pollOptionId, responseValue } = input;
  const viewerId = verifiedPublicKey.toString();

  const prisma = getPrisma();
  const poll = await prisma.poll.findFirst({
    include: CONVERT_POLL_INCLUDE,
    where: { PollOption: { some: { id: pollOptionId } } },
  });
  invariant(poll != null, "Poll does not exist");

  const otherPollOptionsRespondedToByViewer = poll.PollOption!.filter(
    (pollOption) =>
      pollOption.PollResponse.some(
        (response) =>
          pollOptionId !== pollOption.id && response.userId === viewerId
      )
  );
  const shouldDeleteOtherPollResponses =
    poll.isMultiSelect === false &&
    otherPollOptionsRespondedToByViewer.length > 0;
  const deleteOtherPollResponsesQuery = shouldDeleteOtherPollResponses
    ? prisma.pollResponse.deleteMany({
        where: {
          pollOptionId: {
            in: otherPollOptionsRespondedToByViewer.map(({ id }) => id),
          },
          userId: viewerId,
        },
      })
    : null;
  const updatePollResponseQuery =
    responseValue === true
      ? prisma.pollResponse.create({
          data: { pollOptionId, userId: viewerId },
        })
      : prisma.pollResponse.delete({
          where: {
            userId_pollOptionId: { pollOptionId, userId: viewerId },
          },
        });

  await prisma.$transaction(
    filterNulls([deleteOtherPollResponsesQuery, updatePollResponseQuery])
  );

  const updatedPoll = await prisma.poll.findUnique({
    include: CONVERT_POLL_INCLUDE,
    where: { id: poll.id },
  });
  invariant(updatedPoll != null, "Poll should exist");

  return {
    __typename: Typename.RespondToPollResponse,
    poll: convertPoll(updatedPoll, viewerId),
  };
}
