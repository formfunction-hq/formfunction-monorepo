import { DeleteNftInput, MetadataAccount } from "src/__generated__/generated";
import deleteNft from "src/utils/nft/deleteNft";
import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import invariant from "tiny-invariant";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";

async function deleteNftResolver(
  context: MyContext,
  input: DeleteNftInput
): Promise<MetadataAccount> {
  const prisma = getPrisma();
  const viewerKey = assertUserSignedRequest(context);
  const nft = await prisma.nft.findUnique({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    where: {
      mint: input.mint,
    },
  });

  try {
    invariant(nft != null, `Nft for mint ${input.mint} does not exist`);
    invariant(
      nft.creatorId === viewerKey.toString(),
      "Only the creator of an NFT can delete it"
    );
    // Just to be safe, since deleting an NFT that's part of a campaign could create
    // undesirable behavior
    invariant(
      nft.campaignFundingTierId == null,
      "You cannot delete an NFT that is part of a campaign"
    );

    await deleteNft(input.mint);
  } catch (e) {
    logError(AnalyticsEvent.DeleteNftError, e as Error, context.req, {
      input,
    });
    throw e;
  }

  return convertNftToMetadataAccount(nft);
}

export default deleteNftResolver;
