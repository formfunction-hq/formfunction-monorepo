import Series_bool_exp from "types/relay/Series_bool_exp";
import Series_order_by from "types/relay/Series_order_by";

export default function getSeriesQueryArgs(userIdOrUsername: string): {
  seriesOrderBy: Array<Series_order_by>;
  seriesWhere: Series_bool_exp;
} {
  return {
    seriesOrderBy: [{ timeCreated: "desc" }],
    seriesWhere: {
      _or: [
        { creatorId: { _eq: userIdOrUsername } },
        { Creator: { username: { _eq: userIdOrUsername } } },
      ],
    },
  };
}
