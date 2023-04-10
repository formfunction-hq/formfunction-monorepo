import { Prisma } from "@prisma/client";
import dayjs from "src/utils/dates/dayjsex";

export default function getUnusedInviteWhere(
  currentTime: dayjs.Dayjs,
  ownerId: string
): Prisma.CreatorInviteWhereInput {
  return {
    expirationTime: { gte: currentTime.toDate() },
    ownerId,
    receiverEmail: null,
    receiverId: null,
  };
}
