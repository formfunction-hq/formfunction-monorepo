import { GraphQLID, GraphQLInputObjectType } from "graphql";
import { CREATE_AIRDROPS_COMMON_INPUT_FIELDS } from "src/schema/input/airdrop/CreateAirdropsInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CreateAirdropsForCampaignInputGqlType = new GraphQLInputObjectType({
  fields: {
    ...CREATE_AIRDROPS_COMMON_INPUT_FIELDS,
    campaignId: { type: gqlNonNull(GraphQLID) },
    fundingTierIds: {
      description:
        "Specific funding tiers may be specified to only airdrop to holders of those tiers",
      type: gqlListOfNonNull(GraphQLID),
    },
  },
  name: Typename.CreateAirdropsForCampaignInput,
});

export default CreateAirdropsForCampaignInputGqlType;
