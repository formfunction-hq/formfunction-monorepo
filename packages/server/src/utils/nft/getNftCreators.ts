import { NftToCollaborator, Photo, Request, User } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import CreatorOnchain from "src/types/CreatorOnchain";
import Typename from "src/types/enums/Typename";
import convertUser from "src/utils/convert/convertUser";
import {
  MetadataCreator,
  RequestStatusExpress_Enum,
} from "src/__generated__/generated";

export default function getNftCreators(
  creatorsOnchain: Array<CreatorOnchain>,
  nftCollaborators: Array<
    NftToCollaborator & {
      Request: Maybe<Request>;
      User: User & {
        Photo_PhotoToUser_coverPhotoId: Maybe<Photo>;
        Photo_PhotoToUser_profilePhotoId: Maybe<Photo>;
      };
    }
  >
): Array<MetadataCreator> {
  if (nftCollaborators.length === 0) {
    // Need to account for NFTs that were created before we added NftToCollaborator
    // TODO: remove this after backfilling
    return creatorsOnchain.map((creator) => ({
      __typename: Typename.MetadataCreator as const,
      address: creator.address,
      share: creator.share,
      status: creator.verified
        ? RequestStatusExpress_Enum.Approved
        : RequestStatusExpress_Enum.Rejected,
    }));
  }

  const collaborators = nftCollaborators.map((collaborator) => ({
    __typename: Typename.MetadataCreator as const,
    address: collaborator.collaboratorId,
    requestId: collaborator.Request?.id,
    share: collaborator.share,
    status: (collaborator.Request?.status ??
      RequestStatusExpress_Enum.Approved) as RequestStatusExpress_Enum,
    user: convertUser(collaborator.User),
  }));

  // We must ensure that the order of the addresses is the same as the on-chain data.
  // Otherwise, execute_sale_v2 will fail.
  return collaborators.sort((a, b) => {
    const aIndex = creatorsOnchain.findIndex(
      (creator) => creator.address === a.address
    );
    const bIndex = creatorsOnchain.findIndex(
      (creator) => creator.address === b.address
    );

    return aIndex - bIndex;
  });
}
