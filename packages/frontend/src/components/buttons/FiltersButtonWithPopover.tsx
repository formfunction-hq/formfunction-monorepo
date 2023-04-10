import ButtonWithPopover from "components/buttons/ButtonWithPopover";
import FiltersButton from "components/buttons/FiltersButton";

type Props = {
  hideLabel?: boolean;
  popoverContent: JSX.Element;
};

export default function FiltersButtonWithPopover({
  hideLabel = false,
  popoverContent,
}: Props): JSX.Element {
  return (
    <ButtonWithPopover popoverContent={popoverContent}>
      <FiltersButton hideLabel={hideLabel} />
    </ButtonWithPopover>
  );
}
