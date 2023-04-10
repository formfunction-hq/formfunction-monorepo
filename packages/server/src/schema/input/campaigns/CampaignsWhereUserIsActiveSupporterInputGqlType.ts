import { GraphQLInputObjectType } from "graphql";
import DEFAULT_USER_INPUT_PARAMS from "src/constants/graphql/DefaultUserInputParams";
import CampaignStatusGqlType from "src/schema/enum/campaigns/CampaignStatusGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const CampaignsWhereUserIsActiveSupporterInputGqlType =
  new GraphQLInputObjectType({
    fields: {
      ...DEFAULT_USER_INPUT_PARAMS,
      statuses: {
        description:
          "A list of statuses to filter by. If null or empty, default filtering will be applied",
        type: gqlListOfNonNull(CampaignStatusGqlType),
      },
    },
    name: Typename.CampaignsWhereUserIsActiveSupporterInput,
  });

export default CampaignsWhereUserIsActiveSupporterInputGqlType;
