import * as yup from "yup";
import styles from "css/pages/profile/edit/EditProfileForm.module.css";
import graphql from "babel-plugin-relay/macro";
import { EditProfileForm_User$key } from "components/pages/profile/edit/__generated__/EditProfileForm_User.graphql";
import { useFragment, useMutation } from "react-relay";
import isValidDisplayName, {
  MAX_DISPLAY_NAME_LENGTH,
} from "formfn-shared/dist/utils/validation/isValidDisplayName";
import isValidUsername from "formfn-shared/dist/utils/validation/isValidUsername";
import isValidEmail from "formfn-shared/dist/utils/validation/isValidEmail";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputWithLabel from "components/input/InputWithLabel";
import FormTextInput from "components/input/FormTextInput";
import InputLabel from "components/input/InputLabel";
import {
  MAX_BIO_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_USERNAME_LENGTH,
} from "constants/MaxLengths";
import WEBSITE_URL from "constants/WebsiteUrl";
import {
  DISPLAY_NAME_SUB_LABEL,
  EMAIL_SUB_LABEL,
  USERNAME_SUB_LABEL,
} from "constants/InputSubLabels";
import FormUnderlinedTextInput from "components/input/FormUnderlinedTextInput";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { useEffect, useState } from "react";
import useErrorMessage from "hooks/useErrorMessage";
import ErrorMessage from "components/text/ErrorMessage";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import undefIfEmptyString from "utils/undefIfEmptyString";
import AddPhotoInput from "components/input/AddPhotoInput";
import {
  EditProfileFormPhotosMutation,
  Photo_insert_input,
} from "components/pages/profile/edit/__generated__/EditProfileFormPhotosMutation.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import uploadProfilePhoto from "utils/firebase/uploadProfilePhoto";
import { v4 } from "uuid";
import uploadCoverPhoto from "utils/firebase/uploadCoverPhoto";
import logIfNotProd from "utils/logIfNotProd";
import FormTextArea from "components/input/FormTextArea";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import getCdnUrlForProfileOrCoverPhoto from "utils/getCdnUrlForProfileOrCoverPhoto";
import ConnectTwitterButton from "components/buttons/ConnectTwitterButton";
import useCheckSocialNetworkAuthError from "hooks/useCheckSocialNetworkAuthError";
import isUsernameTaken from "utils/isUsernameTaken";
import ConnectInstagramButton from "components/buttons/ConnectInstagramButton";
import useFlagsTyped from "hooks/useFlagsTyped";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import ConnectDiscordButton from "components/buttons/ConnectDiscordButton";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import useUpdateUserByPk from "hooks/useUpdateUserByPk";
import useDiscordAuthContext from "hooks/useDiscordAuthContext";
import DiscordAuthModals from "components/modal/DiscordAuthModals";
import ChangeNotificationUserPreferencesModal from "components/modal/ChangeNotificationUserPreferencesModal";
import ToggleButtonWithLabel from "components/buttons/ToggleButtonWithLabel";
import useUserContext from "hooks/useUserContext";

// Three scenarios:
// 1) No change to photos—just update user
// 2) New photo—create photo, update user
// 3) Updated photo—update photo, no need to update user

const createPhotosMutation = graphql`
  mutation EditProfileFormPhotosMutation($objects: [Photo_insert_input!]!) {
    insert_Photo(objects: $objects) {
      returning {
        id
        photoUrl
      }
    }
  }
`;

const schema = yup.object().shape({
  bio: yup.string().optional(),
  displayName: yup
    .string()
    .optional()
    .test(
      "isValidDisplayName",
      "Not a valid display name",
      (val) => val == null || isValidDisplayName(val)
    ),
  email: yup
    .string()
    .required()
    .test(
      "isEmail",
      "Not a valid email",
      (val) => val != null && isValidEmail(val)
    ),
  instagramName: yup.string().optional(),
  shouldBlurNsfwContent: yup.boolean().required(),
  twitterName: yup.string().optional(),
  username: yup
    .string()
    .required()
    .test(
      "isUsername",
      "Not a valid username",
      (val) => val != null && (isValidUsername(val) || val === "CH:LL")
    ),
  websiteUrl: yup.string().optional(),
});

type FormData = {
  bio: string;
  coverPhotoFile: Maybe<File>;
  displayName: string;
  email: string;
  instagramName: string;
  profilePhotoFile: Maybe<File>;
  shouldBlurNsfwContent: boolean;
  twitterName: string;
  username: string;
  websiteUrl: string;
};

const fragment = graphql`
  fragment EditProfileForm_User on User {
    id

    bio
    displayName
    instagramName
    twitterName
    username
    websiteUrl
    shouldBlurNsfwContent

    CoverPhoto {
      id
      photoUrl
    }

    ProfilePhoto {
      id
      photoUrl
    }

    DiscordAuth {
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
  user: EditProfileForm_User$key;
};

export default function EditProfileForm({ user }: Props): JSX.Element {
  const { enableInstagramLinking, enableNsfwDisclosure } = useFlagsTyped();
  const userData = useFragment(fragment, user);
  const { DiscordAuth } = userData;
  const { user: userFromContext } = useUserContext();

  const { updateUserByPk } = useUpdateUserByPk();
  const [commitPhotos] =
    useMutation<EditProfileFormPhotosMutation>(createPhotosMutation);
  const [
    isChangeNotificationUserPreferencesModalShown,
    setIsChangeNotificationUserPreferencesModalShown,
  ] = useState(false);

  // We only want the error message to be shown after the user tries to submit.
  const [showErrors, setShowErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useErrorMessage();
  const [isLoading, setIsLoading] = useState(false);
  const { displayDiscordAuthConnectModal } = useDiscordAuthContext();
  useCheckSocialNetworkAuthError();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      bio: userData.bio ?? "",
      coverPhotoFile: null,
      displayName: userData.displayName ?? "",
      email: userFromContext?.email ?? "",
      instagramName: userData.instagramName ?? "",
      profilePhotoFile: null,
      shouldBlurNsfwContent: userData.shouldBlurNsfwContent,
      twitterName: userData.twitterName ?? "",
      username: userData.username,
      websiteUrl: userData.websiteUrl?.replace("http://", "") ?? "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!showErrors) {
      return;
    }

    setErrorMessage(isValid ? null : ErrorMessageMsg.InvalidInputs);
  }, [isValid, setErrorMessage, showErrors]);

  const onError = async () => {
    setShowErrors(true);
    if (errors != null) {
      setErrorMessage(ErrorMessageMsg.InvalidInputs);
    }
    logIfNotProd("error", errors);
  };

  const onSubmit = async (values: FormData) => {
    logIfNotProd("submit");
    setShowErrors(true);
    setIsLoading(true);

    const usernameTaken = await isUsernameTaken(values.username);
    if (usernameTaken && values.username !== userData.username) {
      setErrorMessage(ErrorMessageMsg.UsernameTaken);
      setIsLoading(false);
      return;
    }

    const commitUserInner = (
      profilePhotoId: Maybe<string>,
      coverPhotoId: Maybe<string>,
      delayNavigation: boolean
    ) =>
      updateUserByPk({
        onCompleted: (response) => {
          setTimeout(
            () => {
              setIsLoading(false);
              const { username } = response.update_User_by_pk!;
              window.location.href = getUserProfileLinkRelative(username);
            },
            delayNavigation ? 500 : 0
          );
        },
        onError: () => {
          setErrorMessage(ErrorMessageMsg.UnexpectedError);
          setIsLoading(false);
        },
        set: {
          bio: undefIfEmptyString(values.bio),
          coverPhotoId,
          displayName: values.displayName,
          email: values.email,
          instagramName: undefIfEmptyString(values.instagramName),
          profilePhotoId,
          shouldBlurNsfwContent: values.shouldBlurNsfwContent,
          twitterName: undefIfEmptyString(values.twitterName),
          username: values.username,
          websiteUrl:
            values.websiteUrl.length === 0
              ? undefined
              : `http://${values.websiteUrl}`,
        },
        userId: userData.id,
      });

    const didProfilePhotoChange = values.profilePhotoFile != null;
    const didCoverPhotoChange = values.coverPhotoFile != null;

    const objects: Array<Photo_insert_input> = [];
    let coverPhotoId: Maybe<string> = (userData.CoverPhoto?.id as any) ?? null;
    let profilePhotoId: Maybe<string> =
      (userData.ProfilePhoto?.id as any) ?? null;

    if (values.profilePhotoFile != null) {
      profilePhotoId = v4();
      const profilePhotoStoragePath = await uploadProfilePhoto(
        userData.id,
        values.profilePhotoFile
      );
      objects.push({
        id: profilePhotoId,
        photoUrl: getCdnUrlForProfileOrCoverPhoto(profilePhotoStoragePath),
        userId: userData.id,
      });
    }

    if (values.coverPhotoFile != null) {
      coverPhotoId = v4();
      const coverPhotoStoragePath = await uploadCoverPhoto(
        userData.id,
        values.coverPhotoFile
      );
      objects.push({
        id: coverPhotoId,
        photoUrl: getCdnUrlForProfileOrCoverPhoto(coverPhotoStoragePath),
        userId: userData.id,
      });
    }

    if (didProfilePhotoChange || didCoverPhotoChange) {
      commitPhotos({
        onCompleted: () => {
          commitUserInner(profilePhotoId, coverPhotoId, false);
        },
        onError: () => {
          setIsLoading(false);
          setErrorMessage(ErrorMessageMsg.UnexpectedError);
        },
        variables: {
          objects,
        },
      });
    } else {
      commitUserInner(profilePhotoId, coverPhotoId, true);
    }
  };

  const socialLinks = (
    <div className={styles.socialLinks}>
      <div className={styles.socialLinkWithConnect}>
        <Body2 colorClass={ColorClass.Primary}>Twitter</Body2>
        <ConnectTwitterButton redirectLocation="EditProfile" user={userData} />
      </div>
      <div className={styles.socialLinkWithConnect}>
        <DiscordAuthModals user={userData} />
        <div>
          <Body2 colorClass={ColorClass.Primary}>
            Discord
            {DiscordAuth?.hasConnectedDiscordAccount === true &&
            DiscordAuth?.hasJoinedDiscordServer === false ? (
              <TextButton
                buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
                className={styles.joinDiscordButton}
                display="inline"
                onClick={() =>
                  displayDiscordAuthConnectModal({
                    onlyDisplayJoinDiscordSteps: true,
                    redirectLocation: "EditProfile",
                  })
                }
              >
                Join Discord
              </TextButton>
            ) : null}
          </Body2>
        </div>
        <ConnectDiscordButton redirectLocation="EditProfile" user={userData} />
      </div>
      {enableInstagramLinking ? (
        <div className={styles.socialLinkWithConnect}>
          <Body2 colorClass={ColorClass.Primary}>Instagram</Body2>
          <ConnectInstagramButton
            redirectLocation="EditProfile"
            user={userData}
          />
        </div>
      ) : (
        <FormUnderlinedTextInput
          className={styles.instagramInput}
          label="Instagram"
          permaPlaceholder="https://instagram.com/"
          registerResult={register("instagramName")}
        />
      )}
      <FormUnderlinedTextInput
        className={styles.websiteInput}
        label="Website or Portfolio"
        permaPlaceholder="http://"
        registerResult={register("websiteUrl")}
      />
    </div>
  );

  return (
    <>
      <ChangeNotificationUserPreferencesModal
        isShown={isChangeNotificationUserPreferencesModalShown}
        onHide={() => setIsChangeNotificationUserPreferencesModalShown(false)}
      />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
        <InputWithLabel
          input={
            <FormTextInput
              className={styles.usernameInput}
              hasError={errors.username != null}
              maxLength={MAX_USERNAME_LENGTH}
              permaPlaceholder={`${WEBSITE_URL}@`}
              registerResult={register("username")}
              value={watch("username")}
            />
          }
          label={
            <InputLabel
              label="Username"
              required
              subLabel={USERNAME_SUB_LABEL}
            />
          }
        />
        <InputWithLabel
          input={
            <FormTextInput
              hasError={errors.displayName != null}
              maxLength={MAX_DISPLAY_NAME_LENGTH}
              registerResult={register("displayName")}
              value={watch("displayName")}
            />
          }
          label={
            <InputLabel
              label="Display Name"
              subLabel={DISPLAY_NAME_SUB_LABEL}
            />
          }
        />
        <InputWithLabel
          input={
            <FormTextArea
              maxLength={MAX_BIO_LENGTH}
              placeholder="Add a short bio about yourself"
              registerResult={register("bio")}
              rows={5}
              value={watch("bio")}
            />
          }
          label={<InputLabel label="Bio" />}
        />
        <div className={styles.photoInput}>
          <InputLabel
            label="Profile Photo"
            subLabel="Recommended size: 500x500, 5MB max size."
          />
          <AddPhotoInput
            file={watch("profilePhotoFile")}
            photoUrl={userData.ProfilePhoto?.photoUrl}
            setFile={(file) => setValue("profilePhotoFile", file)}
          />
        </div>
        <div className={styles.photoInput}>
          <InputLabel
            label="Cover Photo"
            subLabel="Recommended size: 4000x280, 5MB max size."
          />
          <AddPhotoInput
            file={watch("coverPhotoFile")}
            photoUrl={userData.CoverPhoto?.photoUrl}
            setFile={(file) => setValue("coverPhotoFile", file)}
          />
        </div>
        <InputWithLabel
          input={socialLinks}
          label={<InputLabel label="Social Links" />}
        />
        <InputWithLabel
          input={
            <FormTextInput
              hasError={errors.email != null}
              maxLength={MAX_EMAIL_LENGTH}
              maxLengthIndicator={false}
              registerResult={register("email")}
            />
          }
          label={
            <InputLabel label="Email" required subLabel={EMAIL_SUB_LABEL} />
          }
        />
        <div className={styles.notifications}>
          <InputLabel label="Notifications" />
          <TextButton
            fontClass={FontClass.Body2}
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            onClick={() => {
              setIsChangeNotificationUserPreferencesModalShown(true);
            }}
          >
            Change email and activity preferences
          </TextButton>
        </div>
        {enableNsfwDisclosure && (
          <ToggleButtonWithLabel
            label="NSFW"
            subLabel={
              "Some pieces may be tagged as NSFW (not safe for work) by the creators." +
              " You can turn on this setting if you want extra warning before seeing a NSFW piece."
            }
            enabled={watch("shouldBlurNsfwContent")}
            toggleLabel="Blur NSFW artwork"
            setEnabled={() => {
              setValue(
                "shouldBlurNsfwContent",
                !watch("shouldBlurNsfwContent")
              );
            }}
          />
        )}
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.saveButton}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          type="submit"
        >
          Save Profile
        </ButtonWithText>
      </form>
      {errorMessage != null && (
        <ErrorMessage fontClass={FontClass.Body1}>{errorMessage}</ErrorMessage>
      )}
    </>
  );
}
