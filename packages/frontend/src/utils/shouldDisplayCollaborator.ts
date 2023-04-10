import { RequestStatusExpress_enum } from "components/auction/__generated__/ListingCardForMetadata_MetadataAccount.graphql";
import { HOLAPLEX_CREATOR_ADDRESS } from "formfn-shared/dist/constants/SolanaConstants";

export default function shouldDisplayCollaborator(
  collaborator: {
    address: string;
    status: RequestStatusExpress_enum;
  },
  creatorId: string
): boolean {
  return (
    ![creatorId, HOLAPLEX_CREATOR_ADDRESS.toString()].includes(
      collaborator.address
    ) && collaborator.status === "Approved"
  );
}
