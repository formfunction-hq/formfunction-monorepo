import graphql from "babel-plugin-relay/macro";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { useFragment } from "react-relay";
import useSolanaContext from "hooks/useSolanaContext";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";
import isNativeCurrency from "utils/currency/isNativeCurrency";
import CrossmintModal from "components/modal/CrossmintModal";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import FontClass from "types/enums/FontClass";
import { CrossmintButtonWrapper_MetadataAccount$key } from "components/buttons/__generated__/CrossmintButtonWrapper_MetadataAccount.graphql";

const fragment = graphql`
  fragment CrossmintButtonWrapper_MetadataAccount on MetadataAccount {
    mint
    primarySaleHappened

    nft {
      ownerId
      priceV2 {
        currencyInfo {
          name
        }
      }
      status
    }

    unlockable {
      __typename
    }

    ...CrossmintModal_MetadataAccount
  }
`;

type Props = {
  metadataAccount: CrossmintButtonWrapper_MetadataAccount$key;
};

/**
 * Only shown when it is possible for the passed-in NFT to be bought with Crossmint.
 *
 * When clicks, shows a modal with some information about Crossmint and the actual CrossmintPayButton.
 */
export default function CrossmintButtonWrapper({
  metadataAccount,
}: Props): Maybe<JSX.Element> {
  const { anchorWallet, connection } = useSolanaContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const {
    nft: { ownerId, priceV2, status },
    primarySaleHappened,
    unlockable,
  } = metadataAccountData;
  const [ownerTokenAccount, setOwnerTokenAccount] =
    useState<Maybe<string>>(null);
  useEffect(() => {
    async function run() {
      const tokenAccount = await getNftMintTokenAccountAddressOrAta(
        connection,
        new PublicKey(metadataAccountData.mint),
        new PublicKey(ownerId)
      );
      setOwnerTokenAccount(tokenAccount.toString());
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerId]);
  const [isCrossmintModalShown, setIsCrossmintModalShown] = useState(false);

  const isOwner =
    anchorWallet?.publicKey != null &&
    arePublicKeysEqual(anchorWallet.publicKey, ownerId);

  if (
    isOwner ||
    priceV2 == null ||
    // TODO: support USDC
    // For now, only NFTs listed in SOL can be bought via Crossmint.
    !isNativeCurrency(priceV2.currencyInfo.name) ||
    ownerTokenAccount == null ||
    // TODO: support unlockables
    // For now, disable purchasing with Crossmint if there is an unlockable, because
    // the NFT gets transferred to a Crossmint account
    (unlockable != null && !primarySaleHappened)
  ) {
    return null;
  }

  switch (status) {
    case "ListedInstantSale":
      return (
        <>
          <CrossmintModal
            isShown={isCrossmintModalShown}
            metadataAccount={metadataAccountData}
            onHide={() => setIsCrossmintModalShown(false)}
            ownerTokenAccount={ownerTokenAccount}
          />
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            fontClass={FontClass.Body1Medium}
            onClick={() => setIsCrossmintModalShown(true)}
          >
            Buy with credit card
          </TextButton>
        </>
      );
    case "Auction":
    case "AirdropCompleted":
    case "AirdropInProgress":
    case "Burned":
    case "Listed":
    case "ListedEditions":
    case "ListingScheduled":
    case "Owned":
    case "OwnedStoppedMintingForEditions":
    case "SoldOutEditions":
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(status);
  }
}
