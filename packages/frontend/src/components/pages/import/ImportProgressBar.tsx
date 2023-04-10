import styles from "css/pages/import/ImportProgressBar.module.css";
import ProgressBarItem from "components/nav/ProgressBarItem";
import useImportContext from "hooks/useImportContext";
import ImportStep from "types/enums/ImportStep";

function getImportStepIndex(step: ImportStep): number {
  return Object.values(ImportStep).indexOf(step);
}

export default function ImportProgressBar(): JSX.Element {
  const { step: currentStep, setStep } = useImportContext();

  const items = Object.values(ImportStep)
    .filter((step) => step !== ImportStep.Results)
    .map((step) => (
      <ProgressBarItem
        isFilled={getImportStepIndex(currentStep) >= getImportStepIndex(step)}
        key={step}
        name={step}
        onClick={() => setStep(step)}
      />
    ));

  return (
    <div className={styles.container}>
      {items}
      <div className={styles.line} />
    </div>
  );
}
