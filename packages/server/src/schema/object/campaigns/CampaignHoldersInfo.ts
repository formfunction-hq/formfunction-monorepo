import { GraphQLObjectType } from "graphql";
import HolderGqlType from "src/schema/object/holder/HolderGqlType";
import CampaignFundingTierGqlType from "src/schema/union/CampaignFundingTierGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const CampaignFundingTierHoldersGqlType = new GraphQLObjectType({
  fields: {
    fundingTier: { type: gqlNonNull(CampaignFundingTierGqlType) },
    holders: { type: gqlNonNullListOfNonNull(HolderGqlType) },
  },
  name: Typename.CampaignFundingTierHolders,
});

export default CampaignFundingTierHoldersGqlType;
