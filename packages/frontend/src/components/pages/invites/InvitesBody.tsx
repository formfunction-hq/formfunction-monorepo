import graphql from "babel-plugin-relay/macro";
import {
  InvitesBodyQuery,
  InvitesBodyQuery$data,
  InvitesBodyQuery$variables,
} from "components/pages/invites/__generated__/InvitesBodyQuery.graphql";
import Body1Medium from "components/text/Body1Medium";
import styles from "css/pages/invites/InvitesBody.module.css";
import useUserContext from "hooks/useUserContext";
import { useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import dayjs from "utils/dates/dayjsex";
import getCreatorInvitesAggregateQueryVariables from "utils/invites/getCreatorInvitesAggregateQueryVariables";
import InviteExistingUserAsCreatorBody from "components/invites/InviteExistingUserAsCreatorBody";
import pluralize from "formfn-shared/dist/utils/pluralize";
import InviteMode from "types/enums/InviteMode";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import InviteWithEmailBody from "components/invites/InviteWithEmailBody";
import PlainButton from "components/buttons/PlainButton";
import ArtName from "components/text/ArtName";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import ColorClass from "types/enums/ColorClass";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import ColorValue from "types/enums/ColorValue";
import Divider from "components/misc/Divider";
import IgnoreResponsiveContainerPadding from "components/containers/IgnoreResponsiveContainerPadding";
import getImgixUrl from "utils/getImgixUrl";
import MaybeImgix from "components/images/MaybeImgix";
import Imgix from "react-imgix";
import joinClasses from "utils/joinClasses";
import GlobalClass from "types/enums/GlobalClass";

const query = graphql`
  query InvitesBodyQuery($where: CreatorInvite_bool_exp!) {
    CreatorInvite_aggregate(where: $where) {
      aggregate {
        count
      }

      ...InviteExistingUserAsCreatorBody_CreatorInvite_aggregate
      ...InviteWithEmailBody_CreatorInvite_aggregate
    }
  }
`;

type Props = {
  // Pass in current time since if it is computed inside of this component
  // it will run into an infinite reload issue.
  currentTime: dayjs.Dayjs;
};

function SelectInviteMode({
  setInviteMode,
}: {
  setInviteMode: (inviteMode: InviteMode) => void;
}) {
  return (
    <div className={styles.selectInviteModeBody}>
      <ArtName textAlign="center" colorClass={ColorClass.Primary}>
        Does the person you&apos;re inviting have a Formfunction account
        already?
      </ArtName>
      <div className={styles.inviteModeSelect}>
        <PlainButton
          className={joinClasses(
            styles.inviteModeSelectButton,
            GlobalClass.CardAnimation
          )}
          onClick={() => setInviteMode(InviteMode.Conversion)}
          transparentBg={false}
        >
          <ArtName colorClass={ColorClass.Primary}>Yes</ArtName>
        </PlainButton>
        <PlainButton
          className={joinClasses(
            styles.inviteModeSelectButton,
            GlobalClass.CardAnimation
          )}
          onClick={() => setInviteMode(InviteMode.Email)}
          transparentBg={false}
        >
          <ArtName colorClass={ColorClass.Primary}>No</ArtName>
        </PlainButton>
      </div>
    </div>
  );
}

function Body({
  currentTime,
  inviteMode,
  queryData,
  queryVariables,
  setInviteMode,
}: {
  currentTime: dayjs.Dayjs;
  inviteMode: Maybe<InviteMode>;
  queryData: InvitesBodyQuery$data;
  queryVariables: InvitesBodyQuery$variables;
  setInviteMode: (inviteMode: Maybe<InviteMode>) => void;
}) {
  const backButton = (
    <TextButton
      buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
      fontClass={FontClass.Body2}
      icon={<ArrowLeftIcon colorValue={ColorValue.BrightPurple} size={20} />}
      onClick={() => setInviteMode(null)}
    >
      Back
    </TextButton>
  );

  switch (inviteMode) {
    case InviteMode.Conversion:
      return (
        <InviteExistingUserAsCreatorBody
          CreatorInvite_aggregate={queryData.CreatorInvite_aggregate}
          backButton={backButton}
          currentTime={currentTime}
        />
      );
    case InviteMode.Email:
      return (
        <InviteWithEmailBody
          CreatorInvite_aggregate={queryData.CreatorInvite_aggregate}
          backButton={backButton}
          queryVariables={queryVariables}
        />
      );
    case null:
      return <SelectInviteMode setInviteMode={setInviteMode} />;
    default:
      return assertUnreachable(inviteMode);
  }
}

export default function InvitesBody({ currentTime }: Props) {
  const { user } = useUserContext();
  const queryVariables = getCreatorInvitesAggregateQueryVariables(
    currentTime,
    user!.id
  );
  const invitesQueryData = useLazyLoadQuery<InvitesBodyQuery>(
    query,
    queryVariables
  );
  const numInvites =
    invitesQueryData?.CreatorInvite_aggregate?.aggregate?.count ?? 0;
  const [inviteMode, setInviteMode] = useState<Maybe<InviteMode>>(null);
  const noInvitesLeftImage = getImgixUrl(
    "illustrations/stressed-person-using-computer-at-desk.png"
  );

  return (
    <ResponsiveContainer>
      <div className={styles.body}>
        <Body1Medium
          className={styles.numInvites}
          colorClass={ColorClass.Primary}
          textAlign="center"
        >
          You have {numInvites} {pluralize("invite", numInvites)} left.
        </Body1Medium>
        <IgnoreResponsiveContainerPadding>
          <Divider
            className={styles.divider}
            colorClass={ColorClass.Tertiary}
          />
        </IgnoreResponsiveContainerPadding>
        {numInvites === 0 ? (
          <div className={styles.noInvites}>
            <MaybeImgix src={noInvitesLeftImage}>
              <img className={styles.image} src={noInvitesLeftImage} />
              <Imgix className={styles.image} src={noInvitesLeftImage} />
            </MaybeImgix>
          </div>
        ) : (
          <Body
            currentTime={currentTime}
            inviteMode={inviteMode}
            queryData={invitesQueryData}
            queryVariables={queryVariables}
            setInviteMode={setInviteMode}
          />
        )}
      </div>
    </ResponsiveContainer>
  );
}
