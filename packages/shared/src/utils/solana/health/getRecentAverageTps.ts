import { Connection } from "@solana/web3.js";
import { Maybe } from "types/UtilityTypes";
import arraySum from "utils/array/arraySum";
import sleepMs from "utils/sleepMs";

async function getRecentPerformanceSamples(
  connection: Connection,
  minutesLookback: number
) {
  const recentPerfSamples = await connection.getRecentPerformanceSamples();
  let stoppingIndex = recentPerfSamples.length;
  let secondsSum = 0;
  for (let i = 0; i < recentPerfSamples.length; i++) {
    secondsSum += recentPerfSamples[i].samplePeriodSecs;
    if (secondsSum >= minutesLookback * 60) {
      stoppingIndex = i + 1;
      break;
    }
  }

  return recentPerfSamples.slice(0, stoppingIndex);
}

async function getRecentAverageTpsForConnection(
  connection: Connection,
  minutesLookback: number,
  retries: number
) {
  for (let i = 0; i < retries; i++) {
    try {
      const recentPerfSamples = await getRecentPerformanceSamples(
        connection,
        minutesLookback
      );

      const tpsSamples = recentPerfSamples.map(
        (perfSample) =>
          perfSample.numTransactions / Math.max(perfSample.samplePeriodSecs, 1)
      );

      return arraySum(tpsSamples) / tpsSamples.length;
    } catch {
      await sleepMs(i * 1000);
      continue;
    }
  }

  return null;
}

export default async function getRecentAverageTps(
  connections: Array<Connection>,
  minutesLookback = 10,
  retries = 5
): Promise<Maybe<number>> {
  for (let i = 0; i < connections.length; i++) {
    const result = await getRecentAverageTpsForConnection(
      connections[i],
      minutesLookback,
      retries
    );
    if (result != null) {
      return result;
    }
  }

  return null;
}
