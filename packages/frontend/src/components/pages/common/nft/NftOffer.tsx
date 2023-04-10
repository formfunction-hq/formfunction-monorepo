import styles from "css/pages/common/nft/NftOffer.module.css";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import {
  NftOffer_NftTransactionExpress$key,
  NftOffer_NftTransactionExpress$data,
} from "components/pages/common/nft/__generated__/NftOffer_NftTransactionExpress.graphql";
import useUserContext from "hooks/useUserContext";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import dayjs from "utils/dates/dayjsex";
import AcceptOfferModal from "components/modal/AcceptOfferModal";
import { useState } from "react";
import CancelOfferModal from "components/modal/CancelOfferModal";
import { NftOffer_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftOffer_MetadataAccount.graphql";
import NftOfferGeneric from "components/pages/common/nft/NftOfferGeneric";

function ActionButton({
  setIsAcceptOfferModalShown,
  setIsCancelOfferModalShown,
  transactionData,
}: {
  setIsAcceptOfferModalShown: (val: boolean) => void;
  setIsCancelOfferModalShown: (val: boolean) => void;
  transactionData: NftOffer_NftTransactionExpress$data;
}) {
  const { user } = useUserContext();
  if (user == null) {
    return null;
  }

  const isOwnOffer = user.id === transactionData?.From?.id;
  const isNftOwner = user.id === transactionData?.To?.id;
  if (!isOwnOffer && !isNftOwner) {
    // Button should only show up for these cases
    return null;
  }

  let buttonText;
  let onClick;
  if (isOwnOffer) {
    buttonText = "Cancel";
    onClick = () => setIsCancelOfferModalShown(true);
  } else {
    buttonText = "Accept";
    onClick = () => setIsAcceptOfferModalShown(true);
  }

  return (
    <div className={styles.actionButton}>
      <ButtonWithText
        buttonTheme={ButtonTheme.BrightPurpleOutline}
        className={styles.button}
        fontClass={FontClass.NavLink}
        // TODO: implement
        onClick={onClick}
      >
        {buttonText}
      </ButtonWithText>
    </div>
  );
}

const nftFragment = graphql`
  fragment NftOffer_MetadataAccount on MetadataAccount {
    ...AcceptOfferModal_MetadataAccount
    ...CancelOfferModal_MetadataAccount
  }
`;

const offerFragment = graphql`
  fragment NftOffer_NftTransactionExpress on NftTransactionExpress {
    To {
      id
    }

    From {
      id
    }

    ...AcceptOfferModal_NftTransactionExpress
    ...CancelOfferModal_NftTransactionExpress
    ...NftOfferGeneric_NftTransactionExpress
  }
`;

type Props = {
  expirationDate: dayjs.Dayjs;
  isValid: boolean;
  metadataAccount: NftOffer_MetadataAccount$key;
  transaction: NftOffer_NftTransactionExpress$key;
};

export default function NftOffer({
  isValid,
  expirationDate,
  transaction,
  metadataAccount,
}: Props): Maybe<JSX.Element> {
  const [isAcceptOfferModalShown, setIsAcceptOfferModalShown] = useState(false);
  const [isCancelOfferModalShown, setIsCancelOfferModalShown] = useState(false);
  const metadataAccountData = useFragment(nftFragment, metadataAccount);
  const transactionData = useFragment(offerFragment, transaction);

  return (
    <>
      <CancelOfferModal
        description={
          "If you cancel your current offer, the funds from the offer will" +
          " be returned to you and you can make a new offer later."
        }
        metadataAccount={metadataAccountData}
        isShown={isCancelOfferModalShown}
        onHide={() => setIsCancelOfferModalShown(false)}
        offerTransaction={transactionData}
        title="Cancel your offer?"
      />
      <AcceptOfferModal
        isShown={isAcceptOfferModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsAcceptOfferModalShown(false)}
        offerTransaction={transactionData}
      />
      <NftOfferGeneric
        actionButton={
          <ActionButton
            setIsAcceptOfferModalShown={setIsAcceptOfferModalShown}
            setIsCancelOfferModalShown={setIsCancelOfferModalShown}
            transactionData={transactionData}
          />
        }
        expirationDate={expirationDate}
        isValid={isValid}
        transaction={transactionData}
      />
    </>
  );
}
