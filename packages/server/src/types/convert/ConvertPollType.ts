import { Poll } from "@prisma/client";
import ConvertPollOptionType from "src/types/convert/ConvertPollOptionType";

type ConvertPollType = Poll & {
  PollOption: Array<ConvertPollOptionType>;
};

export default ConvertPollType;
