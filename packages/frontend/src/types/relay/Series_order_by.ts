import graphql from "babel-plugin-relay/macro";
import { Series_order_by } from "types/relay/__generated__/SeriesOrderByQuery.graphql";

const _fragment = graphql`
  query SeriesOrderByQuery($seriesOrderBy: [Series_order_by!]) {
    Series(order_by: $seriesOrderBy) {
      # eslint-disable-next-line relay/unused-fields
      id
    }
  }
`;

export default Series_order_by;
