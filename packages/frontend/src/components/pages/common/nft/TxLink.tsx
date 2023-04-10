import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getExplorerTxLink from "utils/solana/explorer/getExplorerTxLink";
import styles from "css/pages/common/nft/TxLink.module.css";

export default function TxLink({
  children,
  txid,
}: {
  children: any;
  txid: Maybe<string>;
}) {
  if (txid == null) {
    return children;
  }

  return (
    <a
      className={styles.link}
      href={getExplorerTxLink(txid)}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
