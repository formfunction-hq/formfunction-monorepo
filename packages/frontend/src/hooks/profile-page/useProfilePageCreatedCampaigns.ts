import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useProfilePageCreatedCampaignsQuery } from "hooks/profile-page/__generated__/useProfilePageCreatedCampaignsQuery.graphql";
import useViewerId from "hooks/useViewerId";

// NOTE: must be leq than the max specified in PaginationAmountGqlType
const CREATED_FIRST = 750;
const STATUSES = ["Concluded", "Published"] as const;

export const profilePageCreatedCampaignsQuery = graphql`
  query useProfilePageCreatedCampaignsQuery(
    $after: String
    $first: PaginationAmount!
    $input: CampaignsForUserInput!
  ) {
    ...ProfileCampaigns_Query
    CampaignsNamespace {
      ...ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse
      ...ProfileCampaignV2Card_CampaignsNamespaceQueryResponse
    }
  }
`;

export default function useProfilePageCreatedCampaigns(
  userId: Maybe<string>,
  username: Maybe<string>
) {
  const viewerId = useViewerId();
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useProfilePageCreatedCampaignsQuery>(
        RelayEnvironment,
        profilePageCreatedCampaignsQuery,
        {
          first: CREATED_FIRST,
          input: {
            statuses: STATUSES,
            userId: username == null ? userId : null,
            username,
            viewerId,
          },
        }
      ),
    [userId, username, viewerId]
  );

  const [
    profilePageCreatedCampaignsQueryRef,
    loadprofilePageCreatedCampaignsQuery,
  ] = useQueryLoader<useProfilePageCreatedCampaignsQuery>(
    profilePageCreatedCampaignsQuery,
    initialQueryRef
  );

  useEffect(() => {
    loadprofilePageCreatedCampaignsQuery({
      first: CREATED_FIRST,
      input: {
        statuses: STATUSES,
        userId: username == null ? userId : null,
        username,
        viewerId,
      },
    });
  }, [loadprofilePageCreatedCampaignsQuery, userId, username, viewerId]);

  return profilePageCreatedCampaignsQueryRef;
}
