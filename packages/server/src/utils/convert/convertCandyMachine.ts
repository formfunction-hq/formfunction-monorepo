import ConvertCandyMachineType from "src/types/convert/ConvertCandyMachineType";
import Typename from "src/types/enums/Typename";
import convertPrice from "src/utils/convert/convertPrice";
import convertSeries from "src/utils/convert/convertSeries";
import convertUser from "src/utils/convert/convertUser";
import { CandyMachineExpress } from "src/__generated__/generated";

export default function convertCandyMachine(
  candyMachine: ConvertCandyMachineType
): CandyMachineExpress {
  const {
    antiBotProtectionEnabled,
    allowlistSaleStartTime,
    maxSupply,
    price,
    Currency,
    publicSaleEndTime,
    publicSaleStartTime,
    premintPrice,
    allowlistPrice,
    publicKey,
    omniMintWallets,
    limitPerAddress,
  } = candyMachine;

  return {
    Authority: convertUser(candyMachine.FormfnAuthority),
    CreatorAuthority: convertUser(candyMachine.CreatorAuthority),
    Series: convertSeries(candyMachine.Series)!,
    __typename: Typename.CandyMachine,
    allowlistPrice:
      allowlistPrice != null
        ? convertPrice(Number(allowlistPrice), Currency)
        : null,
    allowlistSaleStartTime,
    antiBotProtectionEnabled,
    id: candyMachine.id,
    limitPerAddress,
    maxSupply,
    omniMintWallets: omniMintWallets as Array<string>,
    premintPrice:
      premintPrice != null
        ? convertPrice(Number(premintPrice), Currency)
        : null,
    price: convertPrice(Number(price), Currency)!,
    publicKey,
    publicSaleEndTime,
    publicSaleStartTime,
    totalAmountMinted: candyMachine.totalAmountMinted,
  };
}
