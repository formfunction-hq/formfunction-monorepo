import Typename from "src/types/enums/Typename";
import { ActivityNotificationLinkAction } from "src/__generated__/generated";

export default function getActivityNotificationLinkAction(
  link: string,
  text: string
): ActivityNotificationLinkAction {
  return {
    __typename: Typename.ActivityNotificationLinkAction,
    href: link,
    text,
  };
}
