import graphql from "babel-plugin-relay/macro";
import { NotificationType_enum } from "types/relay/__generated__/NotificationTypeEnum_Notification.graphql";

const _fragment = graphql`
  fragment NotificationTypeEnum_Notification on Notification {
    # eslint-disable-next-line relay/unused-fields
    type
  }
`;

export default NotificationType_enum;
