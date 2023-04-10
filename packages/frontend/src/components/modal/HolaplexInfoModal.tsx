/* eslint-disable react/no-unescaped-entities */
import GenericConfirmationModal from "components/modal/GenericConfirmationModal";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function HolaplexInfoModal({
  isShown,
  onHide,
}: Props): JSX.Element {
  return (
    <GenericConfirmationModal
      bodyText={
        <Body1 colorClass={ColorClass.Secondary} textAlign="left">
          <ol style={{ marginBottom: 0, paddingLeft: 20 }}>
            <li>Go to the NFT&apos;s page on Holaplex.</li>
            <li>
              Click on "Transaction" (button next to the NFT title). This will
              open up a new page on the Solana Explorer website.
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
          <br />
          <i>
            TLDR: just follow the instructions above!
            <br />
            NOTE: Holaplex auctions used to default to auctioning off a 1/1
            limited edition (e.g.{" "}
            <a href="https://explorer.solana.com/address/B4tk6Um3rruhcfJySzfFaEGQ68jmXzJdYVAYe336m5L7">
              this Monster Friend
            </a>
            ). Even if you are trying to import one of these NFTs, you should
            still follow the instructions above (which lead to the master
            edition mint). We will automatically determine if a limited edition
            NFT was auctioned off and import it accordingly.
          </i>
        </Body1>
      }
      buttonText="OK"
      isShown={isShown}
      onHide={onHide}
      onConfirmClick={onHide}
      title="Finding a token address for an NFT on Holaplex"
    />
  );
}
