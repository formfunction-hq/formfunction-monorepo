import {
  CandyMachineMintPhase,
  getMintPhase,
} from "@formfunction-hq/formfunction-candy-machine";
import graphql from "babel-plugin-relay/macro";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { useCandyMachineMintPhase_CandyMachineExpress$key } from "hooks/candy-machine/__generated__/useCandyMachineMintPhase_CandyMachineExpress.graphql";
import { useFragment } from "react-relay";
import dayjs from "utils/dates/dayjsex";

const candyMachineFragment = graphql`
  fragment useCandyMachineMintPhase_CandyMachineExpress on CandyMachineExpress {
    allowlistSaleStartTime
    publicSaleEndTime
    publicSaleStartTime
  }
`;

export default function useCandyMachineMintPhase(
  candyMachine: useCandyMachineMintPhase_CandyMachineExpress$key
) {
  const candyMachineData = useFragment(candyMachineFragment, candyMachine);
  const { allowlistSaleStartTime, publicSaleEndTime, publicSaleStartTime } =
    candyMachineData;

  const mintPhase = getMintPhase({
    allowlistSaleStartTimeUnix:
      allowlistSaleStartTime == null ? null : dayjs(allowlistSaleStartTime),
    publicSaleEndTimeUnix: dayjs(publicSaleEndTime),
    publicSaleStartTimeUnix: dayjs(publicSaleStartTime),
  });

  switch (mintPhase) {
    case CandyMachineMintPhase.Premint:
      return CandyMachineMintPhase.Premint;
    case CandyMachineMintPhase.Allowlist:
      return CandyMachineMintPhase.Allowlist;
    case CandyMachineMintPhase.Public:
      return CandyMachineMintPhase.Public;
    case CandyMachineMintPhase.Expired:
      return CandyMachineMintPhase.Expired;
    default:
      return assertUnreachable(mintPhase);
  }
}
