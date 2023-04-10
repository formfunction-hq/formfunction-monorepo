import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import ProfilePageForUser from "components/pages/profile/ProfilePageForUser";
import DisconnectedPage from "components/pages/misc/DisconnectedPage";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import { Suspense } from "react";
import useSetPageTitle from "hooks/useSetPageTitle";
import useLogPageView from "hooks/useLogPageView";
import ProfileLoadingPage from "components/pages/profile/ProfileLoadingPage";
import ProfilePageModalContextProvider from "context/ProfilePageModalContext";
import useProfilePageMetadataAccounts from "hooks/profile-page/useProfilePageMetadataAccounts";
import { useProfilePageDataQuery } from "hooks/profile-page/__generated__/useProfilePageDataQuery.graphql";
import useProfilePageData, {
  profilePageDataQuery,
} from "hooks/profile-page/useProfilePageData";
import { useProfilePageMetadataAccountsQuery } from "hooks/profile-page/__generated__/useProfilePageMetadataAccountsQuery.graphql";
import useUserContext from "hooks/useUserContext";
import useProfilePageCreatedCampaigns from "hooks/profile-page/useProfilePageCreatedCampaigns";
import { useProfilePageCreatedCampaignsQuery } from "hooks/profile-page/__generated__/useProfilePageCreatedCampaignsQuery.graphql";
import useProfilePageCampaignsWhereUserIsActiveSupporter from "hooks/profile-page/useProfilePageCampaignsWhereUserIsActiveSupporter";
import { useProfilePageCampaignsWhereUserIsActiveSupporterQuery } from "hooks/profile-page/__generated__/useProfilePageCampaignsWhereUserIsActiveSupporterQuery.graphql";

type InnerProps = {
  createdCampaignsQueryRef: PreloadedQuery<useProfilePageCreatedCampaignsQuery>;
  dataQueryRef: PreloadedQuery<useProfilePageDataQuery>;
  nftQueryRef: PreloadedQuery<useProfilePageMetadataAccountsQuery>;
  supportedCampaignsQueryRef: PreloadedQuery<useProfilePageCampaignsWhereUserIsActiveSupporterQuery>;
};

function Inner({
  createdCampaignsQueryRef,
  dataQueryRef,
  nftQueryRef,
  supportedCampaignsQueryRef,
}: InnerProps) {
  const data = usePreloadedQuery(profilePageDataQuery, dataQueryRef);

  if (data.User_by_pk == null) {
    return <DisconnectedPage />;
  }

  return (
    <ProfilePageForUser
      createdCampaignsQueryRef={createdCampaignsQueryRef}
      user={data.User_by_pk}
      series={data}
      nftQueryRef={nftQueryRef}
      supportedCampaignsQueryRef={supportedCampaignsQueryRef}
    />
  );
}

export default function ProfilePage(): Maybe<JSX.Element> {
  useSetPageTitle("Profile");
  useLogPageView();
  const { userId } = useUserContext();

  const dataQueryRef = useProfilePageData(userId ?? "");
  const nftQueryRef = useProfilePageMetadataAccounts(userId ?? "", null);
  const createdCampaignsQueryRef = useProfilePageCreatedCampaigns(
    userId ?? "",
    null
  );
  const supportedCampaignsQueryRef =
    useProfilePageCampaignsWhereUserIsActiveSupporter(userId ?? "", null);

  return (
    <ProfilePageModalContextProvider>
      <DisconnectedPageContainer fallback={<ProfileLoadingPage />}>
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
      </DisconnectedPageContainer>
    </ProfilePageModalContextProvider>
  );
}
