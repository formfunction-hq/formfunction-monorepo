import { GraphQLObjectType } from "graphql";
import IPostGqlType, { IPOST_FIELDS } from "src/schema/interface/IPostGqlType";
import Typename from "src/types/enums/Typename";

const PostTextOnlyGqlType = new GraphQLObjectType({
  description: "Text only post with no assets",
  fields: IPOST_FIELDS,
  interfaces: [IPostGqlType],
  name: Typename.PostTextOnly,
});

export default PostTextOnlyGqlType;
