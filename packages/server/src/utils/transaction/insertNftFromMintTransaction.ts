import {
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getArweaveTxidFromLink from "formfn-shared/dist/utils/getArweaveTxidFromLink";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import insertNft from "src/utils/nft/insertNft";
import axios from "axios";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";
import uploadFileFromUrl from "src/utils/firebase/uploadFileFromUrl";
import getFileExtFromContentType from "src/utils/getFileExtFromContentType";
import { nanoid } from "nanoid";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";

/**
 * Insert NFT into db based on mint transaction data
 */
export default async function insertNftFromMintTransaction(
  parsedTx: NftTransactionOnchain,
  seriesMint?: string,
  prismaTransactionClient?: PrismaTransactionClient
): Promise<Maybe<ConvertNftToMetadataAccountType>> {
  const { mint, creatorId, toAddress } = parsedTx;
  const nft = await AccountLoader.loadNft(mint);
  const { uri: arweaveMetadataUri, creators } = nft!;
  const onchainMetadata = await axios.get(arweaveMetadataUri);

  const contentType = onchainMetadata.data.properties.files.find(
    (file: { type: string; uri: string }) =>
      file.uri === onchainMetadata.data.image
  ).type;
  const fileExt = getFileExtFromContentType(contentType);

  const { dimensions, fileName } = await uploadFileFromUrl(
    onchainMetadata.data.image,
    `nft-images/${nanoid()}.${fileExt}`,
    true
  );

  return insertNft(
    {
      assetArweaveTxid: getArweaveTxidFromLink(onchainMetadata.data.image),
      assetHeight: dimensions?.height,
      assetWidth: dimensions?.width,
      attributes: onchainMetadata.data.attributes.map(
        (attribute: { trait_type: string; value: string }) => ({
          ...attribute,
          traitType: attribute.trait_type,
        })
      ),
      contentType,
      creatorId,
      creatorsMetadataString: jsonStringify(creators),
      description: onchainMetadata.data.description,
      image: fileName,
      maxSupply: 0,
      metadataArweaveTxid: getArweaveTxidFromLink(arweaveMetadataUri),
      mint,
      name: onchainMetadata.data.name,
      ownerId: toAddress,
      sellerFeeBasisPoints: onchainMetadata.data.seller_fee_basis_points,
      seriesMint,
      status: NftStatusExpress_Enum.Owned,
    },
    parsedTx.type === NftTransactionTypeExpress_Enum.SoldGenerativeMint
      ? {
          auctionCount: 1,
        }
      : undefined,
    prismaTransactionClient
  );
}
