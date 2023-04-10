import { PollOption, PollResponse } from "@prisma/client";

type ConvertPollOptionType = PollOption & {
  PollResponse: Array<PollResponse>;
};

export default ConvertPollOptionType;
