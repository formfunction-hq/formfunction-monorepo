import MessagePage from "components/pages/common/MessagePage";
import ProfilePageForUser from "components/pages/profile/ProfilePageForUser";
import useLogPageView from "hooks/useLogPageView";
import useSetPageTitle from "hooks/useSetPageTitle";
import { Suspense } from "react";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { useParams } from "react-router-dom";
import ProfileLoadingPage from "components/pages/profile/ProfileLoadingPage";
import ProfilePageModalContextProvider from "context/ProfilePageModalContext";
import useProfilePageMetadataAccounts from "hooks/profile-page/useProfilePageMetadataAccounts";
import useProfilePageDynamicData, {
  profilePageDynamicDataQuery,
} from "hooks/profile-page/useProfilePageDynamicData";
import { useProfilePageDynamicDataQuery } from "hooks/profile-page/__generated__/useProfilePageDynamicDataQuery.graphql";
import { useProfilePageMetadataAccountsQuery } from "hooks/profile-page/__generated__/useProfilePageMetadataAccountsQuery.graphql";
import useProfilePageCreatedCampaigns from "hooks/profile-page/useProfilePageCreatedCampaigns";
import { useProfilePageCreatedCampaignsQuery } from "hooks/profile-page/__generated__/useProfilePageCreatedCampaignsQuery.graphql";
import useProfilePageCampaignsWhereUserIsActiveSupporter from "hooks/profile-page/useProfilePageCampaignsWhereUserIsActiveSupporter";
import { useProfilePageCampaignsWhereUserIsActiveSupporterQuery } from "hooks/profile-page/__generated__/useProfilePageCampaignsWhereUserIsActiveSupporterQuery.graphql";

type InnerProps = {
  createdCampaignsQueryRef: PreloadedQuery<useProfilePageCreatedCampaignsQuery>;
  dataQueryRef: PreloadedQuery<useProfilePageDynamicDataQuery>;
  nftQueryRef: PreloadedQuery<useProfilePageMetadataAccountsQuery>;
  supportedCampaignsQueryRef: PreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>;
};

function Inner({
  createdCampaignsQueryRef,
  dataQueryRef,
  nftQueryRef,
  supportedCampaignsQueryRef,
}: InnerProps): JSX.Element {
  const data = usePreloadedQuery(profilePageDynamicDataQuery, dataQueryRef);

  if (data.User.length === 0) {
    return <MessagePage>Profile does not exist</MessagePage>;
  }

  return (
    <ProfilePageForUser
      createdCampaignsQueryRef={createdCampaignsQueryRef}
      user={data.User[0]}
      series={data}
      nftQueryRef={nftQueryRef}
      supportedCampaignsQueryRef={supportedCampaignsQueryRef}
    />
  );
}

export default function ProfilePageDynamic(): JSX.Element {
  const params = useParams();
  useSetPageTitle(params.username ?? "");
  useLogPageView();

  const dataQueryRef = useProfilePageDynamicData(params.username ?? "");
  const nftQueryRef = useProfilePageMetadataAccounts(
    null,
    params.username ?? ""
  );
  const createdCampaignsQueryRef = useProfilePageCreatedCampaigns(
    null,
    params.username ?? ""
  );
  const supportedCampaignsQueryRef =
    useProfilePageCampaignsWhereUserIsActiveSupporter(
      null,
      params.username ?? ""
    );

  return (
    <ProfilePageModalContextProvider>
      {dataQueryRef != null &&
        nftQueryRef != null &&
        createdCampaignsQueryRef != null &&
        supportedCampaignsQueryRef != null && (
          <Suspense fallback={<ProfileLoadingPage />}>
            <Inner
              createdCampaignsQueryRef={createdCampaignsQueryRef}
              dataQueryRef={dataQueryRef}
              nftQueryRef={nftQueryRef}
              supportedCampaignsQueryRef={supportedCampaignsQueryRef}
            />
          </Suspense>
        )}
    </ProfilePageModalContextProvider>
  );
}
