import styles from "css/pages/activity/NftOfferForActivity.module.css";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import NftOfferGeneric from "components/pages/common/nft/NftOfferGeneric";
import dayjs from "utils/dates/dayjsex";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import useUserContext from "hooks/useUserContext";
import { NftOfferForActivity_NftOfferForUser$key } from "components/pages/activity/__generated__/NftOfferForActivity_NftOfferForUser.graphql";
import NftAssetForMetadataAccount from "components/images/NftAssetForMetadataAccount";
import useNftLinkForMetadataAccount from "hooks/useNftLinkForMetadataAccount";

const fragment = graphql`
  fragment NftOfferForActivity_NftOfferForUser on NftOfferForUser {
    expirationDate
    isValid
    metadataAccount {
      ...useNftLinkForMetadataAccount_MetadataAccount
      ...NftAssetForMetadataAccount_MetadataAccount
    }

    transaction {
      From {
        id
      }

      ...NftOfferGeneric_NftTransactionExpress
    }
  }
`;

type Props = {
  nftOffer: NftOfferForActivity_NftOfferForUser$key;
};

export default function NftOfferForActivity({ nftOffer }: Props) {
  const { userId } = useUserContext();
  const nftOfferData = useFragment(fragment, nftOffer);
  const nftLink = useNftLinkForMetadataAccount(nftOfferData.metadataAccount);
  const offerMade = userId === nftOfferData.transaction.From?.id;

  const cta = offerMade ? (
    <ButtonWithText
      buttonTheme={ButtonTheme.BrightPurpleOutline}
      fontClass={FontClass.Body1Medium}
      href={nftLink}
      type="link_internal"
    >
      Cancel offer
    </ButtonWithText>
  ) : (
    <ButtonWithText
      buttonTheme={ButtonTheme.PurpleGradient}
      fontClass={FontClass.Body1Medium}
      href={nftLink}
      type="link_internal"
    >
      Accept offer
    </ButtonWithText>
  );

  return (
    <NftOfferGeneric
      actionButton={cta}
      className={styles.container}
      expirationDate={dayjs(nftOfferData.expirationDate)}
      isValid={nftOfferData.isValid}
      nftAsset={
        <NftAssetForMetadataAccount
          metadataAccount={nftOfferData.metadataAccount}
        />
      }
      transaction={nftOfferData.transaction}
    />
  );
}
