import graphql from "babel-plugin-relay/macro";
import { useCandyMachineIsSoldOut_CandyMachineExpress$key } from "hooks/candy-machine/__generated__/useCandyMachineIsSoldOut_CandyMachineExpress.graphql";
import { useFragment } from "react-relay";

const candyMachineInfoFragment = graphql`
  fragment useCandyMachineIsSoldOut_CandyMachineExpress on CandyMachineExpress {
    maxSupply
    totalAmountMinted
  }
`;

export default function useCandyMachineIsSoldOut(
  candyMachine: useCandyMachineIsSoldOut_CandyMachineExpress$key
): boolean {
  const candyMachineData = useFragment(candyMachineInfoFragment, candyMachine);

  return candyMachineData.totalAmountMinted >= candyMachineData.maxSupply;
}
