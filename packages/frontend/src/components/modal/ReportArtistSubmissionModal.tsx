import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import GenericModal from "components/modal/GenericModal";
import Body1 from "components/text/Body1";
import styles from "css/modal/ReportArtistSubmissionModal.module.css";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import useUserContext from "hooks/useUserContext";
import { ReportArtistSubmissionModal_ArtistSubmission$key } from "components/modal/__generated__/ReportArtistSubmissionModal_ArtistSubmission.graphql";
import { ReportArtistSubmissionModalInsertVoteMutation } from "components/modal/__generated__/ReportArtistSubmissionModalInsertVoteMutation.graphql";
import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import { range } from "formfn-shared/dist/utils/range";
import CheckboxButtonWithTextInput from "components/buttons/CheckboxButtonWithTextInput";
import ArtName from "components/text/ArtName";
import {
  OTHER_REASON_PREFIX,
  TWITTER_ACCOUNT_TOO_NEW,
  VERY_FEW_FOLLOWERS,
  ART_SAMPLES_DO_NOT_MATCH,
  ARTIST_NOT_APPLICANT,
} from "constants/ArtistSubmissionReportLabels";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const fragment = graphql`
  fragment ReportArtistSubmissionModal_ArtistSubmission on ArtistSubmission {
    id
  }
`;

const mutation = graphql`
  mutation ReportArtistSubmissionModalInsertVoteMutation(
    $input: Vote_insert_input!
  ) {
    insert_Vote_one(object: $input) {
      id
    }
  }
`;

type Props = {
  artistSubmission: ReportArtistSubmissionModal_ArtistSubmission$key;
  isShown: boolean;
  onHide: () => void;
  onSuccess: () => void;
};

const CHECKBOXES = [
  {
    label: TWITTER_ACCOUNT_TOO_NEW,
    reason: "TwitterAccountTooNew",
  },
  {
    label: VERY_FEW_FOLLOWERS,
    reason: "VeryFewFollowers",
  },
  {
    label: ART_SAMPLES_DO_NOT_MATCH,
    reason: "ArtSamplesDoNotMatch",
  },
  {
    label: ARTIST_NOT_APPLICANT,
    reason: "ArtistNotApplicant",
  },
];

const DEFAULT_CHECKBOX_STATE = range(CHECKBOXES.length).map((_) => false);

export default function ReportArtistSubmissionModal({
  isShown,
  artistSubmission,
  onHide,
  onSuccess,
}: Props): JSX.Element {
  const [commit, inFlight] =
    useMutation<ReportArtistSubmissionModalInsertVoteMutation>(mutation);
  const artistSubmissionData = useFragment(fragment, artistSubmission);
  const { user } = useUserContext();
  const [checkboxState, setCheckboxState] = useState(DEFAULT_CHECKBOX_STATE);
  const [otherReasonClicked, setOtherReasonClicked] = useState(false);
  const [otherReason, setOtherReason] = useState("");

  const onSubmit = () => {
    commit({
      onCompleted: () => {
        onHide();
        setCheckboxState(DEFAULT_CHECKBOX_STATE);
        setOtherReason("");
        onSuccess();
      },
      onError: () => {
        notifyUnexpectedError();
      },
      variables: {
        input: {
          artistSubmissionId: artistSubmissionData.id,
          reportReasons: [
            ...CHECKBOXES.filter((_, i) => checkboxState[i] === true).map(
              (val) => val.reason
            ),
            ...(otherReason !== ""
              ? // Because of how Hasura's search over JSON arrays work, we need to insert
                // `OTHER_REASON_PREFIX` as a marker to know which votes have other reasons.
                // See SubmissionCardReportCard for more details
                [OTHER_REASON_PREFIX, `${OTHER_REASON_PREFIX}: ${otherReason}`]
              : []),
          ],
          userId: user!.id,
          voteType: "ReportSubmission",
        },
      },
    });
  };

  return (
    <GenericModal isShown={isShown} onHide={onHide} title="Flag as suspicious?">
      <div className={styles.body}>
        <Body1 colorClass={ColorClass.Secondary} textAlign="center">
          You can flag this application as suspicious if you think it may be a
          case of art theft. The Formfunction team will do a deeper
          investigation into flagged applications.
        </Body1>
        <ArtName
          colorClass={ColorClass.Primary}
          className={styles.checkboxHeader}
          textAlign="left"
        >
          Why are you flagging this application?
        </ArtName>
        <div className={styles.checkboxes}>
          {CHECKBOXES.map((checkbox, i) => (
            <CheckboxButtonWithLabel
              fontClass={FontClass.Body1}
              isActive={checkboxState[i]}
              onClick={() =>
                setCheckboxState([
                  ...checkboxState.slice(0, i),
                  !checkboxState[i],
                  ...checkboxState.slice(i + 1, checkboxState.length),
                ])
              }
              noBorder
              label={checkbox.label}
            />
          ))}
          <CheckboxButtonWithTextInput
            className={styles.otherReasonInput}
            isActive={otherReason !== "" || otherReasonClicked}
            onClick={() => setOtherReasonClicked(!otherReasonClicked)}
            value={otherReason}
            placeholder="Other reason, or provide more detail here (e.g., links to original art)"
            onChange={(val) => setOtherReason(val)}
          />
        </div>
        <div className={styles.buttons}>
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            className={styles.submitButton}
            fontClass={FontClass.NavLink}
            onClick={onSubmit}
            isLoading={inFlight}
          >
            Submit
          </ButtonWithText>
        </div>
      </div>
    </GenericModal>
  );
}
