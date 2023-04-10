/* eslint-disable react/no-array-index-key */
import * as yup from "yup";
import Body1 from "components/text/Body1";
import styles from "css/pages/profile/edit/EditCreatorStoryForm.module.css";
import ColorClass from "types/enums/ColorClass";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputWithLabel from "components/input/InputWithLabel";
import InputLabel from "components/input/InputLabel";
import FormTextInput from "components/input/FormTextInput";
import FormTextArea from "components/input/FormTextArea";
import ColorSchemeButton from "components/buttons/ColorSchemeButton";
import COLOR_SCHEMES from "constants/ColorSchemes";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import CreatorStoryModal from "components/modal/CreatorStoryModal";
import { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { EditCreatorStoryForm_User$key } from "components/pages/profile/edit/__generated__/EditCreatorStoryForm_User.graphql";
import { useFragment, useMutation } from "react-relay";
import { EditCreatorStoryFormUserCreateMutation } from "components/pages/profile/edit/__generated__/EditCreatorStoryFormUserCreateMutation.graphql";
import useErrorMessage from "hooks/useErrorMessage";
import ErrorMessage from "components/text/ErrorMessage";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import { EditCreatorStoryFormUserUpdateMutation } from "components/pages/profile/edit/__generated__/EditCreatorStoryFormUserUpdateMutation.graphql";
import useUserContext from "hooks/useUserContext";

const createMutation = graphql`
  mutation EditCreatorStoryFormUserCreateMutation(
    $colorScheme: Int!
    $goals: String!
    $headline: String!
    $inspiration: String!
    $process: String!
    $userId: String!
  ) {
    insert_CreatorStory_one(
      object: {
        colorScheme: $colorScheme
        goals: $goals
        headline: $headline
        inspiration: $inspiration
        process: $process
        userId: $userId
      }
    ) {
      id
      colorScheme
      goals
      headline
      inspiration
      process
    }
  }
`;

const updateMutation = graphql`
  mutation EditCreatorStoryFormUserUpdateMutation(
    $id: uuid!
    $colorScheme: Int!
    $goals: String!
    $headline: String!
    $inspiration: String!
    $process: String!
  ) {
    update_CreatorStory_by_pk(
      _set: {
        colorScheme: $colorScheme
        goals: $goals
        headline: $headline
        inspiration: $inspiration
        process: $process
      }
      pk_columns: { id: $id }
    ) {
      id
      colorScheme
      goals
      headline
      inspiration
      process
    }
  }
`;

const schema = yup.object().shape({
  goals: yup.string().optional(),
  headline: yup.string().optional(),
  inspiration: yup.string().optional(),
  process: yup.string().optional(),
});

type FormData = {
  colorScheme: number;
  goals: string;
  headline: string;
  inspiration: string;
  process: string;
};

const fragment = graphql`
  fragment EditCreatorStoryForm_User on User {
    id

    displayName
    username

    CreatorStory {
      id
      colorScheme
      goals
      headline
      inspiration
      process
    }

    ProfilePhoto {
      id
      photoUrl
    }
  }
`;

type Props = {
  user: EditCreatorStoryForm_User$key;
};

export default function EditCreatorStoryForm({ user }: Props): JSX.Element {
  const userData = useFragment(fragment, user);
  const creatorStoryData = userData.CreatorStory;
  const [commitCreateMutation] =
    useMutation<EditCreatorStoryFormUserCreateMutation>(createMutation);
  const [commitUpdateMutation] =
    useMutation<EditCreatorStoryFormUserUpdateMutation>(updateMutation);
  const [errorMessage, setErrorMessage] = useErrorMessage();
  const [isLoading, setIsLoading] = useState(false);
  const { profileHref } = useUserContext();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      colorScheme: creatorStoryData?.colorScheme ?? 0,
      goals: creatorStoryData?.goals ?? "",
      headline: creatorStoryData?.headline ?? "",
      inspiration: creatorStoryData?.inspiration ?? "",
      process: creatorStoryData?.process ?? "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [isCreatorStoryModalShown, setIsCreatorStoryModalShown] =
    useState(false);

  const onSubmit = async (values: FormData) => {
    setIsLoading(true);
    if (creatorStoryData == null) {
      commitCreateMutation({
        onCompleted: () => {
          setTimeout(() => {
            setIsLoading(false);
            window.location.href = profileHref;
          }, 500);
        },
        onError: () => {
          setErrorMessage(ErrorMessageMsg.UnexpectedError);
          setIsLoading(false);
        },
        variables: {
          colorScheme: values.colorScheme,
          goals: values.goals,
          headline: values.headline,
          inspiration: values.inspiration,
          process: values.process,
          userId: userData.id,
        },
      });
    } else {
      commitUpdateMutation({
        onCompleted: () => {
          setTimeout(() => {
            setIsLoading(false);
            window.location.href = profileHref;
          }, 500);
        },
        onError: () => {
          setErrorMessage(ErrorMessageMsg.UnexpectedError);
          setIsLoading(false);
        },
        variables: {
          colorScheme: values.colorScheme,
          goals: values.goals,
          headline: values.headline,
          id: creatorStoryData.id,
          inspiration: values.inspiration,
          process: values.process,
        },
      });
    }
  };

  return (
    <>
      <CreatorStoryModal
        colorScheme={COLOR_SCHEMES[watch("colorScheme")]}
        displayName={userData.displayName}
        goals={watch("goals")}
        headline={watch("headline")}
        inspiration={watch("inspiration")}
        process={watch("process")}
        profilePhotoSrc={userData.ProfilePhoto?.photoUrl ?? null}
        username={userData.username}
        isShown={isCreatorStoryModalShown}
        onHide={() => setIsCreatorStoryModalShown(false)}
      />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Body1 colorClass={ColorClass.Secondary} textAlign="center">
          Your Creator Story is shown on your profile, and it gives you a chance
          to share your story, what inspires you, and your process. You can
          answer as many or as few of these as you&apos;d like.
        </Body1>
        <InputWithLabel
          input={
            <FormTextInput
              hasError={errors.headline != null}
              maxLength={64}
              maxLengthIndicator
              placeholder="A one-line description about you as a creator."
              registerResult={register("headline")}
              value={watch("headline")}
            />
          }
          label={<InputLabel label="Your headline" />}
        />
        <InputWithLabel
          input={
            <FormTextArea
              hasError={errors.process != null}
              maxLength={300}
              placeholder="How do you create your art?"
              registerResult={register("process")}
              rows={3}
              value={watch("process")}
            />
          }
          label={<InputLabel label="What's your process like?" />}
        />
        <InputWithLabel
          input={
            <FormTextArea
              hasError={errors.inspiration != null}
              maxLength={300}
              placeholder="What drives you to create, and how does that show up in your art?"
              registerResult={register("inspiration")}
              rows={3}
              value={watch("inspiration")}
            />
          }
          label={<InputLabel label="What inspires you?" />}
        />
        <InputWithLabel
          input={
            <FormTextArea
              hasError={errors.goals != null}
              maxLength={300}
              placeholder="What are your dreams and hopes as a creator, and how can your collectors help you get there?"
              registerResult={register("goals")}
              rows={3}
              value={watch("goals")}
            />
          }
          label={
            <InputLabel label="What are your long term goals as a creator?" />
          }
        />
        <InputWithLabel
          input={
            <div className={styles.colorSchemes}>
              {COLOR_SCHEMES.map((colorScheme, index) => (
                <ColorSchemeButton
                  key={index}
                  colorScheme={colorScheme}
                  isActive={index === watch("colorScheme")}
                  onClick={() => setValue("colorScheme", index)}
                />
              ))}
            </div>
          }
          label={<InputLabel label="Color scheme" />}
        />
        <div className={styles.buttons}>
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            className={styles.saveButton}
            fontClass={FontClass.NavLink}
            isLoading={isLoading}
            type="submit"
          >
            Save Creator Story
          </ButtonWithText>
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            onClick={() => setIsCreatorStoryModalShown(true)}
            type="button"
          >
            Preview Creator Story
          </TextButton>
        </div>
      </form>
      {errorMessage != null && (
        <ErrorMessage fontClass={FontClass.Body1}>{errorMessage}</ErrorMessage>
      )}
    </>
  );
}
