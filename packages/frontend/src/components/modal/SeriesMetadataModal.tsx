import TextArea from "components/input/TextArea";
import ButtonWithText from "components/buttons/ButtonWithText";
import AddPhotoInput from "components/input/AddPhotoInput";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import TextInput from "components/input/TextInput";
import ErrorMessage from "components/text/ErrorMessage";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import GenericModal from "components/modal/GenericModal";
import styles from "css/modal/SeriesMetadataModal.module.css";
import { SeriesMetadataContext } from "context/SeriesMetadataContext";
import { useRef, useContext, useEffect, useState } from "react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { SeriesMetadataModalValidateSlugQuery } from "components/modal/__generated__/SeriesMetadataModalValidateSlugQuery.graphql";
import useUserContext from "hooks/useUserContext";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import { fetchQuery, useRelayEnvironment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import Body2 from "components/text/Body2";
import WaitingForTransactionModal from "components/modal/WaitingForTransactionModal";
import usePreventRefresh from "hooks/usePreventRefresh";
import { notify } from "components/toast/notifications";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";
import { MAX_DESCRIPTION_LENGTH } from "constants/MaxLengths";
import ColorClass from "types/enums/ColorClass";

const validateSeriesSlugQuery = graphql`
  query SeriesMetadataModalValidateSlugQuery(
    $userId: String
    $seriesSlug: String!
  ) {
    Series(
      where: {
        _and: { creatorId: { _eq: $userId }, slug: { _eq: $seriesSlug } }
      }
    ) {
      id
    }
  }
`;

export default function SeriesMetadataModal({
  title,
  isShown,
  isWaitingForTransactionShown,
  onHide,
  onSubmit,
  validateInputs,
}: {
  isShown: boolean;
  isWaitingForTransactionShown: boolean;
  onHide: () => void;
  onSubmit: () => void;
  title: string;
  validateInputs?: () => Maybe<string>;
}) {
  const RelayEnvironment = useRelayEnvironment();
  const popoverRef = useRef(null);
  const [showErrors, setShowErrors] = useState(false);
  const {
    coverImageFile,
    coverImageUrl,
    description,
    errorMessage,
    isLoading,
    isSuccess,
    name,
    previewImageFile,
    previewImageUrl,
    resetData,
    setCoverImageFile,
    setDescription,
    setErrorMessage,
    setName,
    setPreviewImageFile,
    isSlugUpdated,
    slug,
  } = useContext(SeriesMetadataContext);
  const { user } = useUserContext();
  const sharedValidateInputs = () => {
    if (slug == null || slug.length === 0) {
      // Log these so that we can find bugs in our slug genertion code
      logError(
        AnalyticsEvent.SeriesInvalidSlug,
        "series name resulted in invalid slug",
        { name, slug }
      );
      return ErrorMessageMsg.InvalidSeriesSlugLength;
    }

    if (name.length === 0) {
      return ErrorMessageMsg.RequiredInputsMissing;
    }

    if (name.length > 32) {
      return ErrorMessageMsg.InvalidSeriesNameLength;
    }

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return ErrorMessageMsg.InvalidSeriesDescriptionLength;
    }

    if (validateInputs != null) {
      return validateInputs();
    }

    return null;
  };
  usePreventRefresh(isLoading && !isSuccess);

  useEffect(() => {
    if (!showErrors) {
      return;
    }

    const errorMsg = sharedValidateInputs();
    if (errorMsg == null) {
      // If errors are currently shown, clear the error if it was addressed
      setShowErrors(false);
    }

    setErrorMessage(errorMsg);
    // Only update when the fields change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, previewImageFile, coverImageFile, slug]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(resetData, []);

  const onSubmitInner = async () => {
    const setError = (errorMsg: string) => {
      setShowErrors(true);
      setErrorMessage(errorMsg);
    };
    let isSlugValid = true;
    if (isSlugUpdated) {
      const data = await fetchQuery<SeriesMetadataModalValidateSlugQuery>(
        RelayEnvironment,
        validateSeriesSlugQuery,
        { seriesSlug: slug, userId: user!.id }
      ).toPromise();
      isSlugValid = data?.Series.length === 0;
    }
    if (!isSlugValid) {
      setError(ErrorMessageMsg.InvalidSeriesSlug);
      return;
    }

    const errorMsg = sharedValidateInputs();
    if (errorMsg != null) {
      setError(errorMsg);
      return;
    }

    onSubmit();
  };

  if (user == null) {
    return null;
  }

  return (
    <>
      <WaitingForTransactionModal
        isShown={isShown && isWaitingForTransactionShown}
        message={`The name, description, and preview image for your series are stored
          on-chain, so any changes require your approval.`}
      />
      <GenericModal
        title={title}
        isShown={isShown && !isWaitingForTransactionShown}
        onHide={() => {
          if (isLoading) {
            notify({
              duration: 2,
              message: "Please wait until the series is done processing",
              type: "info",
            });
            return;
          }

          onHide();
        }}
        excludeRefs={[popoverRef]}
      >
        <div className={styles.modal}>
          <InputWithLabel
            input={
              <TextInput
                value={name}
                maxLength={32}
                onChange={setName}
                placeholder="Name of your series"
              />
            }
            label={<InputLabel label="Series Name" required />}
          />
          <Body2
            className={styles.url}
            colorClass={ColorClass.Primary}
          >{`The URL for this series will be: formfunction.xyz${getSeriesLinkRelative(
            user.username,
            slug
          )}`}</Body2>
          <InputWithLabel
            input={
              <TextArea
                value={description}
                maxLength={MAX_DESCRIPTION_LENGTH}
                onChange={setDescription}
                placeholder="(Optional) Add a description about your series"
                rows={3}
              />
            }
            label={<InputLabel label="Series Description" />}
          />
          <div className={styles.photoInput}>
            <InputLabel
              label="Preview Image"
              subLabel="This image will be the preview for this series on your profile. Recommended size: 450x450, 5MB max size."
              required
            />
            <AddPhotoInput
              file={previewImageFile}
              photoUrl={previewImageUrl}
              setFile={(file) => setPreviewImageFile(file)}
            />
          </div>
          <div className={styles.photoInput}>
            <InputLabel
              label="Cover Image"
              subLabel="Recommended size: 4000x600, 5MB max size."
            />
            <AddPhotoInput
              file={coverImageFile}
              photoUrl={coverImageUrl}
              setFile={(file) => setCoverImageFile(file)}
            />
          </div>
          <div className={styles.saveButtonContainer}>
            <div className={styles.saveButtonDivider} />
            <ButtonWithText
              buttonTheme={ButtonTheme.PurpleGradient}
              className={styles.saveButton}
              disabled={isEmptyString(name)}
              fontClass={FontClass.NavLink}
              isLoading={isLoading}
              type="submit"
              onClick={onSubmitInner}
            >
              Save Series Info
            </ButtonWithText>
          </div>
          {/* TODO: UX isn't the best on mobile, b/c you have to scroll down to see the error message */}
          {errorMessage != null && (
            <ErrorMessage fontClass={FontClass.Body1} marginTop={0}>
              {errorMessage}
            </ErrorMessage>
          )}
        </div>
      </GenericModal>
    </>
  );
}
