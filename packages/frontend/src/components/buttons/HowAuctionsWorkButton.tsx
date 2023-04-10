import FontClass from "types/enums/FontClass";
import { useState } from "react";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import HowAuctionsWorkModal from "components/modal/HowAuctionsWorkModal";
import graphql from "babel-plugin-relay/macro";
import { HowAuctionsWorkButton_MetadataAccount$key } from "components/buttons/__generated__/HowAuctionsWorkButton_MetadataAccount.graphql";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment HowAuctionsWorkButton_MetadataAccount on MetadataAccount {
    ...HowAuctionsWorkModal_MetadataAccount
  }
`;

type Props = {
  metadataAccount: HowAuctionsWorkButton_MetadataAccount$key;
};

export default function HowAuctionsWorkButton({
  metadataAccount,
}: Props): JSX.Element {
  const [isHowShown, setIsHowShown] = useState(false);
  const metadataAccountData = useFragment(fragment, metadataAccount);

  return (
    <>
      <HowAuctionsWorkModal
        isShown={isHowShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsHowShown(false)}
      />
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
        fontClass={FontClass.NavLink}
        onClick={() => setIsHowShown(true)}
      >
        How do auctions work?
      </TextButton>
    </>
  );
}
