import { GraphQLFieldConfig } from "graphql";
import NotificationsNamespaceResponseGqlType from "src/schema/object/response/notifications/NotificationsNamespaceResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const notificationsNamespaceQueryField: GraphQLFieldConfig<unknown, any> = {
  description: "Namespace field for notification related queries.",
  resolve: () => ({}),
  type: gqlNonNull(NotificationsNamespaceResponseGqlType),
};

export default notificationsNamespaceQueryField;
