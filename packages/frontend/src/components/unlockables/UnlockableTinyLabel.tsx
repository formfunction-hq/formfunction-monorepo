import TinyLabel from "components/text/TinyLabel";
import ColorClass from "types/enums/ColorClass";
import getDisplayLabelFromUnlockableCategory from "utils/unlockables/getDisplayLabelFromUnlockableCategory";
import { UnlockableCategory } from "components/pages/common/nft/__generated__/NftPageUnlockableSection_MetadataAccount.graphql";
import graphql from "babel-plugin-relay/macro";
import useFormattedNftPrice from "hooks/useFormattedNftPrice";
import { UnlockableTinyLabel_UnlockableExpress$key } from "components/unlockables/__generated__/UnlockableTinyLabel_UnlockableExpress.graphql";
import { useFragment } from "react-relay";
import useNftPriceSymbol from "hooks/useNftPriceSymbol";

const fragment = graphql`
  fragment UnlockableTinyLabel_UnlockableExpress on UnlockableExpress {
    activationPrice {
      ...useFormattedNftPrice_Price
      ...useNftPriceSymbol_Price
    }
  }
`;

type Props = {
  category: UnlockableCategory;
  unlockable: UnlockableTinyLabel_UnlockableExpress$key;
};

export default function UnlockableTinyLabel({ category, unlockable }: Props) {
  const unlockableData = useFragment(fragment, unlockable);
  const categoryLabel = getDisplayLabelFromUnlockableCategory(category);
  const formattedPrice = useFormattedNftPrice(unlockableData.activationPrice);
  const { shortSymbol, symbol } = useNftPriceSymbol(
    unlockableData.activationPrice
  );

  return (
    <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
      {categoryLabel}Unlockable
      {unlockableData.activationPrice != null && (
        <>
          {" "}
          • {formattedPrice} {shortSymbol ?? symbol} activation price
        </>
      )}
    </TinyLabel>
  );
}
