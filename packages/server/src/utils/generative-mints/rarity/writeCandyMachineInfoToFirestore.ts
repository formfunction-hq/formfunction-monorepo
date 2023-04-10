import FirestoreConfigLineWithoutRarityInfoDoc from "src/types/generative-mints/rarity/FirestoreConfigLineWithoutRarityInfoDoc";
import pLimit from "p-limit";
import axios from "axios";
import getFirestoreConfigLineDocRef from "src/utils/firebase/firestore/getFirestoreConfigLineDoc";
import getFileExtFromContentType from "src/utils/getFileExtFromContentType";
import uploadFileFromUrl from "src/utils/firebase/uploadFileFromUrl";
import { nanoid } from "nanoid";
import getArweaveTxidFromLink from "formfn-shared/dist/utils/getArweaveTxidFromLink";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";

const limit = pLimit(10);

async function getFirestoreConfigLineWithoutRarityInfo(
  arweaveMetadataUri: string,
  index: number
): Promise<FirestoreConfigLineWithoutRarityInfoDoc> {
  const arweaveResponse = await axios.get(arweaveMetadataUri);
  const offchainMetadata = arweaveResponse.data;
  const contentType = offchainMetadata.properties.files.find(
    (file: { type: string; uri: string }) => file.uri === offchainMetadata.image
  ).type;
  const fileExt = getFileExtFromContentType(contentType);

  const [{ dimensions, fileName }] = await Promise.all([
    uploadFileFromUrl(
      offchainMetadata.image,
      `nft-images/${nanoid()}.${fileExt}`,
      true
    ),
  ]);

  return {
    assetArweaveTxid: getArweaveTxidFromLink(offchainMetadata.image),
    assetHeight: dimensions?.height,
    assetWidth: dimensions?.width,
    attributes: offchainMetadata.attributes,
    contentType,
    creatorsMetadataString: jsonStringify(offchainMetadata.properties.creators),
    description: offchainMetadata.description,
    image: fileName,
    index,
    maxSupply: 0,
    metadataArweaveTxid: getArweaveTxidFromLink(arweaveMetadataUri),
    name: offchainMetadata.name,
    sellerFeeBasisPoints: offchainMetadata.seller_fee_basis_points,
  };
}

/**
 * Writes Candy Machine info to Firestore WITHOUT rarity info.
 */
export default async function writeCandyMachineInfoToFirestore(
  candyMachineAddress: string,
  offchainMetadataUris: Array<{ index: number; uri: string }>
): Promise<void> {
  await Promise.all(
    offchainMetadataUris.map(({ index, uri }) =>
      limit(async () => {
        const docRef = getFirestoreConfigLineDocRef(candyMachineAddress, index);
        const doc = await docRef.get();
        if (doc.exists) {
          // If we've already written the info to Firestore, don't write it again.
          return;
        }

        const data = await getFirestoreConfigLineWithoutRarityInfo(uri, index);
        await docRef.set(data);
      })
    )
  );
}
