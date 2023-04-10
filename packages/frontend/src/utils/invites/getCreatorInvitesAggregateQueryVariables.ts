import dayjs from "utils/dates/dayjsex";

export default function getCreatorInvitesAggregateQueryVariables(
  currentTime: dayjs.Dayjs,
  ownerId: string
) {
  return {
    where: {
      expirationTime: { _gt: currentTime.toISOString() },
      ownerId: { _eq: ownerId },
      receiverEmail: { _is_null: true },
      receiverId: { _is_null: true },
    },
  };
}
