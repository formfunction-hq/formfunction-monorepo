import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import {
  PrescreenSubmissionCardButtonsMutation,
  VoteReason_enum,
  VoteType_enum,
} from "components/pages/vote/prescreen/__generated__/PrescreenSubmissionCardButtonsMutation.graphql";
import { PrescreenSubmissionCardButtonsQuery } from "components/pages/vote/prescreen/__generated__/PrescreenSubmissionCardButtonsQuery.graphql";
import { PrescreenSubmissionCardButtons_ArtistSubmission$key } from "components/pages/vote/prescreen/__generated__/PrescreenSubmissionCardButtons_ArtistSubmission.graphql";
import { notify } from "components/toast/notifications";
import styles from "css/pages/vote/prescreen/PrescreenSubmissionCardButtons.module.css";
import useUserContext from "hooks/useUserContext";
import { useState } from "react";
import { fetchQuery, useFragment, useMutation } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const fragment = graphql`
  fragment PrescreenSubmissionCardButtons_ArtistSubmission on ArtistSubmission {
    id
  }
`;

const mutation = graphql`
  mutation PrescreenSubmissionCardButtonsMutation($object: Vote_insert_input!) {
    insert_Vote_one(object: $object) {
      id
    }
  }
`;

const query = graphql`
  query PrescreenSubmissionCardButtonsQuery($where: Vote_bool_exp!) {
    Vote(where: $where) {
      id
    }
  }
`;

type Props = {
  artistSubmission: PrescreenSubmissionCardButtons_ArtistSubmission$key;
  onNext: () => void;
};

export default function PrescreenSubmissionCardButtons({
  artistSubmission,
  onNext,
}: Props) {
  const { user } = useUserContext();
  const artistSubmissionData = useFragment(fragment, artistSubmission);
  const [commit] =
    useMutation<PrescreenSubmissionCardButtonsMutation>(mutation);
  const [whichButton, setWhichButton] =
    useState<Maybe<"breaks_guidelines" | "low_quality" | "pass" | "duplicate">>(
      null
    );
  const [isLoading, setIsLoading] = useState(false);

  const genericCommit = async (
    voteType: VoteType_enum,
    reason?: VoteReason_enum
  ) => {
    // Check to see if another person has pre-screened already.
    const prescreenVotes =
      await fetchQuery<PrescreenSubmissionCardButtonsQuery>(
        RelayEnvironment,
        query,
        {
          where: {
            artistSubmissionId: {
              _eq: artistSubmissionData.id,
            },
            voteType: {
              _in: ["PrescreenApprove", "PrescreenReject"],
            },
          },
        }
      ).toPromise();

    if ((prescreenVotes?.Vote.length ?? 0) > 0) {
      notify({
        description: "Please refresh the page",
        message: "Another person has already pre-screened this submission",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    commit({
      onCompleted: () => {
        setIsLoading(false);
        onNext();
      },
      onError: () => {
        setIsLoading(false);
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
        fontClass={FontClass.NavLink}
        isLoading={isLoading && whichButton === "breaks_guidelines"}
        onClick={() => {
          setWhichButton("breaks_guidelines");
          setIsLoading(true);
          genericCommit("PrescreenReject", "BreaksGuidelines");
        }}
      >
        Breaks guidelines
      </ButtonWithText>
      <ButtonWithText
        buttonTheme={ButtonTheme.Red}
        className={styles.button}
        fontClass={FontClass.NavLink}
        isLoading={isLoading && whichButton === "low_quality"}
        onClick={() => {
          setWhichButton("low_quality");
          setIsLoading(true);
          genericCommit("PrescreenReject", "LowQuality");
        }}
      >
        Low quality
      </ButtonWithText>
      <ButtonWithText
        buttonTheme={ButtonTheme.Red}
        className={styles.button}
        fontClass={FontClass.NavLink}
        isLoading={isLoading && whichButton === "duplicate"}
        onClick={() => {
          setWhichButton("duplicate");
          setIsLoading(true);
          genericCommit("PrescreenReject", "Duplicate");
        }}
      >
        Duplicate
      </ButtonWithText>
      <ButtonWithText
        buttonTheme={ButtonTheme.BrightPurpleOutline}
        className={styles.button}
        fontClass={FontClass.NavLink}
        isLoading={isLoading && whichButton === "pass"}
        onClick={() => {
          setWhichButton("pass");
          setIsLoading(true);
          genericCommit("PrescreenApprove");
        }}
      >
        Pass
      </ButtonWithText>
    </div>
  );
}
