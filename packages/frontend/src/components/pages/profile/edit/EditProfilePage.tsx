import graphql from "babel-plugin-relay/macro";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import LoadingSpinner from "components/loading/LoadingSpinner";
import EditProfileForm from "components/pages/profile/edit/EditProfileForm";
import { EditProfilePageQuery } from "components/pages/profile/edit/__generated__/EditProfilePageQuery.graphql";
import Header2 from "components/text/Header2";
import useSolanaContext from "hooks/useSolanaContext";
import { Suspense, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import ColorValue from "types/enums/ColorValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import styles from "css/pages/profile/edit/EditProfilePage.module.css";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import MobileTitleAndNav from "components/nav/MobileTitleAndNav";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import CloseButton from "components/buttons/CloseButton";
import { useNavigate } from "react-router-dom";
import useSetPageTitle from "hooks/useSetPageTitle";
import TabButton from "components/buttons/TabButton";
import useUserContext from "hooks/useUserContext";
import IgnoreResponsiveContainerPadding from "components/containers/IgnoreResponsiveContainerPadding";
import EditCreatorStoryForm from "components/pages/profile/edit/EditCreatorStoryForm";
import useLogPageView from "hooks/useLogPageView";
import ColorClass from "types/enums/ColorClass";

enum EditProfileTab {
  BasicInfo = "BasicInfo",
  CreatorStory = "CreatorStory",
}

const query = graphql`
  query EditProfilePageQuery($id: String!) {
    User_by_pk(id: $id) {
      # eslint-disable-next-line relay/unused-fields
      id
      ...EditProfileForm_User
      ...EditCreatorStoryForm_User
    }
  }
`;

function EditProfileTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: EditProfileTab;
  setActiveTab: (val: EditProfileTab) => void;
}): Maybe<JSX.Element> {
  const { user } = useUserContext();

  if (user?.isWhitelisted !== true) {
    return null;
  }

  return (
    <div className={styles.tabs}>
      <TabButton
        isActive={activeTab === EditProfileTab.BasicInfo}
        name="Basic Info"
        onClick={() => setActiveTab(EditProfileTab.BasicInfo)}
      />
      <TabButton
        isActive={activeTab === EditProfileTab.CreatorStory}
        name="Creator Story"
        onClick={() => setActiveTab(EditProfileTab.CreatorStory)}
      />
    </div>
  );
}

function EditProfileContent({
  activeTab,
}: {
  activeTab: EditProfileTab;
}): JSX.Element {
  const { anchorWallet } = useSolanaContext();
  const data = useLazyLoadQuery<EditProfilePageQuery>(query, {
    id: anchorWallet!.publicKey.toString(),
  });

  return activeTab === EditProfileTab.BasicInfo ? (
    <EditProfileForm user={data.User_by_pk!} />
  ) : (
    <EditCreatorStoryForm user={data.User_by_pk!} />
  );
}

export default function EditProfilePage(): Maybe<JSX.Element> {
  useSetPageTitle("Edit Profile");
  useLogPageView();
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EditProfileTab>(
    EditProfileTab.BasicInfo
  );
  const { profileHref } = useUserContext();

  const editProfileTabs = (
    <EditProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
  );

  return (
    <DisconnectedPageContainer>
      <PageWithHeaderAndFooter>
        <ResponsivePageBody>
          {!isBottomTabsWidth && (
            <Header2 colorClass={ColorClass.Primary} textAlign="center">
              Edit Profile
            </Header2>
          )}
          {isBottomTabsWidth && (
            <MobileTitleAndNav
              left={
                <CloseButton
                  colorValue={ColorValue.Secondary}
                  onClick={() => navigate(profileHref)}
                />
              }
              title="Edit Profile"
            />
          )}
          <div className={styles.content}>
            {isBottomTabsWidth ? (
              <IgnoreResponsiveContainerPadding>
                {editProfileTabs}
              </IgnoreResponsiveContainerPadding>
            ) : (
              editProfileTabs
            )}
            <Suspense
              fallback={
                <LoadingSpinner
                  colorValue={ColorValue.BrightPurple}
                  size={32}
                />
              }
            >
              <EditProfileContent activeTab={activeTab} />
            </Suspense>
          </div>
        </ResponsivePageBody>
      </PageWithHeaderAndFooter>
    </DisconnectedPageContainer>
  );
}
