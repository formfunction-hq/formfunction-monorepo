import styles from "css/pages/create/CreateProgressBar.module.css";
import CreateStep from "types/enums/CreateStep";
import useCreateContext from "hooks/useCreateContext";
import ProgressBarItem from "components/nav/ProgressBarItem";
import getCreateStepIndex from "utils/getCreateStepIndex";

function shouldShowStep(step: CreateStep) {
  const hiddenSteps = [CreateStep.Listed];

  return !hiddenSteps.includes(step);
}

export default function CreateProgressBar(): JSX.Element {
  const { step: currentStep, setStep } = useCreateContext();

  const items = Object.values(CreateStep)
    .filter((step) => shouldShowStep(step))
    .map((step) => (
      <ProgressBarItem
        isFilled={getCreateStepIndex(currentStep) >= getCreateStepIndex(step)}
        key={step}
        name={step}
        onClick={() => setStep(step)}
      />
    ));

  return (
    <div className={styles.container}>
      {items}
      <div
        className={styles.line}
        style={{ width: `${165 * (items.length - 1)}px` }}
      />
    </div>
  );
}
