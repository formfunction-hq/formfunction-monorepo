import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import LoadingSpinner from "components/loading/LoadingSpinner";
import GenericModal from "components/modal/GenericModal";
import { NftHistoryModalQuery } from "components/modal/__generated__/NftHistoryModalQuery.graphql";
import Body1 from "components/text/Body1";
import styles from "css/modal/NftHistoryModal.module.css";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import NftTransaction from "components/pages/common/nft/NftTransaction";
import NftTransactions from "components/pages/common/nft/NftTransactions";

const query = graphql`
  query NftHistoryModalQuery($input: NftTransactionsForImportInput!) {
    nftTransactionsForImport(input: $input) {
      transactions {
        fromAddress
        toAddress
        type

        ...NftTransaction_NftTransactionExpress
      }
    }
  }
`;

function Inner({ mintAddress }: { mintAddress: string }) {
  const data = useLazyLoadQuery<NftHistoryModalQuery>(query, {
    input: { mintAddress },
  });

  return (
    <NftTransactions className={styles.transactions}>
      {data.nftTransactionsForImport.transactions
        .filter(
          (tx) =>
            !(tx.type === "Transferred" && tx.fromAddress === tx.toAddress)
        )
        .map((tx) => (
          <NftTransaction nftTransaction={tx} />
        ))}
    </NftTransactions>
  );
}

type Props = {
  isShown: boolean;
  mintAddress: string;
  onHide: () => void;
};

export default function NftHistoryModal({
  isShown,
  mintAddress,
  onHide,
}: Props): JSX.Element {
  return (
    <GenericModal isShown={isShown} onHide={onHide} title="NFT History">
      <div className={styles.container}>
        <Body1 colorClass={ColorClass.Secondary} textAlign="center">
          This history will be shown on the NFT&apos;s page on Formfunction.
        </Body1>
        <Suspense
          fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
        >
          <Inner mintAddress={mintAddress} />
        </Suspense>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          onClick={onHide}
        >
          OK
        </ButtonWithText>
      </div>
    </GenericModal>
  );
}
