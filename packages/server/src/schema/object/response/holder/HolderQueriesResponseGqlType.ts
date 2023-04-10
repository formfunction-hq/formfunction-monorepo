import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import holdersForUserResolver from "src/resolvers/query/nested/holder/holdersForUserResolver";
import seriesHoldersForUserResolver from "src/resolvers/query/nested/holder/seriesHoldersForUserResolver";
import HoldersForUserInputGqlType from "src/schema/input/holder/HoldersForUserInputGqlType";
import SeriesHoldersForUserInputGqlType from "src/schema/input/holder/SeriesHoldersForUserInputGqlType";
import HoldersForUserResponseGqlType from "src/schema/object/response/holder/HoldersForUserResponseGqlType";
import SeriesHoldersForUserResponseGqlType from "src/schema/object/response/holder/SeriesHoldersForUserResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  HoldersForUserInput,
  HoldersForUserResponse,
  SeriesHoldersForUserInput,
  SeriesHoldersForUserResponse,
} from "src/__generated__/generated";

const HolderQueriesResponseGqlType = new GraphQLObjectType({
  fields: {
    holdersForUser: {
      args: { input: { type: gqlNonNull(HoldersForUserInputGqlType) } },
      resolve(
        _source,
        { input }: { input: HoldersForUserInput },
        context: MyContext
      ): Promise<HoldersForUserResponse> {
        return logErrorsForResolver(context.req, () =>
          holdersForUserResolver(context, input)
        );
      },
      type: gqlNonNull(HoldersForUserResponseGqlType),
    },
    seriesHoldersForUser: {
      args: { input: { type: gqlNonNull(SeriesHoldersForUserInputGqlType) } },
      resolve(
        _source,
        { input }: { input: SeriesHoldersForUserInput },
        context: MyContext
      ): Promise<SeriesHoldersForUserResponse> {
        return logErrorsForResolver(context.req, () =>
          seriesHoldersForUserResolver(context, input)
        );
      },
      type: gqlNonNull(SeriesHoldersForUserResponseGqlType),
    },
  },
  name: Typename.HolderQueriesResponse,
});

export default HolderQueriesResponseGqlType;
