import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import {
  SubmissionCardButtonsMutation,
  VoteType_enum,
} from "components/pages/vote/__generated__/SubmissionCardButtonsMutation.graphql";
import { SubmissionCardButtons_ArtistSubmission$key } from "components/pages/vote/__generated__/SubmissionCardButtons_ArtistSubmission.graphql";
import { notify } from "components/toast/notifications";
import styles from "css/pages/vote/SubmissionCardButtons.module.css";
import useUserContext from "hooks/useUserContext";
import { useEffect, useState } from "react";
import { useFragment, useMutation } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const fragment = graphql`
  fragment SubmissionCardButtons_ArtistSubmission on ArtistSubmission {
    id
  }
`;

const mutation = graphql`
  mutation SubmissionCardButtonsMutation($object: Vote_insert_input!) {
    insert_Vote_one(object: $object) {
      id
    }
  }
`;

type Props = {
  artistSubmission: SubmissionCardButtons_ArtistSubmission$key;
  onNext: () => void;
};

export default function SubmissionCardButtons({
  artistSubmission,
  onNext,
}: Props) {
  const { user } = useUserContext();
  const artistSubmissionData = useFragment(fragment, artistSubmission);
  const [commit, inFlight] =
    useMutation<SubmissionCardButtonsMutation>(mutation);
  const [whichButton, setWhichButton] =
    useState<Maybe<"skip" | "upvote">>(null);
  const [isWaitingPeriodOver, setIsWaitingPeriodOver] = useState(false);
  useEffect(() => {
    setIsWaitingPeriodOver(false);
    const timeout = setTimeout(() => setIsWaitingPeriodOver(true), 2000);

    return () => clearTimeout(timeout);
  }, [artistSubmissionData.id]);

  const genericCommit = (voteType: VoteType_enum) => {
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
          userId: user!.id,
          voteType,
        },
      },
    });
  };

  const notifyTooFast = () => {
    notify({
      description: "Please take more time to look over this submission",
      duration: 2,
      message: "You are voting too fast",
      type: "warning",
    });
  };

  return (
    <div className={styles.buttons}>
      <ButtonWithText
        buttonTheme={ButtonTheme.BrightPurpleOutline}
        className={styles.button}
        disabled={inFlight}
        fontClass={FontClass.NavLink}
        isLoading={inFlight && whichButton === "skip"}
        onClick={() => {
          if (!isWaitingPeriodOver) {
            notifyTooFast();
            return;
          }

          setWhichButton("skip");
          genericCommit("Skip");
        }}
      >
        Downvote
      </ButtonWithText>
      <ButtonWithText
        buttonTheme={ButtonTheme.BrightPurpleOutline}
        className={styles.button}
        disabled={inFlight}
        fontClass={FontClass.NavLink}
        isLoading={inFlight && whichButton === "upvote"}
        onClick={() => {
          if (!isWaitingPeriodOver) {
            notifyTooFast();
            return;
          }

          setWhichButton("upvote");
          genericCommit("Upvote");
        }}
      >
        Upvote
      </ButtonWithText>
    </div>
  );
}
