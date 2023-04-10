import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// Keep in sync with PostVisibility DB enum
const PostVisibilityGqlType = new GraphQLEnumType({
  name: Typename.PostVisibility,
  values: {
    CampaignSupportersOnly: {},
    Public: {},
  },
});

export default PostVisibilityGqlType;
