import graphql from "babel-plugin-relay/macro";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import ExploreCreatorCard from "components/pages/explore/ExploreCreatorCard";
import { LandingFeaturedCreatorsQuery } from "components/pages/landing/__generated__/LandingFeaturedCreatorsQuery.graphql";
import Header2 from "components/text/Header2";
import styles from "css/pages/landing/LandingFeaturedCreators.module.css";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import Marquee from "react-fast-marquee";
import LazyLoad from "react-lazyload";
import { range } from "formfn-shared/dist/utils/range";
import ExploreCreatorCardLoadingSkeleton from "components/pages/explore/ExploreCreatorCardLoadingSkeleton";

const query = graphql`
  query LandingFeaturedCreatorsQuery {
    usersFeatured {
      user {
        id
      }

      ...ExploreCreatorCard_UserAndMetadataAccounts
    }
  }
`;

function Inner(): JSX.Element {
  const data = useLazyLoadQuery<LandingFeaturedCreatorsQuery>(query, {});
  const featuredUsers = data.usersFeatured;

  return (
    <Marquee gradient={false} speed={55}>
      {featuredUsers.map((userAndMetadataAccounts) => (
        <div
          className={styles.creatorCardContainer}
          key={userAndMetadataAccounts.user.id}
        >
          <ExploreCreatorCard
            // eslint-disable-next-line react/no-array-index-key
            userAndMetadataAccounts={userAndMetadataAccounts}
          />
        </div>
      ))}
    </Marquee>
  );
}

export default function LandingFeaturedCreators(): JSX.Element {
  const creatorsLoading = (
    <Marquee gradient={false} speed={55}>
      {range(6).map((val) => (
        <div className={styles.creatorCardContainer} key={val}>
          <ExploreCreatorCardLoadingSkeleton />
        </div>
      ))}
    </Marquee>
  );

  return (
    <div className={styles.container}>
      <ResponsiveContainer>
        <Header2 colorClass={ColorClass.Primary} textAlign="center">
          Featured Artists
        </Header2>
      </ResponsiveContainer>
      <LazyLoad height={450} once offset={300}>
        <div className={styles.gridContainer}>
          <Suspense fallback={creatorsLoading}>
            <Inner />
          </Suspense>
        </div>
      </LazyLoad>
    </div>
  );
}
