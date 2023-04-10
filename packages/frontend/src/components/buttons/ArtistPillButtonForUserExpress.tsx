import ArtistPillButton, {
  Props as ArtistPillButtonProps,
} from "components/buttons/ArtistPillButton";
import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { ArtistPillButtonForUserExpress_UserExpress$key } from "components/buttons/__generated__/ArtistPillButtonForUserExpress_UserExpress.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";

const fragment = graphql`
  fragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {
    username

    ProfilePhoto {
      photoUrl
    }
  }
`;

type Props = {
  collabSrcs?: Array<Maybe<string>>;
  truncate?: boolean;
  type?: ArtistPillButtonProps["type"];
  user: ArtistPillButtonForUserExpress_UserExpress$key;
};

export default function ArtistPillButtonForUserExpress({
  collabSrcs,
  truncate,
  type,
  user,
}: Props): JSX.Element {
  const userData = useFragment(fragment, user);

  // TODO[@arcticmatt]: remove this after figuring out root cause
  if (userData == null) {
    logError(
      AnalyticsEvent.RelayUnexpectedUndefined,
      "Unexpected undefined in ArtistPillButtonForUserExpress",
      {
        userData,
      }
    );
    return (
      <ArtistPillButton
        collabSrcs={collabSrcs}
        name=""
        src={null}
        truncate={truncate}
        type={type}
      />
    );
  }

  return (
    <ArtistPillButton
      collabSrcs={collabSrcs}
      name={userData.username}
      src={userData.ProfilePhoto?.photoUrl}
      truncate={truncate}
      type={type}
    />
  );
}
