import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import flashbackForUsernameResolver from "src/resolvers/query/flashback/flashbackForUsernameResolver";
import flashbackForViewerResolver from "src/resolvers/query/flashback/flashbackForViewerResolver";
import FlashbackForUsernameInputGqlType from "src/schema/input/flashback/FlashbackForUsernameInputGqlType";
import FlashbackForViewerInputGqlType from "src/schema/input/flashback/FlashbackForViewerInputGqlType";
import FlashbackForUsernameResponseGqlType from "src/schema/object/response/flashback/FlashbackForUsernameResponseGqlType";
import FlashbackForViewerResponseGqlType from "src/schema/object/response/flashback/FlashbackForViewerResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  FlashbackForUsernameInput,
  FlashbackForUsernameResponse,
  FlashbackForViewerInput,
  FlashbackForViewerResponse,
} from "src/__generated__/generated";

const FlashbackQueriesResponseGqlType = new GraphQLObjectType({
  fields: {
    flashbackForUsername: {
      args: {
        input: { type: gqlNonNull(FlashbackForUsernameInputGqlType) },
      },
      resolve(
        _source,
        { input }: { input: FlashbackForUsernameInput },
        context: MyContext
      ): Promise<FlashbackForUsernameResponse> {
        return logErrorsForResolver(context.req, () =>
          flashbackForUsernameResolver(context, input)
        );
      },
      type: gqlNonNull(FlashbackForUsernameResponseGqlType),
    },
    flashbackForViewer: {
      args: {
        input: { type: gqlNonNull(FlashbackForViewerInputGqlType) },
      },
      resolve(
        _source,
        { input }: { input: FlashbackForViewerInput },
        context: MyContext
      ): Promise<FlashbackForViewerResponse> {
        return logErrorsForResolver(context.req, () =>
          flashbackForViewerResolver(context, input)
        );
      },
      type: gqlNonNull(FlashbackForViewerResponseGqlType),
    },
  },
  name: Typename.FlashbackQueriesResponse,
});

export default FlashbackQueriesResponseGqlType;
