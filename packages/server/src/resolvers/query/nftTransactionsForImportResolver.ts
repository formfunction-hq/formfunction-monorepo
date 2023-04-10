import {
  NftTransactionsForImportInput,
  NftTransactionsForImportResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import invariant from "tiny-invariant";
import getPublicKey from "src/utils/headers/getPublicKey";
import getTransactionsAndMintToImport from "src/utils/import/getTransactionsAndMintToImport";

export default async function nftTransactionsForImportResolver(
  context: MyContext,
  input: NftTransactionsForImportInput
): Promise<NftTransactionsForImportResponse> {
  const userPublicKey = getPublicKey(context.req);
  invariant(userPublicKey != null, "User must be signed in");

  const { txs } = await getTransactionsAndMintToImport(
    userPublicKey.toString(),
    input.mintAddress
  );

  return {
    __typename: Typename.NftTransactionsForImportResponse,
    transactions: txs,
  };
}
