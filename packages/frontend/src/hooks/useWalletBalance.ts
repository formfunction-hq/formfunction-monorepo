import useSolanaContext from "hooks/useSolanaContext";
import { useEffect, useState } from "react";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import getBalanceForMint from "formfn-shared/dist/utils/solana/getBalanceForMint";
import CurrencyConfig from "types/CurrencyConfig";

export default function useWalletBalance(
  currencyConfig: CurrencyConfig
): MaybeUndef<number> {
  const { anchorWallet, connection } = useSolanaContext();
  const [balance, setBalance] = useState<MaybeUndef<number>>(undefined);

  useEffect(() => {
    async function run() {
      const publicKey = anchorWallet?.publicKey;
      if (publicKey != null) {
        const accountBalance = await getBalanceForMint(
          connection,
          currencyConfig.mint,
          publicKey
        );
        setBalance(accountBalance);
      }
    }

    // Do this so the old wallet balance doesn't show in the new currency
    // until new balance is loaded
    setBalance(null);
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorWallet?.publicKey?.toString(), currencyConfig.mint.toString()]);

  return balance;
}
