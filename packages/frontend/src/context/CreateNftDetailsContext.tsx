/* eslint-disable react/jsx-no-constructed-context-values */
import {
  Context,
  createContext,
  Dispatch,
  useCallback,
  useReducer,
  useState,
} from "react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import arraySum from "formfn-shared/dist/utils/array/arraySum";
import { MAXIMUM_NFT_ATTRIBUTES_COUNT } from "formfn-shared/dist/constants/NftAttributesValidationConstants";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { notify } from "components/toast/notifications";
import { nanoid } from "nanoid";
import isValidTraitType from "formfn-shared/dist/utils/validation/isValidTraitType";
import isValidTraitValue from "formfn-shared/dist/utils/validation/isValidTraitValue";
import useUserContext from "hooks/useUserContext";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { NftAttributeInput } from "hooks/__generated__/useMintNftMutation.graphql";
import CreateEditionType from "types/enums/CreateEditionType";
import isValidEditionSupply from "utils/validation/isValidEditionSupply";
import NftDisclosureTypeExpress_enum from "types/relay/NftDisclosureTypeExpress_enum";

type CreatorPercentage = {
  address: string;
  percentage: string;
};

type CreatorSplitsDispatchAction =
  | {
      index: number;
      percentage: string;
      type: "update_percentage";
    }
  | {
      address: string;
      index: number;
      type: "update_address";
    }
  | {
      index: number;
      type: "remove";
    }
  | {
      type: "add";
    }
  | {
      end: number;
      start: number;
      type: "slice";
    };

type Disclosure = {
  details: Maybe<string>;
  // This lets us save details, even if the user types something and then unchecks the box
  enabled: boolean;
  type: NftDisclosureTypeExpress_enum;
};

type DisclosuresDispatchAction =
  | {
      disclosureType: NftDisclosureTypeExpress_enum;
      type: "enable";
    }
  | {
      disclosureType: NftDisclosureTypeExpress_enum;
      type: "disable";
    }
  | {
      details: string;
      disclosureType: NftDisclosureTypeExpress_enum;
      type: "set_details";
    };

function creatorSplitsReducer(
  state: Array<CreatorPercentage>,
  action: CreatorSplitsDispatchAction
): Array<CreatorPercentage> {
  switch (action.type) {
    case "remove":
      return state.filter((_, index) => index !== action.index);
    case "add":
      return [...state, { address: "", percentage: "" }];
    case "update_percentage":
      return state.map((val, index) =>
        index !== action.index ? val : { ...val, percentage: action.percentage }
      );
    case "update_address":
      return state.map((val, index) =>
        index !== action.index ? val : { ...val, address: action.address }
      );
    case "slice":
      return state.slice(action.start, action.end);
    default:
      return assertUnreachable(
        action,
        `Unsupported action type: ${JSON.stringify(action)}`
      );
  }
}

function disclosuresReducer(
  state: Array<Disclosure>,
  action: DisclosuresDispatchAction
): Array<Disclosure> {
  switch (action.type) {
    case "disable":
      return state.map((disclosure) =>
        disclosure.type !== action.disclosureType
          ? disclosure
          : { ...disclosure, enabled: false }
      );
    case "enable":
      if (
        state.find((disclosure) => disclosure.type === action.disclosureType) !=
        null
      ) {
        // Disclosure already exists in the state
        return state.map((disclosure) =>
          disclosure.type !== action.disclosureType
            ? disclosure
            : { ...disclosure, enabled: true }
        );
      }

      // We need to add the disclosure
      return [
        ...state,
        { details: "", enabled: true, type: action.disclosureType },
      ];
    case "set_details":
      return state.map((disclosure) =>
        disclosure.type !== action.disclosureType
          ? disclosure
          : { ...disclosure, details: action.details }
      );
    default:
      return assertUnreachable(
        action,
        `Unsupported action type: ${JSON.stringify(action)}`
      );
  }
}

function getCreatorSplitsError(creatorSplits: Array<CreatorPercentage>) {
  const creatorSplitsSum = arraySum(
    creatorSplits.map(({ percentage }) => Number(percentage))
  );

  if (creatorSplitsSum !== 100) {
    return "Percentages must add up to 100.";
  }

  const hasEmptyPercentage = creatorSplits.some(
    ({ percentage }) => percentage === ""
  );
  if (hasEmptyPercentage) {
    return "Please specify a percentage for every collaborator.";
  }

  const hasDuplicateCreator =
    removeDuplicatesWithSet(creatorSplits.map(({ address }) => address))
      .length < creatorSplits.length;
  if (hasDuplicateCreator) {
    return "You cannot list the same collaborator twice.";
  }

  const hasInvalidAddress = creatorSplits.some(
    ({ address }) => !isPublicKey(address)
  );
  if (hasInvalidAddress) {
    return "An invalid wallet address was found. Make sure all addresses are valid.";
  }

  return null;
}

type NftAttributeField = NftAttributeInput & {
  id: string;
};

function getEmptyAttribute(): NftAttributeField {
  return {
    id: nanoid(),
    traitType: "",
    value: "",
  };
}

export type CreateNftDetailsContextData = {
  addAttribute: () => void;
  attributes: Array<NftAttributeField>;
  creatorSplits: Array<CreatorPercentage>;
  creatorSplitsError: Maybe<string>;
  creatorSplitsSum: number;
  description: string;
  disableNextButton: boolean;
  disclosures: Array<Disclosure>;
  dispatchCreatorSplits: Dispatch<CreatorSplitsDispatchAction>;
  dispatchDisclosures: Dispatch<DisclosuresDispatchAction>;
  editionSupply: Maybe<number>;
  editionType: Maybe<CreateEditionType>;
  file: Maybe<File>;
  fileDataUrl: Maybe<string>;
  // Files other than images/gifs/videos (e.g. glb files)
  fileNonstandard: Maybe<File>;
  fileNonstandardDataUrl: Maybe<string>;
  hasError: boolean;
  mint: Maybe<string>;
  removeAttribute: (index: number) => void;
  resetCreateNftDetailsInputState: () => void;
  royalties: string;
  setAttributeTraitType: (traitType: string, index: number) => void;
  setAttributeValue: (value: string, index: number) => void;
  setDescription: (val: string) => void;
  setEditionSupply: (val: Maybe<number>) => void;
  setEditionType: (val: Maybe<CreateEditionType>) => void;
  setFile: (val: Maybe<File>) => void;
  setFileNonstandard: (val: Maybe<File>) => void;
  setMint: (val: string) => void;
  setRoyalties: (val: string) => void;
  setShowErrors: (show: boolean) => void;
  setTitle: (val: string) => void;
  showErrors: boolean;
  title: string;
};

export const createNftDetailsContextData: CreateNftDetailsContextData = {
  addAttribute: emptyFunction,
  attributes: [],
  creatorSplits: [],
  creatorSplitsError: null,
  creatorSplitsSum: 100,
  description: "",
  disableNextButton: false,
  disclosures: [],
  dispatchCreatorSplits: emptyFunction,
  dispatchDisclosures: emptyFunction,
  editionSupply: null,
  editionType: null,
  file: null,
  fileDataUrl: null,
  fileNonstandard: null,
  fileNonstandardDataUrl: null,
  hasError: false,
  mint: null,
  removeAttribute: emptyFunction,
  resetCreateNftDetailsInputState: emptyFunction,
  royalties: "5",
  setAttributeTraitType: emptyFunction,
  setAttributeValue: emptyFunction,
  setDescription: emptyFunction,
  setEditionSupply: emptyFunction,
  setEditionType: emptyFunction,
  setFile: emptyFunction,
  setFileNonstandard: emptyFunction,
  setMint: emptyFunction,
  setRoyalties: emptyFunction,
  setShowErrors: emptyFunction,
  setTitle: emptyFunction,
  showErrors: false,
  title: "",
};

type CreateNftDetailsContextDefaultValues = {
  attributes: Array<NftAttributeField>;
  description: string;
  editionSupply: Maybe<number>;
  editionType: Maybe<CreateEditionType>;
  file: Maybe<File>;
  fileDataUrl: Maybe<string>;
  fileNonstandard: Maybe<File>;
  fileNonstandardDataUrl: Maybe<string>;
  mint: Maybe<string>;
  royalties: string;
  showErrors: boolean;
  title: string;
};

const DEFAULT_STATE: CreateNftDetailsContextDefaultValues = {
  attributes: [getEmptyAttribute()],
  description: "",
  editionSupply: null,
  editionType: null,
  file: null,
  fileDataUrl: null,
  fileNonstandard: null,
  fileNonstandardDataUrl: null,
  mint: null,
  royalties: "5",
  showErrors: false,
  title: "",
};

export const CreateNftDetailsContext: Context<CreateNftDetailsContextData> =
  createContext<CreateNftDetailsContextData>(createNftDetailsContextData);

type ProviderProps = {
  children: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValueOverrides?: Partial<CreateNftDetailsContextDefaultValues>;
};

export function CreateNftDetailsContextProvider(
  props: ProviderProps
): JSX.Element {
  const { user } = useUserContext();
  const defaultState = {
    ...DEFAULT_STATE,
    ...props.defaultValueOverrides,
  };
  const [editionType, setEditionType] = useState<Maybe<CreateEditionType>>(
    defaultState.editionType
  );
  const [editionSupply, setEditionSupply] = useState<Maybe<number>>(
    defaultState.editionSupply
  );
  const [title, setTitle] = useState(defaultState.title);
  const [description, setDescription] = useState(defaultState.description);
  const [file, setFile] = useState<Maybe<File>>(defaultState.file);
  const [fileDataUrl, setFileDataUrl] = useState<Maybe<string>>(
    defaultState.fileDataUrl
  );
  const [fileNonstandard, setFileNonstandard] = useState<Maybe<File>>(
    defaultState.fileNonstandard
  );
  const [fileNonstandardDataUrl, setFileNonstandardDataUrl] = useState<
    Maybe<string>
  >(defaultState.fileNonstandardDataUrl);
  const [mint, setMint] = useState<Maybe<string>>(defaultState.mint);
  const [royalties, setRoyalties] = useState<string>(defaultState.royalties);
  const [showErrors, setShowErrors] = useState<boolean>(
    defaultState.showErrors
  );
  const [attributes, setAttributes] = useState<Array<NftAttributeField>>(
    defaultState.attributes
  );

  const resetCreateNftDetailsInputState = () => {
    setEditionType(defaultState.editionType);
    setEditionSupply(defaultState.editionSupply);
    setTitle(defaultState.title);
    setDescription(defaultState.description);
    setFile(defaultState.file);
    setFileDataUrl(defaultState.fileDataUrl);
    setFileNonstandard(defaultState.fileNonstandard);
    setFileNonstandardDataUrl(defaultState.fileNonstandardDataUrl);
    setMint(defaultState.mint);
    setRoyalties(defaultState.royalties);
    setShowErrors(defaultState.showErrors);
    setAttributes(defaultState.attributes);
  };

  const [creatorSplits, dispatchCreatorSplits] = useReducer<
    typeof creatorSplitsReducer
  >(
    creatorSplitsReducer,
    user == null
      ? []
      : [
          {
            address: user.id,
            percentage: "100",
          },
        ]
  );
  const [disclosures, dispatchDisclosures] = useReducer<
    typeof disclosuresReducer
  >(disclosuresReducer, []);

  const creatorSplitsSum = arraySum(
    creatorSplits.map(({ percentage }) => Number(percentage))
  );
  const creatorSplitsError = getCreatorSplitsError(creatorSplits);

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

  const setFileNonstandardNew = useCallback(
    (fileInner: Maybe<File>) => {
      setFileNonstandard(fileInner);
      if (fileInner != null) {
        setFileNonstandardDataUrl(URL.createObjectURL(fileInner));
      } else {
        setFileNonstandardDataUrl(null);
      }
    },
    [setFileNonstandard]
  );

  const addAttribute = () => {
    if (attributes.length === MAXIMUM_NFT_ATTRIBUTES_COUNT) {
      notify({
        message: `You can only add up to ${MAXIMUM_NFT_ATTRIBUTES_COUNT} attributes.`,
        type: "warning",
      });
      return;
    }

    setAttributes(attributes.concat(getEmptyAttribute()));
  };

  const setAttributeTraitType = (traitType: string, index: number) => {
    setAttributes(
      attributes.map((val, i) => (index === i ? { ...val, traitType } : val))
    );
  };

  const setAttributeValue = (value: string, index: number) => {
    setAttributes(
      attributes.map((val, i) => (index === i ? { ...val, value } : val))
    );
  };

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((x, i) => i !== index));
  };

  const hasBlankAttribute = attributes.some(
    ({ traitType, value }) => traitType === "" && value === ""
  );

  const hasInvalidTitle = title.length === 0;
  const hasValidAttributes =
    // Since we show inputs for 1 attribute by default, it is valid if the user doesn't fill them in.
    (hasBlankAttribute && attributes.length === 1) ||
    attributes.every(
      ({ traitType, value }) =>
        isValidTraitType(traitType) && isValidTraitValue(value)
    );
  const hasInvalidAttributes = !hasValidAttributes;
  const hasInvalidCreatorSplits = creatorSplitsError != null;
  const hasInvalidEditionSupply =
    editionType === CreateEditionType.LimitedEditions &&
    !isValidEditionSupply(editionSupply);
  const hasError =
    hasInvalidTitle ||
    hasInvalidAttributes ||
    hasInvalidCreatorSplits ||
    hasInvalidEditionSupply;

  return (
    <CreateNftDetailsContext.Provider
      value={{
        addAttribute,
        attributes,
        creatorSplits,
        creatorSplitsError,
        creatorSplitsSum,
        description,
        disableNextButton: hasInvalidTitle,
        disclosures,
        dispatchCreatorSplits,
        dispatchDisclosures,
        editionSupply,
        editionType,
        file,
        fileDataUrl,
        fileNonstandard,
        fileNonstandardDataUrl,
        hasError,
        mint,
        removeAttribute,
        resetCreateNftDetailsInputState,
        royalties,
        setAttributeTraitType,
        setAttributeValue,
        setDescription,
        setEditionSupply,
        setEditionType,
        setFile: setFileNew,
        setFileNonstandard: setFileNonstandardNew,
        setMint,
        setRoyalties,
        setShowErrors,
        setTitle,
        showErrors,
        title,
      }}
    >
      {props.children}
    </CreateNftDetailsContext.Provider>
  );
}
