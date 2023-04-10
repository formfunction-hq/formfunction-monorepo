import { PublicKey } from "@solana/web3.js";
import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import GenericModal from "components/modal/GenericModal";
import { BurnModalMutation } from "components/modal/__generated__/BurnModalMutation.graphql";
import { BurnModal_MetadataAccount$key } from "components/modal/__generated__/BurnModal_MetadataAccount.graphql";
import Body1 from "components/text/Body1";
import { notify } from "components/toast/notifications";
import styles from "css/modal/BurnModal.module.css";
import useSolanaContext from "hooks/useSolanaContext";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import invariant from "tiny-invariant";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import logIfNotProd from "utils/logIfNotProd";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import useUserContext from "hooks/useUserContext";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import useBurnNft from "hooks/useBurnNft";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useViewerId from "hooks/useViewerId";
import PrimaryAndSecondaryButtonContainer from "components/buttons/PrimaryAndSecondaryButtonContainer";

const mutation = graphql`
  mutation BurnModalMutation(
    $creator: String!
    $mint: String!
    $txid: String!
    $connections: [ID!]!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    insertNftTransaction(
      input: {
        creatorId: $creator
        fromUserId: $creator
        toUserId: $creator
        mint: $mint
        price: null
        txid: $txid
        type: Burned
      }
    ) {
      transaction
        @prependNode(
          connections: $connections
          edgeTypeName: "NftTransactionsEdge"
        ) {
        ...NftTransaction_NftTransactionExpress
      }

      updatedMetadataAccount {
        ...NftPageContent_MetadataAccount
      }
    }
  }
`;

const fragment = graphql`
  fragment BurnModal_MetadataAccount on MetadataAccount {
    mint
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: BurnModal_MetadataAccount$key;
  onHide: () => void;
};

export default function BurnModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const viewerId = useViewerId();
  const [commit] = useMutation<BurnModalMutation>(mutation);
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [isLoading, setIsLoading] = useState(false);
  const { anchorWallet } = useSolanaContext();
  const burnNft = useBurnNft();
  const {
    NftTransactions: { connectionId: nftTransactionsConnectionId },
  } = useRelayConnectionIdsContext();
  const { profileHref } = useUserContext();

  const description = (
    <Body1 colorClass={ColorClass.Secondary} textAlign="center">
      Are you sure you want to burn this NFT?{" "}
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Secondary}
        display="inline"
        fontClass={FontClass.Body1}
        href="https://docs.metaplex.com/guides/burn-nfts#what-is-burning"
        textDecoration="underline"
        type="link_external"
      >
        Burning
      </TextButton>{" "}
      will remove it from the blockchain and delete it from Formfunction. After
      burning it, this NFT will no longer be displayed on our website.
    </Body1>
  );

  return (
    <GenericModal
      description={description}
      isShown={isShown}
      maxWidth={800}
      onHide={onHide}
      title="Burn this NFT?"
    >
      <div className={styles.body}>
        <PrimaryAndSecondaryButtonContainer>
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            className={styles.burnButton}
            fontClass={FontClass.NavLink}
            onClick={async () => {
              setIsLoading(true);
              invariant(anchorWallet != null);
              const txid = await burnNft(metadataAccountData.mint);

              if (txid == null) {
                setIsLoading(false);
                return;
              }

              const mintKey = new PublicKey(metadataAccountData.mint);
              commit({
                onCompleted: () => {
                  notify({
                    message: "Successfully burned! Reloading profile...",
                    txid,
                  });
                  setIsLoading(false);
                  onHide();
                  setTimeout(() => {
                    // Go back to profile page so burned NFT doesn't show anywhere
                    window.location.href = profileHref;
                  }, 2000);
                },
                onError: (e) => {
                  logIfNotProd("error burning (graphql)", e);
                  notifyUnexpectedError();
                },
                variables: {
                  [FetchGraphqlVariablesDenylist.Connections]: [
                    nftTransactionsConnectionId ?? "",
                  ],
                  creator: anchorWallet.publicKey.toString(),
                  mint: mintKey.toString(),
                  txid,
                  unlockableWinnerUserEmailInput: {
                    viewerId,
                  },
                },
              });
            }}
            isLoading={isLoading}
          >
            Burn NFT
          </ButtonWithText>
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            onClick={onHide}
          >
            Nevermind
          </TextButton>
        </PrimaryAndSecondaryButtonContainer>
      </div>
    </GenericModal>
  );
}
