/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Context,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import ImportStep from "types/enums/ImportStep";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { ImportPreviewImportNftsMutation$data } from "components/pages/import/__generated__/ImportPreviewImportNftsMutation.graphql";

export type ImportContextData = {
  importResponse: Maybe<ImportPreviewImportNftsMutation$data>;
  mintAddresses: string;
  mintAddressesArray: Array<string>;
  mintAddressesArrayUnfiltered: Array<string>;
  removedMintAddresses: Set<string>;
  setImportResponse: (val: Maybe<ImportPreviewImportNftsMutation$data>) => void;
  setMintAddresses: (val: string) => void;
  setRemovedMintAddresses: Dispatch<SetStateAction<Set<string>>>;
  setStep: (val: ImportStep) => void;
  step: ImportStep;
};

export const ImportContext: Context<ImportContextData> =
  createContext<ImportContextData>({
    importResponse: null,
    mintAddresses: "",
    mintAddressesArray: [],
    mintAddressesArrayUnfiltered: [],
    removedMintAddresses: new Set(),
    setImportResponse: emptyFunction,
    setMintAddresses: emptyFunction,
    setRemovedMintAddresses: emptyFunction,
    setStep: emptyFunction,
    step: ImportStep.Info,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function ImportContextProvider(props: ProviderProps): JSX.Element {
  const [step, setStep] = useState<ImportStep>(ImportStep.Info);
  const [importResponse, setImportResponse] =
    useState<Maybe<ImportPreviewImportNftsMutation$data>>(null);
  const [mintAddresses, setMintAddresses] = useState<string>("");
  const [removedMintAddresses, setRemovedMintAddresses] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    setRemovedMintAddresses(new Set());
    window.scrollTo({ top: 0 });
  }, [step]);

  return (
    <ImportContext.Provider
      value={{
        importResponse,
        mintAddresses,
        mintAddressesArray: mintAddresses
          .split(",")
          .map((val) => val.trim())
          .filter((val) => isPublicKey(val)),
        mintAddressesArrayUnfiltered: mintAddresses
          .split(",")
          .map((val) => val.trim()),
        removedMintAddresses,
        setImportResponse,
        setMintAddresses,
        setRemovedMintAddresses,
        setStep,
        step,
      }}
    >
      {props.children}
    </ImportContext.Provider>
  );
}
