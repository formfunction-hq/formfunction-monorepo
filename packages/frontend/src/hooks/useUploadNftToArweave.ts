import graphql from "babel-plugin-relay/macro";
import useSolanaContext from "hooks/useSolanaContext";
import { useMutation } from "react-relay";
import isNumber from "formfn-shared/dist/utils/numbers/isNumber";
import {
  useUploadNftToArweaveMutation,
  NftMetadataV1Input,
  NftMetadataV1AttributeInput,
  NftMetadataV1CreatorPropertyInput,
} from "hooks/__generated__/useUploadNftToArweaveMutation.graphql";
import getArweaveLink from "formfn-shared/dist/utils/getArweaveLink";
import {
  Maybe,
  MaybeUndef,
  Undef,
} from "formfn-shared/dist/types/UtilityTypes";
import getContentTypeFromFilename from "formfn-shared/dist/utils/getContentTypeFromFilename";
import getNftMetadataFileProperties from "formfn-shared/dist/utils/solana/metaplex/getNftMetadataFileProperties";

const mutation = graphql`
  mutation useUploadNftToArweaveMutation($input: UploadNftToArweaveInput!) {
    uploadNftToArweave(input: $input) {
      assetTxid
      metadataTxid
      nonstandardAssetTxid
    }
  }
`;

function getBoundedBasisPoints(royalties: string) {
  // Default is 5%
  const defaultBp = 500;

  if (!isNumber(royalties)) {
    return defaultBp;
  }

  const royaltiesNum = Number(royalties);
  if (royaltiesNum < 0) {
    return defaultBp;
  }
  if (royaltiesNum > 20) {
    return defaultBp;
  }
  return Math.trunc(royaltiesNum * 100);
}

export type OnUploadNftToArweaveCompletedInput = {
  assetArweaveTxid: string;
  assetFileName: string;
  metadataArweaveTxid: string;
  metadataContent: NftMetadataV1Input;
  nonstandardAsset?: MaybeUndef<{
    arweaveTxid: string;
    assetFileName: string;
  }>;
};

export default function useUploadNftToArweave() {
  const [commit] = useMutation<useUploadNftToArweaveMutation>(mutation);
  const { anchorWallet } = useSolanaContext();

  return {
    uploadNftToArweave: async (input: {
      attributes: Array<NftMetadataV1AttributeInput>;
      collectionName: Undef<string>;
      creators?: Array<NftMetadataV1CreatorPropertyInput>;
      description: string;
      file: Maybe<File>;
      fileFirebasePath: string;
      name: string;
      nonstandardFile: Maybe<File>;
      nonstandardFileFirebasePath: MaybeUndef<string>;
      onCompleted: (input: OnUploadNftToArweaveCompletedInput) => void;
      onError: () => void;
      royalties: string;
    }) => {
      const {
        collectionName,
        description,
        file,
        fileFirebasePath,
        name,
        nonstandardFile,
        nonstandardFileFirebasePath,
        attributes,
        creators,
        onCompleted,
        onError,
        royalties,
      } = input;
      const fileType =
        file != null ? file.type : getContentTypeFromFilename(fileFirebasePath);
      const nonstandardFileType = nonstandardFile?.type;

      const metadataContent: NftMetadataV1Input = {
        attributes,
        collection: {
          name: collectionName,
        },
        description,
        name,
        properties: {
          creators: creators ?? [
            {
              address: anchorWallet!.publicKey.toString(),
              share: 100,
              verified: true,
            },
          ],
        },
        seller_fee_basis_points: getBoundedBasisPoints(royalties),
        // TODO: let users control symbol?
        symbol: "",
      };

      commit({
        onCompleted: ({
          uploadNftToArweave: { metadataTxid, assetTxid, nonstandardAssetTxid },
        }) => {
          const fileProperties = getNftMetadataFileProperties([
            {
              type: fileType,
              uri: getArweaveLink(assetTxid),
            },
            ...(nonstandardAssetTxid == null
              ? []
              : [
                  {
                    type: nonstandardFileType ?? "",
                    uri: getArweaveLink(nonstandardAssetTxid),
                  },
                ]),
          ]);
          const newMetadataContent: NftMetadataV1Input = {
            ...metadataContent,
            animation_url: fileProperties.animation_url,
            properties: {
              ...metadataContent.properties,
              files: fileProperties.properties.files,
            },
          };

          onCompleted({
            assetArweaveTxid: assetTxid,
            assetFileName: fileFirebasePath,
            metadataArweaveTxid: metadataTxid,
            metadataContent: newMetadataContent,
            nonstandardAsset:
              nonstandardAssetTxid == null
                ? undefined
                : {
                    arweaveTxid: nonstandardAssetTxid,
                    assetFileName: nonstandardFileFirebasePath!,
                  },
          });
        },
        onError,
        variables: {
          input: {
            fileName: fileFirebasePath,
            metadata: metadataContent,
            nonstandardFileName: nonstandardFileFirebasePath,
          },
        },
      });
    },
  };
}
