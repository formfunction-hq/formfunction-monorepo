import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertPollOptionType from "src/types/convert/ConvertPollOptionType";
import Typename from "src/types/enums/Typename";
import { PollOptionExpress } from "src/__generated__/generated";

export default function convertPollOption(
  pollOption: ConvertPollOptionType,
  viewerId: Maybe<string>,
  totalResponses: number,
  viewerRespondedToPoll: boolean
): PollOptionExpress {
  const { PollResponse: pollResponses } = pollOption;

  const viewerRespondedToPollOption =
    viewerId != null
      ? pollResponses.some((pollResponse) => pollResponse.userId === viewerId)
      : null;

  const responseCount = pollResponses.length;
  const responsePercentage =
    totalResponses === 0 || !viewerRespondedToPoll
      ? null
      : // Is this the best way to calculate responsePercentage
        Math.floor((responseCount / totalResponses) * 100);

  return {
    ...pollOption,
    __typename: Typename.PollOption,
    responseCount,
    responsePercentage,
    viewerRespondedToPoll,
    viewerRespondedToPollOption,
  };
}
