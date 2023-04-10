import Typename from "src/types/enums/Typename";
import createStandardEditionNft from "src/utils/prisma/createStandardEditionNft";
import {
  InsertPnftInput,
  InsertPnftResponse,
} from "src/__generated__/generated";

export default async function insertPnftResolver(
  input: InsertPnftInput
): Promise<InsertPnftResponse> {
  const { edition, ownerId, pnftLimitedEditionMint, pnftMasterEditionMint } =
    input;

  const { metadataAccount } = await createStandardEditionNft({
    edition,
    isPnft: true,
    masterEditionMint: pnftMasterEditionMint,
    ownerId,
    standardEditionMint: pnftLimitedEditionMint,
  });

  return {
    __typename: Typename.InsertPnftResponse,
    metadataAccount,
  };
}
