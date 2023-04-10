import ArtName from "components/text/ArtName";
import Body1 from "components/text/Body1";
import Body1Medium from "components/text/Body1Medium";
import { FONT_BREAKPOINT } from "constants/Breakpoints";
import styles from "css/pages/stats/stats-row/StatsRow.module.css";
import formatLamports from "formfn-shared/dist/utils/formatLamports";
import useExchangeRatesContext from "hooks/useExchangeRatesContext";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Link } from "react-router-dom";
import ColorClass from "types/enums/ColorClass";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import StatsDisplayType from "types/enums/StatsDisplayType";
import StatsRowSingleColumn from "components/pages/stats/stats-row/StatsRowSingleColumn";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import StatsRowDoubleColumn from "components/pages/stats/stats-row/StatsRowDoubleColumn";
import StatsRowUserInfo from "components/pages/stats/stats-row/StatsRowUserInfo";
import StatsRowRank from "components/pages/stats/stats-row/StatsRowRank";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import TextSymbol from "types/enums/TextSymbol";

type Props = {
  collectorsOrCreatorsCount: number;
  displayType: StatsDisplayType;
  nftCount: number;
  rank: number;
  userInfo: {
    displayName: string;
    photoUrl: string;
    username: string;
  };
  volumeInLamports: number;
};

export default function StatsRow({
  collectorsOrCreatorsCount,
  displayType,
  nftCount,
  rank,
  userInfo,
  volumeInLamports,
}: Props) {
  const { priceToUsd } = useExchangeRatesContext();
  const { width } = useWindowDimensions();

  const userInfoElem = (
    <StatsRowUserInfo
      displayName={userInfo.displayName}
      photoUrl={userInfo.photoUrl}
      username={userInfo.username}
    />
  );

  const salesInfoElem = (
    <div className={styles.salesInfo}>
      {width > FONT_BREAKPOINT ? (
        <ArtName colorClass={ColorClass.Primary}>
          {formatLamports(volumeInLamports)} {TextSymbol.SolSymbol}
        </ArtName>
      ) : (
        <Body1Medium colorClass={ColorClass.Primary}>
          {formatLamports(volumeInLamports)} {TextSymbol.SolSymbol}
        </Body1Medium>
      )}
      <Body1 colorClass={ColorClass.Secondary}>
        ${priceToUsd(volumeInLamports / LAMPORTS_PER_SOL, "Solana")}
      </Body1>
    </div>
  );

  const rankElem = <StatsRowRank rank={rank} />;

  switch (displayType) {
    case StatsDisplayType.DoubleColumn:
      return (
        <Link to={getUserProfileLinkRelative(userInfo.username)}>
          <StatsRowDoubleColumn
            rankElem={rankElem}
            salesInfoElem={salesInfoElem}
            userInfoElem={userInfoElem}
          />
        </Link>
      );
    case StatsDisplayType.SingleColumn:
      return (
        <Link to={getUserProfileLinkRelative(userInfo.username)}>
          <StatsRowSingleColumn
            collectorsOrCreatorsCount={collectorsOrCreatorsCount}
            nftCount={nftCount}
            rankElem={rankElem}
            salesInfoElem={salesInfoElem}
            userInfoElem={userInfoElem}
          />
        </Link>
      );
    default:
      return assertUnreachable(displayType);
  }
}
