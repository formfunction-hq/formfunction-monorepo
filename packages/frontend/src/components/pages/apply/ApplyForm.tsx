import * as yup from "yup";
import styles from "css/pages/apply/ApplyForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputWithLabel from "components/input/InputWithLabel";
import FormTextInput from "components/input/FormTextInput";
import InputLabel from "components/input/InputLabel";
import FormTextArea from "components/input/FormTextArea";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import isValidHttpUrl from "utils/isValidHttpUrl";
import { useState } from "react";
import useErrorMessage from "hooks/useErrorMessage";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import ErrorMessage from "components/text/ErrorMessage";
import logIfNotProd from "utils/logIfNotProd";
import CheckboxButton from "components/buttons/CheckboxButton";
import PlusIcon from "components/icons/PlusIcon";
import ColorValue from "types/enums/ColorValue";
import GenericDropzone from "components/input/GenericDropzone";
import { range } from "formfn-shared/dist/utils/range";
import joinClasses from "utils/joinClasses";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import graphql from "babel-plugin-relay/macro";
import { ApplyForm_User$key } from "components/pages/apply/__generated__/ApplyForm_User.graphql";
import { useFragment, useMutation } from "react-relay";
import ConnectTwitterButton from "components/buttons/ConnectTwitterButton";
import ConnectInstagramButton from "components/buttons/ConnectInstagramButton";
import { ApplyFormInsertSubmissionMutation } from "components/pages/apply/__generated__/ApplyFormInsertSubmissionMutation.graphql";
import uploadFile from "utils/firebase/uploadFile";
import getArtistSubmissionAssetStoragePath from "utils/firebase/storage-paths/getArtistSubmissionAssetStoragePath";
import getFileExt from "utils/getFileExt";
import Video from "components/videos/Video";
import BYTES_PER_MEGABYTE from "formfn-shared/dist/constants/BytesPerMegabyte";
import useCheckSocialNetworkAuthError from "hooks/useCheckSocialNetworkAuthError";
import useFlagsTyped from "hooks/useFlagsTyped";
import isEmptyObject from "formfn-shared/dist/utils/isEmptyObject";
import ConnectDiscordButton from "components/buttons/ConnectDiscordButton";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import useDiscordAuthContext from "hooks/useDiscordAuthContext";
import DiscordAuthModals from "components/modal/DiscordAuthModals";
import DEFAULT_ACCEPTED_MEDIA_TYPES from "constants/media-type/DefaultAcceptedMediaTypes";

const insertSubmissionMutation = graphql`
  mutation ApplyFormInsertSubmissionMutation(
    $object: ArtistSubmission_insert_input!
  ) {
    insert_ArtistSubmission_one(object: $object) {
      id
    }
  }
`;

function MediaInput({
  disabled,
  file,
  hasError,
  onChange,
}: {
  disabled: boolean;
  file: MaybeUndef<File>;
  hasError: boolean;
  onChange: (val: File) => void;
}) {
  return (
    <GenericDropzone
      accept={DEFAULT_ACCEPTED_MEDIA_TYPES}
      disabled={disabled}
      disableHoverStyle
      maxSize={10 * BYTES_PER_MEGABYTE}
      onDropAccepted={(files) => {
        if (files.length === 0) {
          return;
        }

        onChange(files[0]);
      }}
    >
      <div
        className={joinClasses(
          styles.mediaInput,
          disabled ? styles.mediaInputDisabled : null,
          hasError ? styles.mediaInputError : null
        )}
      >
        {file == null ? (
          <PlusIcon colorValue={ColorValue.Ghost} />
        ) : file.type.includes("video") ? (
          <Video className={styles.image} src={URL.createObjectURL(file)} />
        ) : (
          <img className={styles.image} src={URL.createObjectURL(file)} />
        )}
      </div>
    </GenericDropzone>
  );
}

const schema = yup.object().shape({
  artistStatement: yup.string().required(),
  instagramName: yup.string().optional(),
  isVerified: yup.bool().required(),
  websiteUrl: yup
    .string()
    .test(
      "isValidHttpUrl",
      "Not a valid URL",
      (val) => val != null && isValidHttpUrl(val)
    ),
});

type FormData = {
  artistStatement: string;
  files: Array<File>;
  instagramName: string;
  isVerified: boolean;
  websiteUrl: string;
};

const fragment = graphql`
  fragment ApplyForm_User on User {
    id

    instagramName
    twitterName
    websiteUrl

    DiscordAuth {
      discordHandle
      hasConnectedDiscordAccount
      hasJoinedDiscordServer
    }

    ...ConnectTwitterButton_User
    ...ConnectInstagramButton_User
    ...ConnectDiscordButton_User
    ...DiscordAuthModals_User
  }
`;

type Props = {
  onSubmitted: () => void;
  user: ApplyForm_User$key;
};

export default function ApplyForm({ onSubmitted, user }: Props) {
  const userData = useFragment(fragment, user);
  const { DiscordAuth } = userData;
  const [errorMessage, setErrorMessage] = useErrorMessage();
  const [commitInsertSubmission] =
    useMutation<ApplyFormInsertSubmissionMutation>(insertSubmissionMutation);
  const [isLoading, setIsLoading] = useState(false);
  const [forceShowError, setForceShowError] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const { enableInstagramLinking } = useFlagsTyped();
  const { displayDiscordAuthConnectModal } = useDiscordAuthContext();
  useCheckSocialNetworkAuthError();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      artistStatement: "",
      files: [],
      instagramName: userData.instagramName ?? "",
      isVerified: false,
      websiteUrl: userData.websiteUrl ?? "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onError = async () => {
    if (errors != null) {
      setErrorMessage(ErrorMessageMsg.InvalidInputs);
      setShowErrors(true);
    }

    logIfNotProd("errors", errors);
  };

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);

    async function run() {
      const downloadUrls = await Promise.all(
        values.files.map((file) =>
          uploadFile(
            file,
            getArtistSubmissionAssetStoragePath(userData.id, getFileExt(file))
          )
        )
      );

      commitInsertSubmission({
        onCompleted: () => {
          setIsLoading(false);
          onSubmitted();
        },
        onError: () => {
          setForceShowError(true);
          setErrorMessage(ErrorMessageMsg.UnexpectedError);
          setIsLoading(false);
        },
        variables: {
          object: {
            Assets: {
              data: values.files.map((file, index) => ({
                contentType: file.type,
                downloadUrl: downloadUrls[index].downloadUrl,
                path: downloadUrls[index].fileName,
                userId: userData.id,
              })),
            },
            artistStatement: values.artistStatement,
            discordHandle: userData.DiscordAuth?.discordHandle,
            instagramName: values.instagramName,
            isCopyrightVerified: values.isVerified,
            twitterName: userData.twitterName,
            userId: userData.id,
            websiteUrl: values.websiteUrl,
          },
        },
      });
    }

    run();
  };

  const showError =
    (errorMessage != null &&
      // Yup validation for files wasn't working, idk why
      (!isEmptyObject(errors) || watch("files").length === 0)) ||
    forceShowError;

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <InputWithLabel
          input={
            <ConnectTwitterButton
              confirmationMessage="Connecting your Twitter will refresh this page, so make sure all your info been saved!"
              redirectLocation="Apply"
              user={userData}
            />
          }
          label={
            <InputLabel
              label="Link your Twitter (do this first!)"
              required
              subLabel="Make sure you're signed into the Twitter account you want to connect. This helps our artists verify that you are the actual creator of the work you're submitting."
            />
          }
        />
        <InputWithLabel
          input={
            <div className={styles.discordSection}>
              <DiscordAuthModals user={userData} />
              <ConnectDiscordButton user={userData} redirectLocation="Apply" />
              {DiscordAuth?.hasConnectedDiscordAccount === true &&
                DiscordAuth?.hasJoinedDiscordServer === false && (
                  <TextButton
                    buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
                    display="inline"
                    fontClass={FontClass.Body2}
                    onClick={() =>
                      displayDiscordAuthConnectModal({
                        onlyDisplayJoinDiscordSteps: true,
                        redirectLocation: "Apply",
                      })
                    }
                  >
                    Join Discord
                  </TextButton>
                )}
            </div>
          }
          label={
            <InputLabel
              label="Link your Discord"
              subLabel="If you are accepted onto Formfunction, we'll add you to a special Discord channel for our verified creators."
            />
          }
        />
        {enableInstagramLinking ? (
          <InputWithLabel
            input={
              <ConnectInstagramButton
                confirmationMessage="Connecting your Instagram will refresh this page, so make sure all your info been saved!"
                redirectLocation="Apply"
                user={userData}
              />
            }
            label={
              <InputLabel
                label="Link your Instagram"
                subLabel="Make sure you're signed into the Instagram account you want to connect."
              />
            }
          />
        ) : (
          <InputWithLabel
            input={
              <FormTextInput
                className={styles.instagram}
                permaPlaceholder="https://instagram.com/"
                registerResult={register("instagramName")}
              />
            }
            label={
              <InputLabel
                label="Link to your Instagram"
                subLabel="Just include your handle (not the entire link)."
              />
            }
          />
        )}
        <InputWithLabel
          input={
            <FormTextInput
              hasError={errors.websiteUrl != null}
              placeholder="URL to your website"
              registerResult={register("websiteUrl")}
            />
          }
          label={
            <InputLabel
              label="Link to your art portfolio/website online"
              required
            />
          }
        />
        <InputWithLabel
          input={
            <FormTextArea
              hasError={errors.artistStatement != null}
              maxLength={600}
              placeholder="Write here..."
              registerResult={register("artistStatement")}
              rows={4}
              value={watch("artistStatement")}
            />
          }
          label={
            <InputLabel
              label="Artist statement"
              required
              subLabel="Tell us about yourself! Who are you as an artist, and why do you want to join Formfunction?"
            />
          }
        />
        <InputWithLabel
          input={
            <div className={styles.mediaInputs}>
              {range(3).map((i) => (
                <MediaInput
                  key={i}
                  disabled={watch("files").length < i}
                  hasError={showErrors && i === 0 && watch("files")[i] == null}
                  file={watch("files")[i]}
                  onChange={(val) => {
                    const curr = watch("files");
                    curr[i] = val;
                    setValue("files", curr);
                  }}
                />
              ))}
            </div>
          }
          label={
            <InputLabel
              label="Your art submission"
              required
              subLabel="Submit up to 3 pieces of art for the community to review. These pieces should represent your best work. Images, videos, and GIFs must be under 10MB."
            />
          }
        />
        <InputWithLabel
          input={
            <CheckboxButton
              isActive={watch("isVerified")}
              onClick={() => setValue("isVerified", !watch("isVerified"))}
            />
          }
          label={
            <InputLabel
              label="Verify that the submitted art belongs to you, without infringing on anyone else’s copyright?"
              required
            />
          }
        />
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.submitButton}
          disabled={
            !watch("isVerified") ||
            userData.twitterName == null ||
            watch("files").length === 0
          }
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          type="submit"
        >
          Submit
        </ButtonWithText>
      </form>
      {showError && (
        <ErrorMessage fontClass={FontClass.Body1}>{errorMessage}</ErrorMessage>
      )}
    </>
  );
}
