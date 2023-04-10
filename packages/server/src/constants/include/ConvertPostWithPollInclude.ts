import { Prisma } from "@prisma/client";
import CONVERT_POLL_INCLUDE from "src/constants/include/ConvertPollInclude";
import CONVERT_POST_INCLUDE from "src/constants/include/ConvertPostInclude";

const CONVERT_POST_WITH_POLL_INCLUDE = {
  ...CONVERT_POST_INCLUDE,
  Poll: {
    include: CONVERT_POLL_INCLUDE,
  },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.PostInclude;

export default CONVERT_POST_WITH_POLL_INCLUDE;
