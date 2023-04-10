import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import {
  ManualApprovalSubmissionCardButtonsMutation,
  VoteReason_enum,
  VoteType_enum,
} from "components/pages/vote/manual-approval/__generated__/ManualApprovalSubmissionCardButtonsMutation.graphql";
import { ManualApprovalSubmissionCardButtons_ArtistSubmission$key } from "components/pages/vote/manual-approval/__generated__/ManualApprovalSubmissionCardButtons_ArtistSubmission.graphql";
import styles from "css/pages/vote/manual-approval/ManualApprovalSubmissionCardButtons.module.css";
import useUserContext from "hooks/useUserContext";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const fragment = graphql`
  fragment ManualApprovalSubmissionCardButtons_ArtistSubmission on ArtistSubmission {
    id
  }
`;

const mutation = graphql`
  mutation ManualApprovalSubmissionCardButtonsMutation(
    $object: Vote_insert_input!
  ) {
    insert_Vote_one(object: $object) {
      id
    }
  }
`;

type Props = {
  artistSubmission: ManualApprovalSubmissionCardButtons_ArtistSubmission$key;
  onNext: () => void;
};

export default function ManualApprovalSubmissionCardButtons({
  artistSubmission,
  onNext,
}: Props) {
  const { user } = useUserContext();
  const artistSubmissionData = useFragment(fragment, artistSubmission);
  const [commit, inFlight] =
    useMutation<ManualApprovalSubmissionCardButtonsMutation>(mutation);
  const [whichButton, setWhichButton] =
    useState<Maybe<"breaks_guidelines" | "reject" | "approve">>(null);

  const genericCommit = (voteType: VoteType_enum, reason?: VoteReason_enum) => {
    commit({
      onCompleted: () => {
        onNext();
      },
      onError: () => {
        notifyUnexpectedError();
      },
      variables: {
        object: {
          artistSubmissionId: artistSubmissionData.id,
          reason,
          userId: user!.id,
          voteType,
        },
      },
    });
  };

  return (
    <div className={styles.buttons}>
      <ButtonWithText
        buttonTheme={ButtonTheme.Red}
        className={styles.button}
        disabled={inFlight}
        fontClass={FontClass.NavLink}
        isLoading={inFlight && whichButton === "breaks_guidelines"}
        onClick={() => {
          setWhichButton("breaks_guidelines");
          genericCommit("Reject", "BreaksGuidelines");
        }}
      >
        Breaks guidelines
      </ButtonWithText>
      <ButtonWithText
        buttonTheme={ButtonTheme.Red}
        className={styles.button}
        disabled={inFlight}
        fontClass={FontClass.NavLink}
        isLoading={inFlight && whichButton === "reject"}
        onClick={() => {
          setWhichButton("reject");
          genericCommit("Reject");
        }}
      >
        Reject
      </ButtonWithText>
      <ButtonWithText
        buttonTheme={ButtonTheme.BrightPurpleOutline}
        className={styles.button}
        disabled={inFlight}
        fontClass={FontClass.NavLink}
        isLoading={inFlight && whichButton === "approve"}
        onClick={() => {
          setWhichButton("approve");
          genericCommit("Approve");
        }}
      >
        Approve
      </ButtonWithText>
    </div>
  );
}
