import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import LoadingSpinner from "components/loading/LoadingSpinner";
import InvitesBody from "components/pages/invites/InvitesBody";
import InvitesHeader from "components/pages/invites/InvitesHeader";
import styles from "css/pages/invites/InvitesPage.module.css";
import useLogPageView from "hooks/useLogPageView";
import useSetPageTitle from "hooks/useSetPageTitle";
import { Suspense, useMemo } from "react";
import ColorValue from "types/enums/ColorValue";
import dayjs from "utils/dates/dayjsex";

export default function InvitesPage() {
  const currentTime = useMemo(() => dayjs(), []);
  const loadingSpinner = (
    <LoadingSpinner colorValue={ColorValue.BrightPurple} />
  );
  useSetPageTitle("Invites");
  useLogPageView();

  return (
    <DisconnectedPageContainer>
      <PageWithHeaderAndFooter>
        <ResponsivePageBody>
          <InvitesHeader />
          <div className={styles.body}>
            <Suspense fallback={loadingSpinner}>
              <InvitesBody currentTime={currentTime} />
            </Suspense>
          </div>
        </ResponsivePageBody>
      </PageWithHeaderAndFooter>
    </DisconnectedPageContainer>
  );
}
