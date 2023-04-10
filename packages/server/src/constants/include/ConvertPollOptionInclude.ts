import { Prisma } from "@prisma/client";
import CONVERT_POLL_RESPONSE_INCLUDE from "src/constants/include/ConvertPollResponseInclude";

const CONVERT_POLL_OPTION_INCLUDE = {
  PollResponse: { include: CONVERT_POLL_RESPONSE_INCLUDE },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.PollOptionInclude;

export default CONVERT_POLL_OPTION_INCLUDE;
