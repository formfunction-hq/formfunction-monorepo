import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import UnlockableCta from "types/enums/UnlockableCta";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import useUnlockableModalContext from "hooks/useUnlockableModalContext";
import UnlockableModalType from "types/enums/UnlockableModalType";

type Props = {
  unlockableCta: UnlockableCta;
};

export default function UnlockableActionButton({ unlockableCta }: Props) {
  const { setModalType } = useUnlockableModalContext();
  switch (unlockableCta) {
    case UnlockableCta.SeeInfo:
      return (
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.Body1Medium}
          onClick={() => setModalType(UnlockableModalType.SeeInfo)}
        >
          See info
        </ButtonWithText>
      );
    case UnlockableCta.ShareInfo:
      return (
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.Body1Medium}
          onClick={() => setModalType(UnlockableModalType.ShareInfo)}
        >
          Share info
        </ButtonWithText>
      );
    default:
      return assertUnreachable(unlockableCta);
  }
}
