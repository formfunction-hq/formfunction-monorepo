import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import useSolanaContext from "hooks/useSolanaContext";

export default function useViewerId(): MaybeUndef<string> {
  const { anchorWallet } = useSolanaContext();

  if (anchorWallet == null) {
    // Do this instead of optional chaining b/c optional chaining converts
    // null into undefined.
    //
    // E.g. if foo is null, then foo?.bar is undefined.
    return anchorWallet;
  }

  return anchorWallet.publicKey.toString();
}
