/* eslint-disable react/jsx-no-constructed-context-values */
import { Context, createContext, useEffect, useState } from "react";
import CreateStep from "types/enums/CreateStep";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import CreateMintType from "types/enums/CreateMintType";
import getCreateStepIndex from "utils/getCreateStepIndex";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { MAX_CREATORS_PER_MINT_TYPE } from "components/pages/create/CreateCreatorSplits";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

export type CreateContextData = {
  createMintType: CreateMintType;
  getPreviousCreateStep: () => Maybe<CreateStep>;
  setCreateMintType: (val: CreateMintType) => void;
  setNextStep: () => void;
  setPreviousStep: () => void;
  setStep: (val: CreateStep) => void;
  step: CreateStep;
};

export const CreateContext: Context<CreateContextData> =
  createContext<CreateContextData>({
    createMintType: CreateMintType.OneOfOne,
    getPreviousCreateStep: () => null,
    setCreateMintType: emptyFunction,
    setNextStep: emptyFunction,
    setPreviousStep: emptyFunction,
    setStep: emptyFunction,
    step: CreateStep.Details,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

function getPreviousCreateStep(step: CreateStep) {
  const stepIndex = getCreateStepIndex(step);
  if (stepIndex === 0) {
    return null;
  }

  return Object.values(CreateStep)[stepIndex - 1];
}

function getNextCreateStep(step: CreateStep) {
  const stepIndex = getCreateStepIndex(step);
  const steps = Object.values(CreateStep);
  if (stepIndex === steps.length - 1) {
    return null;
  }

  return steps[stepIndex + 1];
}

export function CreateContextProvider(props: ProviderProps): JSX.Element {
  const [step, setStep] = useState<CreateStep>(CreateStep.Type);
  const [createMintType, setCreateMintType] = useState<CreateMintType>(
    CreateMintType.OneOfOne
  );
  const { dispatchCreatorSplits, setShowErrors } = useCreateNftDetailsContext();

  useEffect(() => {
    setShowErrors(false);
    window.scrollTo({ top: 0 });
  }, [step, setShowErrors]);

  return (
    <CreateContext.Provider
      value={{
        createMintType,
        getPreviousCreateStep: () => getPreviousCreateStep(step),
        setCreateMintType: (val) => {
          setCreateMintType(val);
          switch (val) {
            case CreateMintType.Editions:
              // For editions, we allow less max creators than 1/1s
              dispatchCreatorSplits({
                end: MAX_CREATORS_PER_MINT_TYPE[CreateMintType.Editions],
                start: 0,
                type: "slice",
              });
              break;
            case CreateMintType.OneOfOne:
              break;
            default:
              assertUnreachable(val);
          }
        },
        setNextStep: () => {
          const nextStep = getNextCreateStep(step);
          if (nextStep != null) {
            setStep(nextStep);
          }
        },
        setPreviousStep: () => {
          const previousStep = getPreviousCreateStep(step);
          if (previousStep != null) {
            setStep(previousStep);
          }
        },
        setStep,
        step,
      }}
    >
      {props.children}
    </CreateContext.Provider>
  );
}
