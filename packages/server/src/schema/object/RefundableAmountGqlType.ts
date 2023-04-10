import { GraphQLObjectType, GraphQLString } from "graphql";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import PriceGqlType from "src/schema/object/PriceGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const RefundableAmountGqlType = new GraphQLObjectType({
  fields: {
    amount: { type: gqlNonNull(PriceGqlType) },
    amountInLamports: { type: gqlNonNull(BigintScalarGqlType) },
    metadataAccount: { type: gqlNonNull(MetadataAccountGqlType) },
    userId: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.RefundableAmount,
});

export default RefundableAmountGqlType;
