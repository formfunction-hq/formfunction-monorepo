import { Prisma } from "@prisma/client";
import CONVERT_POLL_OPTION_INCLUDE from "src/constants/include/ConvertPollOptionInclude";

const CONVERT_POLL_INCLUDE = {
  PollOption: { include: CONVERT_POLL_OPTION_INCLUDE },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.PollInclude;

export default CONVERT_POLL_INCLUDE;
