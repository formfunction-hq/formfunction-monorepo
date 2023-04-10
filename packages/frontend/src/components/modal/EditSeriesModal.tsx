import graphql from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { useContext, useState } from "react";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { v4 } from "uuid";
import logIfNotProd from "utils/logIfNotProd";
import getCdnUrlForProfileOrCoverPhoto from "utils/getCdnUrlForProfileOrCoverPhoto";
import uploadSeriesPreviewImage from "utils/firebase/uploadSeriesPreviewImage";
import uploadSeriesCoverImage from "utils/firebase/uploadSeriesCoverImage";
import useSolanaContext from "hooks/useSolanaContext";
import { notify } from "components/toast/notifications";
import useUploadNftToArweave, {
  OnUploadNftToArweaveCompletedInput,
} from "hooks/useUploadNftToArweave";
import getArweaveLink from "formfn-shared/dist/utils/getArweaveLink";
import { EditSeriesModalMutation } from "components/modal/__generated__/EditSeriesModalMutation.graphql";
import {
  EditSeriesModalPhotosMutation,
  Photo_insert_input,
} from "components/modal/__generated__/EditSeriesModalPhotosMutation.graphql";
import { SeriesMetadataContext } from "context/SeriesMetadataContext";
import SeriesMetadataModal from "components/modal/SeriesMetadataModal";
import { EditSeriesModal_Series$key } from "components/modal/__generated__/EditSeriesModal_Series.graphql";
import updateMetadata from "utils/solana/metaplex/updateMetadata";
import { PublicKey } from "@solana/web3.js";
import useUserContext from "hooks/useUserContext";
import invariant from "tiny-invariant";
import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";

const seriesFragment = graphql`
  fragment EditSeriesModal_Series on Series {
    id
    mint

    avatarPhotoId
    coverPhotoId

    AvatarPhoto {
      storagePath
    }
  }
`;

const mutation = graphql`
  mutation EditSeriesModalMutation(
    $seriesId: String!
    $update: Series_set_input!
  ) {
    update_Series_by_pk(pk_columns: { id: $seriesId }, _set: $update) {
      slug

      Creator {
        username
      }

      ...EditSeriesModal_Series
      ...SeriesMetadataContext_Series
    }
  }
`;

const createPhotosMutation = graphql`
  mutation EditSeriesModalPhotosMutation($objects: [Photo_insert_input!]!) {
    insert_Photo(objects: $objects) {
      returning {
        id
        photoUrl
      }
    }
  }
`;

type Props = {
  isShown: boolean;
  onHide: () => void;
  series: EditSeriesModal_Series$key;
};

export default function EditSeriesModal({
  isShown,
  onHide,
  series,
}: Props): Maybe<JSX.Element> {
  const { user } = useUserContext();
  const seriesData = useFragment(seriesFragment, series);
  const { anchorWallet, connection } = useSolanaContext();
  const { uploadNftToArweave } = useUploadNftToArweave();
  const {
    coverImageFile,
    description,
    isSlugUpdated,
    name,
    previewImageFile,
    setErrorMessage,
    setIsSuccess,
    setIsLoading,
    shouldReuploadToArweave,
    slug,
  } = useContext(SeriesMetadataContext);
  const [isWaitingForTransactionShown, setIsWaitingForTransactionShown] =
    useState(false);
  const [commit] = useMutation<EditSeriesModalMutation>(mutation);
  const [commitPhotos] =
    useMutation<EditSeriesModalPhotosMutation>(createPhotosMutation);
  const resetLoadingStates = () => {
    setIsWaitingForTransactionShown(false);
    setIsLoading(false);
  };

  let previewImageId: Maybe<string> = null;
  let coverImageId: Maybe<string> = null;

  const updateSeriesMetadataCommit = () =>
    commit({
      onCompleted: (response) => {
        setIsSuccess(true);
        if (isSlugUpdated) {
          setTimeout(() => {
            window.location.href = getSeriesLinkRelative(
              response!.update_Series_by_pk!.Creator.username,
              response!.update_Series_by_pk!.slug
            );
          }, 500);
        } else {
          resetLoadingStates();
          onHide();
        }
      },
      onError: () => {
        notifyUnexpectedError();
        resetLoadingStates();
      },
      variables: {
        seriesId: seriesData.id,
        update: {
          avatarPhotoId: previewImageId ?? seriesData.avatarPhotoId,
          coverPhotoId: coverImageId ?? seriesData.coverPhotoId,
          description,
          name,
          slug,
        },
      },
    });

  const updateSeriesMetadataOnchain = async (
    input: OnUploadNftToArweaveCompletedInput
  ) => {
    const { metadataArweaveTxid } = input;
    notify({
      description: "Please wait...",
      message: "Updating series",
    });
    setIsWaitingForTransactionShown(true);
    let result = null;
    try {
      result = await updateMetadata(
        connection,
        anchorWallet!,
        new PublicKey(seriesData.mint),
        { name, uri: getArweaveLink(metadataArweaveTxid) },
        "Series updated!",
        { isSeries: true }
      );
    } catch {
      setIsWaitingForTransactionShown(false);
    }

    if (result == null) {
      resetLoadingStates();
      return;
    }

    updateSeriesMetadataCommit();
  };

  const onSubmit = async () => {
    invariant(anchorWallet?.publicKey != null, "Wallet must be connected!");

    logIfNotProd("submit edit series metadata");
    setIsLoading(true);

    const objects: Array<Photo_insert_input> = [];
    if (previewImageFile != null || coverImageFile != null) {
      notify({
        description: "Please wait...",
        message: "Uploading files",
      });
    }

    let previewImageStoragePath = seriesData.AvatarPhoto.storagePath;
    if (previewImageFile != null) {
      previewImageId = v4();
      const { fileName } = await uploadSeriesPreviewImage(previewImageFile!);
      previewImageStoragePath = fileName;
      objects.push({
        id: previewImageId,
        photoUrl: getCdnUrlForProfileOrCoverPhoto(previewImageStoragePath),
        storagePath: fileName,
        userId: user?.id,
      });
    }

    if (coverImageFile != null) {
      coverImageId = v4();
      const { fileName: coverImageStoragePath } = await uploadSeriesCoverImage(
        coverImageFile
      );
      objects.push({
        id: coverImageId,
        photoUrl: getCdnUrlForProfileOrCoverPhoto(coverImageStoragePath),
        storagePath: coverImageStoragePath,
        userId: user?.id,
      });
    }

    const commitInner = () => {
      if (shouldReuploadToArweave) {
        // If we updated fields that need to be updated on-chain (everything but cover photo)
        // we upload the new metadata to Arweave first and process
        uploadNftToArweave({
          attributes: [],
          collectionName: name,
          description,
          file: previewImageFile,
          fileFirebasePath: previewImageStoragePath!,
          name,
          nonstandardFile: null,
          nonstandardFileFirebasePath: null,
          onCompleted: updateSeriesMetadataOnchain,
          onError: () => {
            notifyUnexpectedError();
            resetLoadingStates();
          },
          royalties: "0",
        });
      } else {
        // Otherwise, just update the DB
        updateSeriesMetadataCommit();
      }
    };

    // If photos were updated, commit these to DB first and then
    // proceed with the rest of the update
    if (previewImageFile != null || coverImageFile != null) {
      commitPhotos({
        onCompleted: () => {
          commitInner();
        },
        onError: () => {
          resetLoadingStates();
          setErrorMessage(ErrorMessageMsg.UnexpectedError);
        },
        variables: {
          objects,
        },
      });
    } else {
      commitInner();
    }
  };

  // Explicitly re-render so we can use useEffect to reset data upon mount
  return isShown ? (
    <SeriesMetadataModal
      title="Edit Series Info"
      isShown
      isWaitingForTransactionShown={isWaitingForTransactionShown}
      onHide={onHide}
      onSubmit={onSubmit}
    />
  ) : null;
}
