/* eslint-disable react/jsx-no-constructed-context-values */
import { Context, createContext, SetStateAction, useState } from "react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import UnlockableModalType from "types/enums/UnlockableModalType";

export type UnlockableModalContextData = {
  isModalShown: boolean;
  modalType: Maybe<UnlockableModalType>;
  onHide: () => void;
  setModalType: (value: SetStateAction<Maybe<UnlockableModalType>>) => void;
};

export const UnlockableModalContext: Context<UnlockableModalContextData> =
  createContext<UnlockableModalContextData>({
    isModalShown: false,
    modalType: null,
    onHide: emptyFunction,
    setModalType: emptyFunction,
  });

type ProviderProps = {
  children: any;
};

export function UnlockableModalContextProvider(
  props: ProviderProps
): JSX.Element {
  const [modalType, setModalType] = useState<Maybe<UnlockableModalType>>(null);

  const onHide = () => {
    setModalType(null);
  };

  return (
    <UnlockableModalContext.Provider
      value={{
        isModalShown: modalType != null,
        modalType,
        onHide,
        setModalType,
      }}
    >
      {props.children}
    </UnlockableModalContext.Provider>
  );
}
