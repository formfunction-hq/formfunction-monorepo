import graphql from "babel-plugin-relay/macro";
import StatsRow from "components/pages/stats/stats-row/StatsRow";
import StatsRowHeader from "components/pages/stats/StatsRowHeader";
import StatsRows from "components/pages/stats/StatsRows";
import { StatsBodyCollectorsQuery } from "components/pages/stats/__generated__/StatsBodyCollectorsQuery.graphql";
import { useLazyLoadQuery } from "react-relay";
import StatsDisplayType from "types/enums/StatsDisplayType";
import StatsRowHeaderType from "types/enums/StatsRowHeaderType";

const query = graphql`
  query StatsBodyCollectorsQuery(
    $input: TopCollectorStatsInput!
    $limit: Int!
  ) {
    StatsNamespace {
      topCollectorStats(input: $input, first: $limit) {
        edges {
          node {
            numCreatorsSupported
            numPiecesBought
            totalPaidInSol

            collector {
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

export default function StatsBodyCollectors({
  displayType,
  filters: { afterTime },
  headerType,
  numberOfStatsToFetch,
}: Props) {
  const data = useLazyLoadQuery<StatsBodyCollectorsQuery>(query, {
    input: {
      afterTime,
    },
    limit: numberOfStatsToFetch,
  });

  const rows = data.StatsNamespace.topCollectorStats.edges.map(
    ({ node }, index) => (
      <StatsRow
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        collectorsOrCreatorsCount={node.numCreatorsSupported}
        displayType={displayType}
        nftCount={node.numPiecesBought}
        rank={index + 1}
        volumeInLamports={node.totalPaidInSol}
        userInfo={{
          displayName: node.collector!.displayName ?? "",
          photoUrl: node.collector!.ProfilePhoto?.photoUrl ?? "",
          username: node.collector!.username,
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
