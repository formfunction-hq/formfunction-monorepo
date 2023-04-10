import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { useContext, useState } from "react";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { v4 } from "uuid";
import logIfNotProd from "utils/logIfNotProd";
import getCdnUrlForProfileOrCoverPhoto from "utils/getCdnUrlForProfileOrCoverPhoto";
import uploadSeriesPreviewImage from "utils/firebase/uploadSeriesPreviewImage";
import uploadSeriesCoverImage from "utils/firebase/uploadSeriesCoverImage";
import useSolanaContext from "hooks/useSolanaContext";
import { MIN_MINT_BALANCE_LAMPORTS } from "formfn-shared/dist/constants/SolanaConstants";
import { notify } from "components/toast/notifications";
import getAccountBalance from "formfn-shared/dist/utils/solana/getAccountBalance";
import formatLamports from "formfn-shared/dist/utils/formatLamports";
import getSeriesLinkRelative from "formfn-shared/dist/utils/links/getSeriesLinkRelative";
import useUploadNftToArweave, {
  OnUploadNftToArweaveCompletedInput,
} from "hooks/useUploadNftToArweave";
import getArweaveLink from "formfn-shared/dist/utils/getArweaveLink";
import { CreateSeriesModalMutation } from "components/modal/__generated__/CreateSeriesModalMutation.graphql";
import {
  CreateSeriesModalPhotosMutation,
  Photo_insert_input,
} from "components/modal/__generated__/CreateSeriesModalPhotosMutation.graphql";
import { SeriesMetadataContext } from "context/SeriesMetadataContext";
import invariant from "tiny-invariant";
import mintMasterEdition from "utils/solana/metaplex/mintMasterEdition";
import { MintMasterEditionResult } from "utils/solana/metaplex/sendMintMasterEditionTx";
import SeriesMetadataModal from "components/modal/SeriesMetadataModal";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useUserContext from "hooks/useUserContext";

type Props = {
  isShown: boolean;
  onHide: () => void;
};

const mutation = graphql`
  mutation CreateSeriesModalMutation($object: Series_insert_input!) {
    insert_Series_one(object: $object) {
      id
      slug

      Creator {
        username
      }
    }
  }
`;

const createPhotosMutation = graphql`
  mutation CreateSeriesModalPhotosMutation($objects: [Photo_insert_input!]!) {
    insert_Photo(objects: $objects) {
      returning {
        id
        photoUrl
      }
    }
  }
`;

export default function CreateSeriesModal({
  isShown,
  onHide,
}: Props): Maybe<JSX.Element> {
  const { user } = useUserContext();
  const { anchorWallet, connection, getAuctionHouseSdk } = useSolanaContext();
  const { uploadNftToArweave } = useUploadNftToArweave();
  const {
    coverImageFile,
    description,
    name,
    previewImageFile,
    setErrorMessage,
    setIsLoading,
    setIsSuccess,
    slug,
  } = useContext(SeriesMetadataContext);

  const [commit] = useMutation<CreateSeriesModalMutation>(mutation);
  const [commitPhotos] =
    useMutation<CreateSeriesModalPhotosMutation>(createPhotosMutation);
  const previewImageId = v4();
  let coverImageId: Maybe<string> = null;
  const [isWaitingForTransactionShown, setIsWaitingForTransactionShown] =
    useState(false);
  const resetLoadingStates = () => {
    setIsWaitingForTransactionShown(false);
    setIsLoading(false);
  };

  const validateInputs = () => {
    if (previewImageFile == null) {
      return ErrorMessageMsg.RequiredInputsMissing;
    }

    return null;
  };

  const mintAndCommit = async (input: OnUploadNftToArweaveCompletedInput) => {
    invariant(
      anchorWallet != null && anchorWallet.publicKey != null,
      "Wallet must be connected"
    );
    const { assetFileName, metadataArweaveTxid, metadataContent } = input;
    notify({
      description: "Creating series...",
      message: "File uploaded!",
    });
    setIsWaitingForTransactionShown(true);
    let result: Maybe<MintMasterEditionResult> = null;
    try {
      const metadataArweaveLink = getArweaveLink(metadataArweaveTxid);
      result = await mintMasterEdition({
        assetFileName,
        auctionHouseSdk: getAuctionHouseSdk("Solana")!,
        connection,
        maxSupply: 0,
        metadata: metadataContent,
        metadataArweaveLink,
        rawTxExtraData: { isSeries: true },
        wallet: anchorWallet,
      });
    } catch {
      setIsWaitingForTransactionShown(false);
    }

    if (result == null) {
      resetLoadingStates();
      return;
    }

    commit({
      onCompleted: (response) => {
        notify({ message: "Series created!", txid: result!.mintNftTxid });
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = getSeriesLinkRelative(
            response!.insert_Series_one!.Creator.username,
            response!.insert_Series_one!.slug
          );
        }, 500);
      },
      onError: () => {
        notifyUnexpectedError();
        resetLoadingStates();
      },
      variables: {
        object: {
          avatarPhotoId: previewImageId,
          coverPhotoId: coverImageId,
          creatorId: user!.id,
          description,
          id: result.mintAccount.toString(),
          mint: result.mintAccount.toString(),
          name,
          slug,
        },
      },
    });
  };

  const onSubmit = async () => {
    logIfNotProd("submit");
    setIsLoading(true);

    invariant(
      anchorWallet != null && anchorWallet.publicKey != null,
      "Wallet must be connected"
    );

    const balance = await getAccountBalance(connection, anchorWallet.publicKey);
    if (balance == null || balance < MIN_MINT_BALANCE_LAMPORTS) {
      notify({
        description: `You must have at least ${formatLamports(
          MIN_MINT_BALANCE_LAMPORTS
        )} SOL to create a series`,
        message: "Insufficient funds",
        type: "error",
      });
      resetLoadingStates();
      return;
    }

    const objects: Array<Photo_insert_input> = [];

    notify({
      description: "Please wait...",
      message: "Uploading files",
    });

    const { fileName: previewImageStoragePath } =
      await uploadSeriesPreviewImage(previewImageFile!);
    objects.push({
      id: previewImageId,
      photoUrl: getCdnUrlForProfileOrCoverPhoto(previewImageStoragePath),
      storagePath: previewImageStoragePath,
      userId: user!.id,
    });

    if (coverImageFile != null) {
      coverImageId = v4();
      const { fileName: coverImageStoragePath } = await uploadSeriesCoverImage(
        coverImageFile
      );
      objects.push({
        id: coverImageId,
        photoUrl: getCdnUrlForProfileOrCoverPhoto(coverImageStoragePath),
        storagePath: coverImageStoragePath,
        userId: user!.id,
      });
    }

    commitPhotos({
      onCompleted: () => {
        uploadNftToArweave({
          attributes: [],
          collectionName: name,
          description,
          file: previewImageFile!,
          fileFirebasePath: previewImageStoragePath,
          name,
          nonstandardFile: null,
          nonstandardFileFirebasePath: null,
          onCompleted: mintAndCommit,
          onError: () => {
            notifyUnexpectedError();
            resetLoadingStates();
          },
          royalties: "0",
        });
      },
      onError: () => {
        resetLoadingStates();
        setErrorMessage(ErrorMessageMsg.UnexpectedError);
      },
      variables: {
        objects,
      },
    });
  };

  // Explicitly re-render so we can use useEffect to reset data upon mount
  return isShown ? (
    <SeriesMetadataModal
      title="Create Series"
      isShown
      isWaitingForTransactionShown={isWaitingForTransactionShown}
      onHide={onHide}
      onSubmit={onSubmit}
      validateInputs={validateInputs}
    />
  ) : null;
}
