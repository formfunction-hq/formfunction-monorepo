import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertPollType from "src/types/convert/ConvertPollType";
import Typename from "src/types/enums/Typename";
import convertPollOption from "src/utils/convert/convertPollOption";
import { PollExpress } from "src/__generated__/generated";

export default function convertPoll(
  poll: ConvertPollType,
  viewerId: Maybe<string>
): PollExpress {
  const { PollOption: pollOptions } = poll;
  const totalResponses = pollOptions.reduce(
    (accumulator, currentPollOption) =>
      accumulator + currentPollOption.PollResponse.length,
    0
  );
  const viewerRespondedToPoll = pollOptions.some((pollOption) =>
    pollOption.PollResponse.some(
      (pollResponse) => viewerId === pollResponse.userId
    )
  );

  return {
    __typename: Typename.Poll,
    id: poll.id,
    options: pollOptions.map((currentPollOption) =>
      convertPollOption(
        currentPollOption,
        viewerId,
        totalResponses,
        viewerRespondedToPoll
      )
    ),
    totalResponses,
    viewerRespondedToPoll,
  };
}
