import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";

type Props = {
  marginTop?: number;
  showCurrencyError: boolean;
};

export default function CurrencyError({
  marginTop,
  showCurrencyError,
}: Props): Maybe<JSX.Element> {
  if (!showCurrencyError) {
    return null;
  }

  return (
    <Body1 style={{ marginTop }} colorClass={ColorClass.Error}>
      SPL Token features are not available yet for NFTs with collaborators.
    </Body1>
  );
}
