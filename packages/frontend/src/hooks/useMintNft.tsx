import graphql from "babel-plugin-relay/macro";
import {
  InsertNftInput,
  useMintNftMutation,
} from "hooks/__generated__/useMintNftMutation.graphql";
import { notify } from "components/toast/notifications";
import useSolanaContext from "hooks/useSolanaContext";
import useUserContext from "hooks/useUserContext";
import { useMutation } from "react-relay";
import formatLamports from "formfn-shared/dist/utils/formatLamports";
import getArweaveLink from "formfn-shared/dist/utils/getArweaveLink";
import { MintMasterEditionResult } from "utils/solana/metaplex/sendMintMasterEditionTx";
import getAccountBalance from "formfn-shared/dist/utils/solana/getAccountBalance";
import invariant from "tiny-invariant";
import useUploadNftToArweave, {
  OnUploadNftToArweaveCompletedInput,
} from "hooks/useUploadNftToArweave";
import { MIN_MINT_BALANCE_LAMPORTS } from "formfn-shared/dist/constants/SolanaConstants";
import { nanoid } from "nanoid";
import uploadFile from "utils/firebase/uploadFile";
import getFileExt from "utils/getFileExt";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import getBoundedBasisPoints from "utils/getBoundedBasisPoints";
import mintMasterEdition from "utils/solana/metaplex/mintMasterEdition";
import mintMasterEditionPnftAndSetupNewDistributor from "utils/solana/metaplex/mintMasterEditionPnftAndSetupNewDistributor";
import MintType from "types/enums/MintType";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import getAssetCdnUrl from "formfn-shared/dist/utils/getAssetCdnUrl";
import getContentTypeFromFilename from "formfn-shared/dist/utils/getContentTypeFromFilename";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import NftStatusExpress_enum from "types/relay/NftStatusExpress_enum";
import getMediaFileDimensions from "utils/files/getMediaFileDimensions";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import mintMasterEditionAndCreateEditionDistributor from "utils/solana/metaplex/mintMasterEditionAndSetupAirdropDistributor";

const mutation = graphql`
  mutation useMintNftMutation(
    $insertNftTransactionInput: InsertNftTransactionInput!
  ) {
    insertNftTransaction(input: $insertNftTransactionInput) {
      transaction {
        ...NftTransaction_NftTransactionExpress
      }
    }
  }
`;

type Args = {
  additionalIxs?: Array<TransactionInstruction>;
  includeCreateLastBidPriceIx?: boolean;
  mintType: MintType;
  onComplete: (mintAccountPubkey: PublicKey, nftLinkRelative: string) => void;
  onUploadComplete?: () => void;
  setIsLoading: (loading: boolean) => void;
};

type NotifyStrings = {
  notifyLoadingMessage: string;
  notifySuccessMessage: string;
};

const defaultNotifyStrings: NotifyStrings = {
  notifyLoadingMessage: "Minting NFT...",
  notifySuccessMessage: "Minted NFT!",
};

export default function useMintNft({
  additionalIxs,
  mintType,
  includeCreateLastBidPriceIx,
  onComplete,
  onUploadComplete,
  setIsLoading,
}: Args) {
  const [commit] = useMutation<useMintNftMutation>(mutation);
  const { user } = useUserContext();
  const {
    creatorSplits,
    description,
    disclosures,
    editionType,
    file,
    fileDataUrl,
    fileNonstandard,
    editionSupply: editionSupplyOriginal,
    royalties,
    title,
    attributes,
    setMint,
  } = useCreateNftDetailsContext();
  const { uploadNftToArweave } = useUploadNftToArweave();
  const { anchorWallet, getAuctionHouseSdk, connection, gumdropSdk } =
    useSolanaContext();
  const editionSupply = editionType == null ? 0 : editionSupplyOriginal;

  const mintAndCommit = async (
    input: OnUploadNftToArweaveCompletedInput,
    notifyStrings: NotifyStrings,
    statusOverride?: NftStatusExpress_enum
  ) => {
    invariant(anchorWallet != null);
    const walletAddress = anchorWallet.publicKey.toString();

    const { notifyLoadingMessage, notifySuccessMessage } = notifyStrings;

    const {
      assetFileName,
      metadataArweaveTxid,
      assetArweaveTxid,
      metadataContent,
      nonstandardAsset,
    } = input;
    notify({
      description: notifyLoadingMessage,
      message: "File uploaded!",
    });

    const metadataArweaveLink = getArweaveLink(metadataArweaveTxid);

    let mintResults: Maybe<MintMasterEditionResult> = null;
    const dimensions = await getMediaFileDimensions(file!, fileDataUrl!);

    const attributesDbList = metadataContent.attributes?.map((val) => ({
      traitType: val.trait_type,
      value: val.value,
    }));
    // NOTE: since we don't have access to the newly generated mint here,
    // `mintMasterEdition` takes care of inserting the `mint` into `insertNftInput`
    // in `rawTxExtraData`
    const insertNftInput: InsertNftInput = {
      assetArweaveTxid,
      assetHeight: dimensions?.height,
      assetWidth: dimensions?.width,
      attributes: attributesDbList,
      contentType: file!.type,
      creatorId: walletAddress,
      creatorsMetadataString: JSON.stringify(
        metadataContent.properties.creators
      ),
      description,
      disclosures: disclosures
        .filter(({ enabled }) => enabled)
        .map((disclosure) => ({
          details: disclosure.details,
          type: disclosure.type,
        })),
      image: assetFileName,
      isPnft: mintType === MintType.Pnft,
      maxSupply: editionSupply,
      metadataArweaveTxid,
      mint: "OVERRIDDEN_LATER",
      name: title,
      nonstandardAsset:
        nonstandardAsset == null
          ? null
          : {
              arweaveTxid: nonstandardAsset.arweaveTxid,
              // Don't use file.type, it's not always correct (e.g. for .glb files)
              contentType: getContentTypeFromFilename(
                nonstandardAsset.assetFileName
              ),
              downloadUrl: getAssetCdnUrl(nonstandardAsset.assetFileName),
              path: nonstandardAsset.assetFileName,
            },
      ownerId: walletAddress,
      sellerFeeBasisPoints: getBoundedBasisPoints(royalties),
      status: statusOverride ?? ("Owned" as const),
    };
    switch (mintType) {
      case MintType.Regular:
        mintResults = await mintMasterEdition({
          assetFileName,
          auctionHouseSdk: getAuctionHouseSdk("Solana")!,
          connection,
          includeCreateLastBidPriceIx,
          maxSupply: editionSupply,
          metadata: metadataContent,
          metadataArweaveLink,
          rawTxExtraData: { insertNftInput },
          wallet: anchorWallet,
        });
        break;
      case MintType.Pnft:
        invariant(gumdropSdk != null);
        mintResults = await mintMasterEditionPnftAndSetupNewDistributor({
          auctionHouseSdk: getAuctionHouseSdk("Solana")!,
          connection,
          gumdropSdk,
          metadata: metadataContent,
          metadataArweaveLink,
          wallet: anchorWallet,
        });
        break;
      case MintType.Airdrop:
        mintResults = await mintMasterEditionAndCreateEditionDistributor({
          additionalIxs,
          auctionHouseSdk: getAuctionHouseSdk("Solana")!,
          connection,
          maxSupply: editionSupply,
          metadata: metadataContent,
          metadataArweaveLink,
          wallet: anchorWallet,
        });
        break;
      default:
        assertUnreachable(mintType);
    }

    if (mintResults == null) {
      setIsLoading(false);
      return;
    }

    const { mintAccount, mintNftTxid } = mintResults;
    const mintKeyString = mintAccount.toString();

    commit({
      onCompleted: () => {
        notify({
          message: notifySuccessMessage,
          txid: mintResults!.mintNftTxid,
        });
        setMint(mintKeyString);
        onComplete(
          mintAccount,
          getNftLinkRelative(
            user?.username,
            mintAccount.toString(),
            dimensions?.width ?? null,
            dimensions?.height ?? null
          )
        );
      },
      onError: () => {
        notifyUnexpectedError();
        setIsLoading(false);
      },
      variables: {
        insertNftTransactionInput: {
          creatorId: walletAddress,
          fromUserId: walletAddress,
          insertNftInput: {
            ...insertNftInput,
            mint: mintKeyString,
          },
          mint: mintKeyString,
          toUserId: walletAddress,
          txid: mintNftTxid,
          type: "Minted",
        },
      },
    });
  };

  return {
    mintNft: async ({
      notifyStrings = defaultNotifyStrings,
      statusOverride,
    }: {
      notifyStrings?: NotifyStrings;
      statusOverride?: NftStatusExpress_enum;
    }) => {
      setIsLoading(true);

      if (anchorWallet?.publicKey == null) {
        notify({
          message: "Please connect your wallet",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      const balance = await getAccountBalance(
        connection,
        anchorWallet.publicKey!
      );
      if (balance == null || balance < MIN_MINT_BALANCE_LAMPORTS) {
        notify({
          description: `You must have at least ${formatLamports(
            MIN_MINT_BALANCE_LAMPORTS
          )} SOL to mint an NFT`,
          message: "Insufficient funds",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      if (file == null || isEmptyString(title)) {
        notify({
          description: "Please select a file and enter a title!",
          message: "Required inputs missing",
          type: "error",
        });
        setIsLoading(false);
        return;
      }

      notify({
        description: "Please wait...",
        message: "Uploading file",
      });
      const fileExtension = getFileExt(file!);
      const nonstandardFileExtension =
        fileNonstandard == null ? null : getFileExt(fileNonstandard);
      const [{ fileName }, { fileName: nonstandardFileName }] =
        await Promise.all([
          uploadFile(file!, `nft-images/${nanoid()}.${fileExtension}`),
          fileNonstandard == null
            ? { fileName: undefined }
            : uploadFile(
                fileNonstandard,
                `nft-images/${nanoid()}.${nonstandardFileExtension}`
              ),
        ]);

      const attributesInputList = removeDuplicatesWithComparison(
        attributes,
        (a, b) => a.traitType === b.traitType && a.value === b.value
      )
        .filter(({ traitType, value }) => traitType !== "" && value !== "")
        .map((attribute) => ({
          trait_type: attribute.traitType,
          value: attribute.value,
        }));

      await uploadNftToArweave({
        attributes: attributesInputList,
        collectionName: user?.username ?? undefined,
        creators: creatorSplits.map((creatorPercentage) => ({
          address: creatorPercentage.address,
          share: Number(creatorPercentage.percentage),
          verified: arePublicKeysEqual(
            anchorWallet.publicKey,
            creatorPercentage.address
          ),
        })),
        description,
        file: file!,
        fileFirebasePath: fileName,
        name: title,
        nonstandardFile: fileNonstandard,
        nonstandardFileFirebasePath: nonstandardFileName,
        onCompleted: async (input) => {
          if (onUploadComplete != null) {
            onUploadComplete();
          }
          try {
            await mintAndCommit(input, notifyStrings, statusOverride);
          } catch (err: any) {
            logError(AnalyticsEvent.MintNftError, err, input);
            notifyUnexpectedError();
            setIsLoading(false);
          }
        },
        onError: () => {
          notifyUnexpectedError();
          setIsLoading(false);
        },
        royalties,
      });
    },
  };
}
