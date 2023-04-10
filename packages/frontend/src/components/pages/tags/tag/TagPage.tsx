import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ExploreControlBar from "components/pages/explore/ExploreControlBar";
import TagGrid from "components/pages/tags/tag/TagGrid";
import TagNumResults from "components/pages/tags/tag/TagNumResults";
import Header2 from "components/text/Header2";
import Subheader from "components/text/Subheader";
import { ExploreContextProvider } from "context/ExploreContext";
import styles from "css/pages/tags/tag/TagPage.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useLogPageView from "hooks/useLogPageView";
import useSetPageTitle from "hooks/useSetPageTitle";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

export default function TagPage(): Maybe<JSX.Element> {
  const params = useParams();
  const { tag } = params;
  useSetPageTitle(tag == null ? "Tag" : `${tag} tag`);
  useLogPageView();

  if (tag == null) {
    return null;
  }

  return (
    // Override top-level explore context provider
    <ExploreContextProvider>
      <PageWithHeaderAndFooter>
        <ResponsivePageBody>
          <div className={styles.body}>
            <Header2 colorClass={ColorClass.Ghost} textAlign="center">
              Tag: <span className={ColorClass.Primary}>{tag}</span>
            </Header2>
            <div className={styles.count}>
              <Suspense
                fallback={
                  <Subheader colorClass={ColorClass.Secondary}>
                    Loading...
                  </Subheader>
                }
              >
                <TagNumResults tag={tag} />
              </Suspense>
            </div>
            <div className={styles.controlBar}>
              <ExploreControlBar hideTabs />
            </div>
            <div className={styles.exploreGrid}>
              <Suspense
                fallback={
                  <LoadingSpinner colorValue={ColorValue.BrightPurple} />
                }
              >
                <TagGrid tag={tag} />
              </Suspense>
            </div>
          </div>
        </ResponsivePageBody>
      </PageWithHeaderAndFooter>
    </ExploreContextProvider>
  );
}
