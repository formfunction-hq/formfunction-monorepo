import useSolanaContext from "hooks/useSolanaContext";
import useUserContext from "hooks/useUserContext";
import invariant from "tiny-invariant";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import SOLANA_CURRENCY_CONFIG from "constants/SolanaCurrencyConfig";
import CurrencyConfig from "types/CurrencyConfig";
import getCreateEditionDistributorTx, {
  GetCreateEditionDistributorTxInput,
} from "utils/editions/getCreateEditionDistributorTx";

export default function useCreateEditionDistributor(
  currencyConfig?: Maybe<CurrencyConfig>
) {
  const { anchorWallet, getAuctionHouseSdk, connection } = useSolanaContext();
  const { userId } = useUserContext();
  const auctionHouseSdk = getAuctionHouseSdk(
    currencyConfig?.name ?? SOLANA_CURRENCY_CONFIG.name
  );

  return {
    createEditionDistributor: async (
      input: Omit<
        GetCreateEditionDistributorTxInput,
        "userId" | "auctionHouseSdk" | "auctionHouseSdkNew" | "connection"
      > & {
        afterSignCallback?: (txid: string) => void;
        setIsLoading: (val: boolean) => void;
      }
    ) => {
      const { setIsLoading, afterSignCallback, mint } = input;
      invariant(anchorWallet != null);
      invariant(auctionHouseSdk != null);
      invariant(userId != null);

      setIsLoading(true);

      const tx = await getCreateEditionDistributorTx({
        ...input,
        auctionHouseSdk,
        connection,
        userId,
      });

      return sendTransactionWithWallet({
        afterSignCallback,
        connection,
        loggingData: {
          mint,
          transactionType: CommitRawTxType.ListEditions,
        },
        txs: [tx],
        wallet: anchorWallet,
      });
    },
  };
}
