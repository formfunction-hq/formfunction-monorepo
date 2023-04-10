import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const RedirectLocationGqlType = new GraphQLEnumType({
  name: Typename.RedirectLocation,
  values: {
    Apply: {},
    EditProfile: {},
    Profile: {},
  },
});

export default RedirectLocationGqlType;
