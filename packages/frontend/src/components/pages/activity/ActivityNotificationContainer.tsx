import ProfilePhotoCircle from "components/images/ProfilePhotoCircle";
import GenericNotificationContainer from "components/pages/activity/GenericNotificationContainer";
import { Dayjs } from "dayjs";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import { Link } from "react-router-dom";

type Props = {
  actionButton?: MaybeUndef<JSX.Element>;
  asset?: JSX.Element;
  label: string | JSX.Element;
  profilePhotoInfo: {
    photoUrl?: MaybeUndef<string>;
    username: string;
  };
  timestamp: Dayjs;
};

export default function ActivityNotificationContainer({
  actionButton,
  asset,
  label,
  profilePhotoInfo,
  timestamp,
}: Props) {
  const left = (
    <Link to={getUserProfileLinkRelative(profilePhotoInfo!.username)}>
      <ProfilePhotoCircle src={profilePhotoInfo!.photoUrl} width={48} />
    </Link>
  );

  return (
    <GenericNotificationContainer
      actionButton={actionButton}
      asset={asset}
      label={label}
      left={left}
      timestamp={timestamp}
    />
  );
}
