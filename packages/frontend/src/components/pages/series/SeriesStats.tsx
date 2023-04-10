import graphql from "babel-plugin-relay/macro";
import { SeriesStats_SeriesNamespaceResponse$key } from "components/pages/series/__generated__/SeriesStats_SeriesNamespaceResponse.graphql";
import { seriesStatsQuery } from "hooks/series-page/useSeriesPageSeriesStats";
import { useSeriesPageSeriesStatsQuery } from "hooks/series-page/__generated__/useSeriesPageSeriesStatsQuery.graphql";
import { Suspense } from "react";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import styles from "css/pages/series/SeriesStats.module.css";
import ArtName from "components/text/ArtName";
import formatLamports from "formfn-shared/dist/utils/formatLamports";
import ColorClass from "types/enums/ColorClass";
import Body1Medium from "components/text/Body1Medium";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import TextSymbol from "types/enums/TextSymbol";

const fragment = graphql`
  fragment SeriesStats_SeriesNamespaceResponse on SeriesNamespaceResponse {
    seriesStats(input: $input) {
      floorPriceInLamports
      volumeInLamports
    }
  }
`;

function LamportsAndLabel({
  label,
  lamports,
}: {
  label: string;
  lamports: Maybe<number>;
}) {
  return (
    <div className={styles.lamportsAndLabel}>
      <ArtName colorClass={ColorClass.White}>
        {lamports == null
          ? "--"
          : `${formatLamports(lamports)} ${TextSymbol.SolSymbol}`}
      </ArtName>
      <Body1Medium colorClass={ColorClass.White}>{label}</Body1Medium>
    </div>
  );
}

function Content({
  seriesNamespace,
}: {
  seriesNamespace: SeriesStats_SeriesNamespaceResponse$key;
}) {
  const { seriesStats } = useFragment(fragment, seriesNamespace);
  if (seriesStats == null) {
    return null;
  }

  const { volumeInLamports, floorPriceInLamports } = seriesStats;
  if (volumeInLamports === 0 && floorPriceInLamports == null) {
    return null;
  }

  return (
    <div className={styles.content}>
      <LamportsAndLabel label="volume" lamports={volumeInLamports} />
      <div className={styles.divider} />
      <LamportsAndLabel label="floor" lamports={floorPriceInLamports} />
    </div>
  );
}

type Props = {
  seriesStatsQueryRef: PreloadedQuery<useSeriesPageSeriesStatsQuery>;
};

function DataLoader({ seriesStatsQueryRef }: Props) {
  const data = usePreloadedQuery<useSeriesPageSeriesStatsQuery>(
    seriesStatsQuery,
    seriesStatsQueryRef
  );

  return <Content seriesNamespace={data.SeriesNamespace} />;
}

export default function SeriesStats({ seriesStatsQueryRef }: Props) {
  return (
    <Suspense fallback={null}>
      <DataLoader seriesStatsQueryRef={seriesStatsQueryRef} />
    </Suspense>
  );
}
