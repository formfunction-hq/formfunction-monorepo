import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType } from "graphql";
import DEFAULT_CONNECTION_PARAMS_V2 from "src/constants/graphql/DefaultConnectionParamsV2";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import campaignsForExploreConnectionResolver from "src/resolvers/query/nested/campaigns/campaignsForExploreConnectionResolver";
import CampaignsForExploreInputGqlType from "src/schema/input/campaigns/CampaignsForExploreInputGqlType";
import CampaignsConnectionGqlType from "src/schema/object/pagination/CampaignsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CampaignsConnection,
  CampaignsForExploreInput,
} from "src/__generated__/generated";

const CampaignsForExploreResponseGqlType = new GraphQLObjectType({
  fields: {
    campaigns: {
      args: {
        ...DEFAULT_CONNECTION_PARAMS_V2,

        // Application-specific
        input: { type: gqlNonNull(CampaignsForExploreInputGqlType) },
      },
      async resolve(
        _source,
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          after,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          first,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          input,
        }: {
          after?: Maybe<string>;
          first: number;
          input: CampaignsForExploreInput;
        },
        context: MyContext
      ): Promise<CampaignsConnection> {
        return logErrorsForResolver<CampaignsConnection>(context.req, () =>
          campaignsForExploreConnectionResolver(
            context,
            after ?? null,
            first,
            input
          )
        );
      },
      type: CampaignsConnectionGqlType,
    },
  },
  name: Typename.CampaignsForExploreResponse,
});

export default CampaignsForExploreResponseGqlType;
