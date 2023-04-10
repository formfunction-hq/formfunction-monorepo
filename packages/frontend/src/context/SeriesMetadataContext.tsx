/* eslint-disable react/jsx-no-constructed-context-values */
import { Context, createContext, useState } from "react";

import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { SeriesMetadataContext_Series$key } from "context/__generated__/SeriesMetadataContext_Series.graphql";
import getDashCasedString from "formfn-shared/dist/utils/string/getDashCasedString";

const seriesFragment = graphql`
  fragment SeriesMetadataContext_Series on Series {
    name
    description
    slug

    AvatarPhoto {
      photoUrl
    }

    CoverPhoto {
      photoUrl
    }
  }
`;

export type SeriesMetadataData = {
  coverImageFile: Maybe<File>;
  coverImageUrl: Undef<string>;
  description: string;
  errorMessage: Maybe<string>;
  isLoading: boolean;
  isSlugUpdated: boolean;
  isSuccess: boolean;
  name: string;
  previewImageFile: Maybe<File>;
  previewImageUrl: Undef<string>;
  resetData: () => void;
  setCoverImageFile: (val: File) => void;
  setCoverImageUrl: (val: Undef<string>) => void;
  setDescription: (val: string) => void;
  setErrorMessage: (val: Maybe<string>) => void;
  setIsLoading: (val: boolean) => void;
  setIsSuccess: (val: boolean) => void;
  setName: (val: string) => void;
  setPreviewImageFile: (val: File) => void;
  setPreviewImageUrl: (val: Undef<string>) => void;
  shouldReuploadToArweave: boolean;
  slug: string;
};

export const SeriesMetadataContext: Context<SeriesMetadataData> =
  createContext<SeriesMetadataData>({
    coverImageFile: null,
    coverImageUrl: undefined,
    description: "",
    errorMessage: null,
    isLoading: false,
    isSlugUpdated: false,
    isSuccess: false,
    name: "",
    previewImageFile: null,
    previewImageUrl: undefined,
    resetData: emptyFunction,
    setCoverImageFile: emptyFunction,
    setCoverImageUrl: emptyFunction,
    setDescription: emptyFunction,
    setErrorMessage: emptyFunction,
    setIsLoading: emptyFunction,
    setIsSuccess: emptyFunction,
    setName: emptyFunction,
    setPreviewImageFile: emptyFunction,
    setPreviewImageUrl: emptyFunction,
    shouldReuploadToArweave: false,
    slug: "",
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  series?: SeriesMetadataContext_Series$key;
};

export default function SeriesMetadataContextProvider(
  props: ProviderProps
): JSX.Element {
  const seriesData = useFragment(seriesFragment, props.series ?? null);
  const [isSlugUpdated, setIsSlugUpdated] = useState<boolean>(false);
  const [shouldReuploadToArweave, setShouldReuploadToArweave] =
    useState<boolean>(false);
  const [name, setName] = useState<string>(
    seriesData != null ? seriesData.name : ""
  );
  const [slug, setSlug] = useState<string>(
    seriesData != null ? seriesData.slug : ""
  );
  const [description, setDescription] = useState<string>(
    seriesData != null ? seriesData.description : ""
  );
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewImageFile, setPreviewImageFile] = useState<Maybe<File>>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<Undef<string>>(
    seriesData != null ? seriesData.AvatarPhoto.photoUrl : undefined
  );
  const [coverImageFile, setCoverImageFile] = useState<Maybe<File>>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<Undef<string>>(
    seriesData != null ? seriesData?.CoverPhoto?.photoUrl : undefined
  );

  const resetData = () => {
    setIsSlugUpdated(false);
    setShouldReuploadToArweave(false);
    setName(seriesData != null ? seriesData.name : "");
    setSlug(seriesData != null ? seriesData.slug : "");
    setDescription(seriesData != null ? seriesData.description : "");
    setErrorMessage(null);
    setIsLoading(false);
    setIsSuccess(false);
    setPreviewImageFile(null);
    setPreviewImageUrl(
      seriesData != null ? seriesData.AvatarPhoto.photoUrl : undefined
    );
    setCoverImageFile(null);
    setCoverImageUrl(
      seriesData != null ? seriesData?.CoverPhoto?.photoUrl : undefined
    );
  };

  return (
    <SeriesMetadataContext.Provider
      value={{
        coverImageFile,
        coverImageUrl,
        description,
        errorMessage,
        isLoading,
        isSlugUpdated,
        isSuccess,
        name,
        previewImageFile,
        previewImageUrl,
        resetData,
        setCoverImageFile,
        setCoverImageUrl,
        setDescription: (val: string) => {
          setShouldReuploadToArweave(val !== seriesData?.description);
          setDescription(val);
        },
        setErrorMessage,
        setIsLoading,
        setIsSuccess,
        setName: (val: string) => {
          const newSlug = getDashCasedString(val);
          setShouldReuploadToArweave(val !== seriesData?.name);
          setIsSlugUpdated(newSlug !== seriesData?.slug);
          setName(val);
          setSlug(newSlug);
        },
        setPreviewImageFile: (val: File) => {
          setShouldReuploadToArweave(true);
          setPreviewImageFile(val);
        },
        setPreviewImageUrl,
        shouldReuploadToArweave,
        slug,
      }}
    >
      {props.children}
    </SeriesMetadataContext.Provider>
  );
}
