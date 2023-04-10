/* eslint-disable react/no-unescaped-entities */
import GenericConfirmationModal from "components/modal/GenericConfirmationModal";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function ExchangeArtInfoModal({
  isShown,
  onHide,
}: Props): JSX.Element {
  return (
    <GenericConfirmationModal
      bodyText={
        <Body1 colorClass={ColorClass.Secondary} textAlign="left">
          <ol style={{ marginBottom: 0 }}>
            <li>Go to the NFT&apos;s page on Exchange Art.</li>
            <li>Under "Details," find the row labeled "Token address."</li>
            <li>
              Click the linked address next to "Token address." This will open
              up a new page on the Solana Explorer website.
            </li>
            <li>
              On the Solana Explorer website, under "Overview," find the row
              labeled "Address."
            </li>
            <li>Copy the address—this is the token address for the NFT.</li>
            <li>
              Paste the address into the Formfunction token addresses field.
            </li>
          </ol>
        </Body1>
      }
      buttonText="OK"
      isShown={isShown}
      onHide={onHide}
      onConfirmClick={onHide}
      title="Finding a token address for an NFT on Exchange Art"
    />
  );
}
