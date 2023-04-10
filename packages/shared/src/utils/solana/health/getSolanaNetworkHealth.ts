import { Connection } from "@solana/web3.js";
import SolanaNetworkHealth from "types/enums/SolanaNetworkHealth";
import getRecentAverageTps from "utils/solana/health/getRecentAverageTps";

// Kinda arbitrary
const SOLANA_SLOW_TPS_CUTOFF = 1_250;
const SOLANA_DOWN_TPS_CUTOFF = 500;

export default async function getSolanaNetworkHealth(
  connections: Array<Connection>,
  minutesLookback: number,
  solanaDownTpsCutoff = SOLANA_DOWN_TPS_CUTOFF,
  solanaSlowTpsCutoff = SOLANA_SLOW_TPS_CUTOFF
) {
  const tps = await getRecentAverageTps(connections, minutesLookback);
  if (tps == null) {
    return { health: SolanaNetworkHealth.Unknown, tps: null };
  }

  if (tps > solanaSlowTpsCutoff) {
    return { health: SolanaNetworkHealth.Good, tps };
  }
  if (tps > solanaDownTpsCutoff) {
    return { health: SolanaNetworkHealth.Slow, tps };
  }
  return { health: SolanaNetworkHealth.Down, tps };
}
