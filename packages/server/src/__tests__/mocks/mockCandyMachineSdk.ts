import { BN } from "@project-serum/anchor";
import FormfnCandyMachineSdk from "@formfunction-hq/formfunction-candy-machine";

export default function mockCandyMachineSdk(price: number) {
  // TODO: return proper mock as needed
  jest
    .spyOn(FormfnCandyMachineSdk.prototype, "fetchCandyMachine")
    .mockResolvedValue({
      // @ts-ignore
      data: { price: new BN(price) },
    });
  jest
    .spyOn(FormfnCandyMachineSdk.prototype, "fetchCandyMachineCollectionPda")
    // @ts-ignore
    .mockResolvedValue({});
}
