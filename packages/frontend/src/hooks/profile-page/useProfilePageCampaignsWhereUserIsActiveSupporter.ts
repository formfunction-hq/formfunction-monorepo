import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useProfilePageCampaignsWhereUserIsActiveSupporterQuery } from "hooks/profile-page/__generated__/useProfilePageCampaignsWhereUserIsActiveSupporterQuery.graphql";

// NOTE: must be leq than the max specified in PaginationAmountGqlType
const FIRST = 750;
const STATUSES = ["Concluded", "Published"] as const;

export const profilePageCampaignsWhereUserIsActiveSupporterQuery = graphql`
  query useProfilePageCampaignsWhereUserIsActiveSupporterQuery(
    $after: String
    $first: PaginationAmount!
    $input: CampaignsWhereUserIsActiveSupporterInput!
  ) {
    ...ProfileCampaignsWhereUserIsActiveSupporter_Query
    CampaignsNamespace {
      ...ProfileTabsCampaignsWhereUserIsActiveSupporter_CampaignsNamespaceQueryResponse
    }
  }
`;

export default function useProfilePageCampaignsWhereUserIsActiveSupporter(
  userId: Maybe<string>,
  username: Maybe<string>
) {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>(
        RelayEnvironment,
        profilePageCampaignsWhereUserIsActiveSupporterQuery,
        {
          first: FIRST,
          input: {
            statuses: STATUSES,
            userId: username == null ? userId : null,
            username,
          },
        }
      ),
    [userId, username]
  );

  const [
    profilePageCampaignsWhereUserIsActiveSupporterQueryRef,
    loadprofilePageCampaignsWhereUserIsActiveSupporterQuery,
  ] = useQueryLoader<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>(
    profilePageCampaignsWhereUserIsActiveSupporterQuery,
    initialQueryRef
  );

  useEffect(() => {
    loadprofilePageCampaignsWhereUserIsActiveSupporterQuery({
      first: FIRST,
      input: {
        statuses: STATUSES,
        userId: username == null ? userId : null,
        username,
      },
    });
  }, [
    loadprofilePageCampaignsWhereUserIsActiveSupporterQuery,
    userId,
    username,
  ]);

  return profilePageCampaignsWhereUserIsActiveSupporterQueryRef;
}
