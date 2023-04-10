import { GraphQLID, GraphQLString } from "graphql";

const DEFAULT_USER_INPUT_PARAMS = {
  userId: {
    description: "One of userId and username must be non-null",
    type: GraphQLID,
  },
  username: {
    description: "One of userId and username must be non-null",
    type: GraphQLString,
  },
};

export default DEFAULT_USER_INPUT_PARAMS;
