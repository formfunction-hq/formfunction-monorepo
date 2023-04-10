import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { useUnlockablePurchaseMessage_MetadataAccount$key } from "hooks/__generated__/useUnlockablePurchaseMessage_MetadataAccount.graphql";
import useFormattedNftPrice from "hooks/useFormattedNftPrice";
import useNftPriceSymbol from "hooks/useNftPriceSymbol";

const fragment = graphql`
  fragment useUnlockablePurchaseMessage_MetadataAccount on MetadataAccount {
    primarySaleHappened

    unlockable {
      activationPrice {
        ...useFormattedNftPrice_Price
        ...useNftPriceSymbol_Price
      }
    }
  }
`;

export default function useUnlockablePurchaseMessage(
  metadataAccount: useUnlockablePurchaseMessage_MetadataAccount$key
) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { activationPrice } = metadataAccountData.unlockable ?? {};
  const formattedPrice = useFormattedNftPrice(activationPrice);
  const { shortSymbol, symbol } = useNftPriceSymbol(activationPrice);

  const { primarySaleHappened, unlockable } = metadataAccountData;
  if (primarySaleHappened || unlockable == null) {
    return "";
  }

  if (activationPrice != null) {
    return ` The buyer of this piece will receive an unlockable if the final sale price is at least ${formattedPrice} ${
      shortSymbol ?? symbol
    }.`;
  }

  return " The buyer of this piece will receive an unlockable.";
}
