import { GraphQLInputObjectType } from "graphql";
import SERIES_INPUT_FIELDS from "src/constants/graphql/SeriesInputFields";
import Typename from "src/types/enums/Typename";

const SeriesStatsInputGqlType = new GraphQLInputObjectType({
  fields: SERIES_INPUT_FIELDS,
  name: Typename.SeriesStatsInput,
});

export default SeriesStatsInputGqlType;
