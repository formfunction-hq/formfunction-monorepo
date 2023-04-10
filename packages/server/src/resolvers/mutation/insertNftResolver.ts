import { InsertNftInput, MetadataAccount } from "src/__generated__/generated";
import insertNft from "src/utils/nft/insertNft";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";

// TODO[@bryancho]: clean up
async function insertNftResolver(
  input: InsertNftInput
): Promise<MetadataAccount> {
  const insertedNft = await insertNft(input);

  return convertNftToMetadataAccount(insertedNft);
}

export default insertNftResolver;
