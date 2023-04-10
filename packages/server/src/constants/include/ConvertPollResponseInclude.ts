import { Prisma } from "@prisma/client";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

const CONVERT_POLL_RESPONSE_INCLUDE = {
  User: { include: CONVERT_USER_INCLUDE },
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.PollResponseInclude;

export default CONVERT_POLL_RESPONSE_INCLUDE;
