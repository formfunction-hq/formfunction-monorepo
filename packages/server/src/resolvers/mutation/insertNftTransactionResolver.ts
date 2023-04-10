import {
  InsertNftTransactionInput,
  InsertNftTransactionResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import MyContext from "src/types/MyContext";
import insertNftTransaction from "src/utils/transaction/insertNftTransaction";

async function insertNftTransactionResolver(
  context: MyContext,
  input: InsertNftTransactionInput
): Promise<InsertNftTransactionResponse> {
  const {
    editionsMerkleAllowlistInfoForBuyer,
    transaction,
    updatedNft,
    updatedMasterEditionNft,
  } = await insertNftTransaction(context.req, input);

  return {
    __typename: Typename.InsertNftTransactionResponse,
    editionsMerkleAllowlistInfoForBuyer,
    transaction,
    updatedMasterEditionMetadataAccount:
      updatedMasterEditionNft != null
        ? convertNftToMetadataAccount(updatedMasterEditionNft)
        : null,
    updatedMetadataAccount: convertNftToMetadataAccount(updatedNft!),
  };
}

export default insertNftTransactionResolver;
