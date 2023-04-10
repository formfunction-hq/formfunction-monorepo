import graphql from "babel-plugin-relay/macro";
import StatsRow from "components/pages/stats/stats-row/StatsRow";
import StatsRowHeader from "components/pages/stats/StatsRowHeader";
import StatsRows from "components/pages/stats/StatsRows";
import { StatsBodyCreatorsQuery } from "components/pages/stats/__generated__/StatsBodyCreatorsQuery.graphql";
import { useLazyLoadQuery } from "react-relay";
import StatsDisplayType from "types/enums/StatsDisplayType";
import StatsRowHeaderType from "types/enums/StatsRowHeaderType";

const query = graphql`
  query StatsBodyCreatorsQuery($input: TopCreatorStatsInput!, $limit: Int!) {
    StatsNamespace {
      topCreatorStats(input: $input, first: $limit) {
        edges {
          node {
            numCollectors
            numPiecesSold
            totalSalesInSol

            creator {
              # eslint-disable-next-line relay/unused-fields
              id
              displayName
              username

              ProfilePhoto {
                photoUrl
              }
            }
          }
        }
      }
    }
  }
`;

type Props = {
  displayType: StatsDisplayType;
  filters: {
    afterTime: string;
  };
  headerType?: StatsRowHeaderType;
  numberOfStatsToFetch: number;
};

export default function StatsBodyCreators({
  displayType,
  filters: { afterTime },
  headerType,
  numberOfStatsToFetch,
}: Props) {
  const data = useLazyLoadQuery<StatsBodyCreatorsQuery>(query, {
    input: {
      afterTime,
    },
    limit: numberOfStatsToFetch,
  });

  const rows = data.StatsNamespace.topCreatorStats.edges.map(
    ({ node }, index) => (
      <StatsRow
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        collectorsOrCreatorsCount={node.numCollectors}
        displayType={displayType}
        nftCount={node.numPiecesSold}
        rank={index + 1}
        volumeInLamports={node.totalSalesInSol}
        userInfo={{
          displayName: node.creator!.displayName ?? "",
          photoUrl: node.creator!.ProfilePhoto?.photoUrl ?? "",
          username: node.creator!.username,
        }}
      />
    )
  );

  return (
    <StatsRows displayType={displayType}>
      {headerType != null && <StatsRowHeader headerType={headerType} />}
      {rows}
    </StatsRows>
  );
}
