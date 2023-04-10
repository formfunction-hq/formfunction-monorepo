import ActivityNotificationInfoCircle from "components/pages/activity/ActivityNotificationInfoCircle";
import GenericNotificationContainer from "components/pages/activity/GenericNotificationContainer";
import { Dayjs } from "dayjs";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

type Props = {
  actionButton?: MaybeUndef<JSX.Element>;
  asset?: JSX.Element;
  label: string | JSX.Element;
  timestamp: Dayjs;
};

export default function SystemNotificationContainer({
  actionButton,
  asset,
  label,
  timestamp,
}: Props) {
  return (
    <GenericNotificationContainer
      actionButton={actionButton}
      asset={asset}
      label={label}
      left={<ActivityNotificationInfoCircle />}
      timestamp={timestamp}
    />
  );
}
