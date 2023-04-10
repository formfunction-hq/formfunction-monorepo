import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

/**
 * IMPORTANT: keep values in sync with the RequestType DB table.
 */
const RequestStatusGqlType = new GraphQLEnumType({
  name: Typename.RequestStatus,
  values: {
    Approved: {},
    Pending: {},
    Rejected: {},
  },
});

export default RequestStatusGqlType;
