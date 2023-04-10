import CopyAddressButton from "components/buttons/CopyAddressButton";
import Body1 from "components/text/Body1";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/solana/WalletBalance.module.css";
import useExchangeRatesContext from "hooks/useExchangeRatesContext";
import useSolanaContext from "hooks/useSolanaContext";
import useWalletBalance from "hooks/useWalletBalance";
import ColorClass from "types/enums/ColorClass";
import CurrencyConfig from "types/CurrencyConfig";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";

export default function WalletBalance({
  currencyConfig,
}: {
  currencyConfig: CurrencyConfig;
}): JSX.Element {
  const { anchorWallet } = useSolanaContext();
  const balance = useWalletBalance(currencyConfig);
  const { priceToUsd } = useExchangeRatesContext();
  const formattedBalance = formatDecimals(
    balance ?? 0,
    currencyConfig.decimals
  );
  const usdPrice = priceToUsd(Number(formattedBalance), currencyConfig.name);
  const formattedUsdBalance = usdPrice != null ? `(~$${usdPrice} USD)` : "";

  return (
    <div className={styles.container}>
      <div className={styles.row1}>
        <TinyLabel
          className={styles.row1Item}
          colorClass={ColorClass.Primary}
          textTransform="uppercase"
        >
          Your Wallet Balance
        </TinyLabel>
        <div className={styles.row1Item}>
          <CopyAddressButton address={anchorWallet!.publicKey.toString()} />
        </div>
      </div>
      <div className={styles.row2}>
        <Body1 colorClass={ColorClass.Primary} textAlign="left">
          {balance == null
            ? 0
            : `${formattedBalance} ${
                currencyConfig.shortSymbol ?? currencyConfig.symbol
              } ${formattedUsdBalance}`}
        </Body1>
      </div>
    </div>
  );
}
