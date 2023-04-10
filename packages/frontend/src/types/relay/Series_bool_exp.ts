import graphql from "babel-plugin-relay/macro";
import { Series_bool_exp } from "types/relay/__generated__/SeriesBoolExpQuery.graphql";

const _fragment = graphql`
  query SeriesBoolExpQuery($seriesWhere: Series_bool_exp!) {
    Series(where: $seriesWhere) {
      # eslint-disable-next-line relay/unused-fields
      id
    }
  }
`;

export default Series_bool_exp;
