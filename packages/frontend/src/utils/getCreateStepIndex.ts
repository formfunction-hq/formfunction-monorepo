import CreateStep from "types/enums/CreateStep";

export default function getCreateStepIndex(step: CreateStep): number {
  return Object.values(CreateStep).indexOf(step);
}
