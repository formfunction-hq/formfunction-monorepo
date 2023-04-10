import { GraphQLBoolean, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";

const MetadataAccountsForAidInputGqlType = new GraphQLInputObjectType({
  fields: {
    isExperimental: { defaultValue: false, type: GraphQLBoolean },
  },
  name: Typename.MetadataAccountsForAidInput,
});

export default MetadataAccountsForAidInputGqlType;
