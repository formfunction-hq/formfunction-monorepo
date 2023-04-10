import { GraphQLBoolean, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";

const MetadataAccountsFeaturedInputGqlType = new GraphQLInputObjectType({
  fields: {
    isExperimental: { defaultValue: false, type: GraphQLBoolean },
  },
  name: Typename.MetadataAccountsFeaturedInput,
});

export default MetadataAccountsFeaturedInputGqlType;
