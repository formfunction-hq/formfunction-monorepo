import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import { ActivityNotificationLinkActionButton_ActivityNotificationLinkAction$key } from "components/pages/activity/__generated__/ActivityNotificationLinkActionButton_ActivityNotificationLinkAction.graphql";
import { useFragment } from "react-relay";
import AnchorTarget from "types/AnchorTarget";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";

const fragment = graphql`
  fragment ActivityNotificationLinkActionButton_ActivityNotificationLinkAction on ActivityNotificationLinkAction {
    href
    text
  }
`;

type Props = {
  action: ActivityNotificationLinkActionButton_ActivityNotificationLinkAction$key;
  target?: AnchorTarget;
  type?: "link_internal" | "link_external";
};

export default function ActivityNotificationLinkActionButton({
  action,
  target = "_self",
  type = "link_internal",
}: Props) {
  const actionData = useFragment(fragment, action);
  return (
    <ButtonWithText
      buttonTheme={ButtonTheme.PurpleGradient}
      fontClass={FontClass.Body1Medium}
      href={actionData.href}
      target={target}
      type={type}
    >
      {actionData.text}
    </ButtonWithText>
  );
}
