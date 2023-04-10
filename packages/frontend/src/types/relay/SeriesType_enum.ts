import graphql from "babel-plugin-relay/macro";
import { SeriesType_enum } from "types/relay/__generated__/SeriesTypeEnum_Series.graphql";

const _fragment = graphql`
  fragment SeriesTypeEnum_Series on Series {
    # eslint-disable-next-line relay/unused-fields
    type
  }
`;

export default SeriesType_enum;
