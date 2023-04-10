import GenericModal from "components/modal/GenericModal";
import { useState } from "react";
import { notify } from "components/toast/notifications";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import usePreventRefresh from "hooks/usePreventRefresh";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ElementId from "types/enums/ElementId";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { ListEditionsModal_MetadataAccount$key } from "components/modal/__generated__/ListEditionsModal_MetadataAccount.graphql";
import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
import ListEditionsModalContent from "components/listing/ListEditionsModalContent";

const fragment = graphql`
  fragment ListEditionsModal_MetadataAccount on MetadataAccount {
    ...ListEditionsModalContent_MetadataAccount
  }
`;

function getTitleForPriceFunctionType(
  priceFunctionType: Maybe<PriceFunctionType>
) {
  switch (priceFunctionType) {
    case PriceFunctionType.Constant:
      return "List editions with set pricing";
    case PriceFunctionType.Linear:
      return "List editions with incremental pricing";
    case PriceFunctionType.Minimum:
      return "List editions with flexible pricing";
    case null:
      return "List editions";
    default:
      return assertUnreachable(priceFunctionType);
  }
}

type Props = {
  isShown: boolean;
  metadataAccount: ListEditionsModal_MetadataAccount$key;
  onHide: () => void;
};

export default function ListEditionsModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [isLoading, setIsLoading] = useState(false);
  const [priceFunctionType, setPriceFunctionType] =
    useState<Maybe<PriceFunctionType>>(null);
  usePreventRefresh(isShown && isLoading);

  return (
    <GenericModal
      isShown={isShown}
      modalId={ElementId.ListNftModal}
      onHide={() => {
        if (isLoading) {
          notify({
            duration: 2,
            message: "Please wait for your listing to finish processing",
            type: "info",
          });
          return;
        }

        setPriceFunctionType(null);
        onHide();
      }}
      title={getTitleForPriceFunctionType(priceFunctionType)}
    >
      <ListEditionsModalContent
        isLoading={isLoading}
        metadataAccount={metadataAccountData}
        onHide={onHide}
        priceFunctionType={priceFunctionType}
        setIsLoading={setIsLoading}
        setPriceFunctionType={setPriceFunctionType}
      />
    </GenericModal>
  );
}
