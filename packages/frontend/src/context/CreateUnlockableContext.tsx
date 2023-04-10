/* eslint-disable react/jsx-no-constructed-context-values */
import { Context, createContext, useCallback, useState } from "react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import getUnlockableAssetStoragePath from "utils/firebase/storage-paths/getUnlockableAssetStoragePath";
import useUserContext from "hooks/useUserContext";
import uploadFile from "utils/firebase/uploadFile";
import getFileExt from "utils/getFileExt";
import invariant from "tiny-invariant";
import { v4 } from "uuid";
import { InsertUnlockableInput } from "hooks/__generated__/useListNftForSaleMutation.graphql";
import isValidPrice from "utils/price/isValidPrice";
import { UnlockableCategoryType } from "types/UnlockableCategoryType";
import useListingContext from "hooks/useListingContext";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";

async function createMutationInput(args: {
  activationPrice: string;
  category: UnlockableCategoryType;
  decimals: number;
  description: Maybe<string>;
  file: File;
  title: string;
  userId: string;
}): Promise<InsertUnlockableInput> {
  const {
    activationPrice,
    category,
    decimals,
    description,
    file,
    title,
    userId,
  } = args;

  // The id is generated client-side to support back-filling in case errors occur.
  const unlockableId = v4();
  const { downloadUrl, fileName } = await uploadFile(
    file,
    getUnlockableAssetStoragePath(userId, getFileExt(file))
  );

  const input: InsertUnlockableInput = {
    asset: {
      contentType: file.type,
      downloadUrl,
      path: fileName,
    },
    unlockable: {
      activationPriceInLamports:
        activationPrice === ""
          ? null
          : convertToFullDecimals(activationPrice, decimals),
      category,
      description,
      id: unlockableId,
      name: title,
    },
  };

  return input;
}

export type CreateUnlockableContextData = {
  activationPrice: string;
  category: Maybe<UnlockableCategoryType>;
  createUnlockableMutationInput: () => Promise<InsertUnlockableInput>;
  description: string;
  enableActivationPrice: boolean;
  file: Maybe<File>;
  fileDataUrl: Maybe<string>;
  hasError: boolean;
  resetCreateUnlockableInputState: () => void;
  setActivationPrice: (val: string) => void;
  setCategory: (val: UnlockableCategoryType) => void;
  setDescription: (val: string) => void;
  setEnableActivationPrice: (enabled: boolean) => void;
  setFile: (val: File) => void;
  setShowErrors: (show: boolean) => void;
  setTitle: (val: string) => void;
  showErrors: boolean;
  title: string;
};

const DEFAULT_STATE = {
  activationPrice: "",
  category: null,
  description: "",
  enableActivationPrice: false,
  file: null,
  fileDataUrl: null,
  showErrors: false,
  title: "",
};

const createUnlockableContextData: CreateUnlockableContextData = {
  activationPrice: DEFAULT_STATE.activationPrice,
  category: DEFAULT_STATE.category,
  createUnlockableMutationInput: async () => ({} as InsertUnlockableInput),
  description: DEFAULT_STATE.description,
  enableActivationPrice: DEFAULT_STATE.enableActivationPrice,
  file: DEFAULT_STATE.file,
  fileDataUrl: DEFAULT_STATE.fileDataUrl,
  hasError: false,
  resetCreateUnlockableInputState: emptyFunction,
  setActivationPrice: emptyFunction,
  setCategory: emptyFunction,
  setDescription: emptyFunction,
  setEnableActivationPrice: emptyFunction,
  setFile: emptyFunction,
  setShowErrors: emptyFunction,
  setTitle: emptyFunction,
  showErrors: DEFAULT_STATE.showErrors,
  title: DEFAULT_STATE.title,
};

export const CreateUnlockableContext: Context<CreateUnlockableContextData> =
  createContext<CreateUnlockableContextData>(createUnlockableContextData);

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export function CreateUnlockableContextProvider(
  props: ProviderProps
): JSX.Element {
  const { user } = useUserContext();
  const [title, setTitle] = useState(DEFAULT_STATE.title);
  const [description, setDescription] = useState(DEFAULT_STATE.description);
  const [enableActivationPrice, setEnableActivationPrice] = useState(
    DEFAULT_STATE.enableActivationPrice
  );
  const [activationPrice, setActivationPrice] = useState(
    DEFAULT_STATE.activationPrice
  );
  const [category, setCategory] = useState<Maybe<UnlockableCategoryType>>(
    DEFAULT_STATE.category
  );
  const [file, setFile] = useState<Maybe<File>>(DEFAULT_STATE.file);
  const [fileDataUrl, setFileDataUrl] = useState<Maybe<string>>(
    DEFAULT_STATE.fileDataUrl
  );
  const [showErrors, setShowErrors] = useState<boolean>(
    DEFAULT_STATE.showErrors
  );
  const { currencyConfig } = useListingContext();

  const resetCreateUnlockableInputState = () => {
    setActivationPrice(DEFAULT_STATE.activationPrice);
    setCategory(DEFAULT_STATE.category);
    setDescription(DEFAULT_STATE.description);
    setEnableActivationPrice(DEFAULT_STATE.enableActivationPrice);
    setFile(DEFAULT_STATE.file);
    setFileDataUrl(DEFAULT_STATE.fileDataUrl);
    setShowErrors(DEFAULT_STATE.showErrors);
    setTitle(DEFAULT_STATE.title);
  };

  const setFileNew = useCallback(
    (fileInner: Maybe<File>) => {
      setFile(fileInner);
      if (fileInner != null) {
        setFileDataUrl(URL.createObjectURL(fileInner));
      } else {
        setFileDataUrl(null);
      }
    },
    [setFile]
  );

  const createUnlockableMutationInput = useCallback(() => {
    invariant(file != null);
    invariant(category != null);
    invariant(user?.id != null);
    return createMutationInput({
      activationPrice,
      category,
      decimals: currencyConfig.decimals,
      description,
      file,
      title,
      userId: user.id,
    });
  }, [
    activationPrice,
    category,
    currencyConfig,
    title,
    description,
    file,
    user,
  ]);

  const hasInvalidFile = file == null;
  const hasInvalidTitle = title.length === 0;
  const hasInvalidCategory = category == null;
  const hasInvalidActivationPrice =
    enableActivationPrice &&
    !isValidPrice(activationPrice, currencyConfig.decimals);
  const hasError =
    hasInvalidFile ||
    hasInvalidTitle ||
    hasInvalidCategory ||
    hasInvalidActivationPrice;

  return (
    <CreateUnlockableContext.Provider
      value={{
        activationPrice,
        category,
        createUnlockableMutationInput,
        description,
        enableActivationPrice,
        file,
        fileDataUrl,
        hasError,
        resetCreateUnlockableInputState,
        setActivationPrice,
        setCategory,
        setDescription,
        setEnableActivationPrice,
        setFile: setFileNew,
        setShowErrors,
        setTitle,
        showErrors,
        title,
      }}
    >
      {props.children}
    </CreateUnlockableContext.Provider>
  );
}
