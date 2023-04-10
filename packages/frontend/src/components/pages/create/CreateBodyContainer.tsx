import ButtonWithText from "components/buttons/ButtonWithText";
import CloseButton from "components/buttons/CloseButton";
import PlainButton from "components/buttons/PlainButton";
import TextButton from "components/buttons/TextButton";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import ArrowLeftIcon from "components/icons/ArrowLeftIcon";
import ChevronLeftIcon from "components/icons/ChevronLeftIcon";
import MobileTitleAndNav from "components/nav/MobileTitleAndNav";
import CreateProgressBar from "components/pages/create/CreateProgressBar";
import { notify } from "components/toast/notifications";
import styles from "css/pages/create/CreateBodyContainer.module.css";
import useCreateContext from "hooks/useCreateContext";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import useUserContext from "hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorValue from "types/enums/ColorValue";
import CreateStep from "types/enums/CreateStep";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";

const HUMAN_READABLE = {
  [CreateStep.Type]: "Choose type",
  [CreateStep.Details]: "NFT Details",
  [CreateStep.Media]: "Media",
  [CreateStep.Listed]: "Mint successful",
  [CreateStep.Mint]: "Ready to mint?",
};

type Props = {
  children: any;
  nextDisabled?: boolean;
};

function shouldShowBackButton(step: CreateStep) {
  return step !== CreateStep.Type;
}

function BackButton({
  step,
  onBack,
}: {
  onBack: () => void;
  step: CreateStep;
}) {
  const { getPreviousCreateStep } = useCreateContext();
  const previousStep = getPreviousCreateStep();

  if (!shouldShowBackButton(step)) {
    return null;
  }

  return (
    <TextButton
      buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
      fontClass={FontClass.Body2}
      icon={<ArrowLeftIcon colorValue={ColorValue.BrightPurple} size={20} />}
      iconPosition="left"
      onClick={onBack}
    >
      Back to {previousStep!.toString().toLowerCase()}
    </TextButton>
  );
}

export default function CreateBodyContainer({
  children,
  nextDisabled,
}: Props): JSX.Element {
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const { getPreviousCreateStep, step, setStep, setNextStep } =
    useCreateContext();
  const { hasError, setShowErrors } = useCreateNftDetailsContext();
  const navigate = useNavigate();
  const { profileHref } = useUserContext();

  const onBack = () => {
    const previousStep = getPreviousCreateStep();
    if (previousStep != null) {
      setStep(previousStep);
    }
  };

  const onNext = () => {
    setShowErrors(true);
    if (step === CreateStep.Details && hasError) {
      notify({
        description: "Please make sure all inputs are valid",
        message: "Invalid input",
        type: "warning",
      });
      return;
    }
    setNextStep();
  };

  const progressBar = (
    <div className={styles.progressBarContainer}>
      <BackButton step={step} onBack={onBack} />
      <div className={styles.progressBar}>
        <CreateProgressBar />
      </div>
      <div style={{ visibility: "hidden" }}>
        <BackButton step={step} onBack={onBack} />
      </div>
    </div>
  );

  const backButtonChevronOrClose = shouldShowBackButton(step) ? (
    <PlainButton onClick={onBack}>
      <ChevronLeftIcon colorValue={ColorValue.Secondary} />
    </PlainButton>
  ) : (
    <CloseButton
      colorValue={ColorValue.Secondary}
      onClick={() => navigate(profileHref)}
    />
  );

  const stepsWithoutNextButton = [
    CreateStep.Mint,
    CreateStep.Listed,
    CreateStep.Type,
  ];
  const nextButton = !stepsWithoutNextButton.includes(step) && (
    <ButtonWithText
      buttonTheme={ButtonTheme.PurpleGradient}
      disabled={nextDisabled}
      fontClass={FontClass.NavLink}
      onClick={onNext}
    >
      Next
    </ButtonWithText>
  );

  return (
    <ResponsivePageBody className={styles.container}>
      {!isBottomTabsWidth && progressBar}
      {isBottomTabsWidth && (
        <MobileTitleAndNav
          className={styles.mobileTitleAndNav}
          left={backButtonChevronOrClose}
          right={nextButton}
          title={HUMAN_READABLE[step]}
        />
      )}
      {children}
    </ResponsivePageBody>
  );
}
