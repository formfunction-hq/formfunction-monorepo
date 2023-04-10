import graphql from "babel-plugin-relay/macro";
import CrossmintButton from "components/buttons/CrossmintButton";
import PrimaryAndSecondaryButtonContainerForModal from "components/buttons/PrimaryAndSecondaryButtonContainerForModal";
import TextButton from "components/buttons/TextButton";
import GenericModal from "components/modal/GenericModal";
import { CrossmintModal_MetadataAccount$key } from "components/modal/__generated__/CrossmintModal_MetadataAccount.graphql";
import Body1 from "components/text/Body1";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import styles from "css/modal/CrossmintModal.module.css";

const fragment = graphql`
  fragment CrossmintModal_MetadataAccount on MetadataAccount {
    ...CrossmintButton_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: CrossmintModal_MetadataAccount$key;
  onHide: () => void;
  ownerTokenAccount: string;
};

export default function CrossmintModal({
  isShown,
  metadataAccount,
  onHide,
  ownerTokenAccount,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHide}
      title="Buy with credit card"
    >
      <Body1
        className={styles.text}
        colorClass={ColorClass.Secondary}
        textAlign="center"
      >
        Formfunction uses{" "}
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          display="inline"
          fontClass={FontClass.Body1}
          href="https://www.crossmint.io/"
          type="link_external"
        >
          Crossmint
        </TextButton>{" "}
        to enable credit card payments for instant sales. Here are some things
        to keep in mind about how Crossmint works:
        <ol className={styles.list}>
          <li>
            Crossmint charges an additional fee to the buyer to cover credit
            card fees, Stripe fees, and their own services. You&apos;ll be able
            to see the final price before paying.
          </li>
          <li>
            When you pay through Crossmint, they will buy the NFT on your behalf
            and put it in your Crossmint wallet. You can keep it there, or
            transfer it to your Solana wallet.
          </li>
        </ol>
      </Body1>
      <PrimaryAndSecondaryButtonContainerForModal>
        <CrossmintButton
          metadataAccount={metadataAccountData}
          onClick={onHide}
          ownerTokenAccount={ownerTokenAccount}
        />
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          onClick={onHide}
        >
          Nevermind
        </TextButton>
      </PrimaryAndSecondaryButtonContainerForModal>
    </GenericModal>
  );
}
