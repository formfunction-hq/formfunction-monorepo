import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import convertMetadataAccount from "src/utils/convert/convertMetadataAccount";
import {
  MetadataAccount,
  MetadataAccountForMintInput,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import MyContext from "src/types/MyContext";
import AccountLoader from "src/utils/solana/rpc/AccountLoader";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";

async function metadataAccountForMintResolver(
  context: Undef<MyContext>,
  input: MetadataAccountForMintInput
): Promise<Maybe<MetadataAccount>> {
  try {
    // Short-circuit in case the input is invalid
    if (!isPublicKey(input.mint)) {
      logError(
        AnalyticsEvent.UnexpectedInput,
        "Invalid input, expected a PublicKey",
        context?.req,
        {
          input,
        }
      );
      return null;
    }

    const prisma = getPrisma();
    const isOnPlatform = await prisma.nft.findUnique({
      include: CONVERT_NFT_TO_METADATA_INCLUDE,
      where: { mint: input.mint },
    });

    if (isOnPlatform != null) {
      return convertNftToMetadataAccount(isOnPlatform);
    }

    // Lower severity because if someone visits an NFT page that doesn't exist,
    // it's expected that the result is null
    const metadataAccount = await AccountLoader.loadNft(input.mint, "warning");

    if (metadataAccount == null) {
      return null;
    }

    const converted = await convertMetadataAccount(
      metadataAccount,
      context?.req
    );

    return converted;
  } catch {
    return null;
  }
}

export default metadataAccountForMintResolver;
