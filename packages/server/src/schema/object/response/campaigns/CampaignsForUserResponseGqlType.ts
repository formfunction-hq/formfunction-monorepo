import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType } from "graphql";
import DEFAULT_CONNECTION_PARAMS_V2 from "src/constants/graphql/DefaultConnectionParamsV2";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import campaignsForUserConnectionResolver from "src/resolvers/query/nested/campaigns/campaignsForUserConnectionResolver";
import CampaignsForUserInputGqlType from "src/schema/input/campaigns/CampaignsForUserInputGqlType";
import CampaignsConnectionGqlType from "src/schema/object/pagination/CampaignsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CampaignsConnection,
  CampaignsForUserInput,
} from "src/__generated__/generated";

const CampaignsForUserResponseGqlType = new GraphQLObjectType({
  fields: {
    campaigns: {
      args: {
        ...DEFAULT_CONNECTION_PARAMS_V2,

        // Application-specific
        input: { type: gqlNonNull(CampaignsForUserInputGqlType) },
      },
      async resolve(
        _source,
        {
          after,
          first,
          input,
        }: {
          after?: Maybe<string>;
          first: number;
          input: CampaignsForUserInput;
        },
        context: MyContext
      ): Promise<CampaignsConnection> {
        return logErrorsForResolver<CampaignsConnection>(context.req, () =>
          campaignsForUserConnectionResolver(
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
  name: Typename.CampaignsForUserResponse,
});

export default CampaignsForUserResponseGqlType;
