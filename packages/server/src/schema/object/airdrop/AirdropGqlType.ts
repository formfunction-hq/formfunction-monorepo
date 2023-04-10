import { GraphQLID, GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import AirdropTypeGqlType from "src/schema/enum/AirdropTypeGqlType";
import UserGqlType from "src/schema/object/UserGqlType";

const AirdropGqlType = new GraphQLObjectType({
  fields: {
    id: { type: gqlNonNull(GraphQLID) },
    toUser: { type: gqlNonNull(UserGqlType) },
    type: { type: gqlNonNull(AirdropTypeGqlType) },
  },
  name: Typename.Airdrop,
});

export default AirdropGqlType;
