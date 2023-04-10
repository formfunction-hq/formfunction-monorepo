import GenericModal from "components/modal/GenericModal";
import { useState } from "react";
import { notify } from "components/toast/notifications";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import usePreventRefresh from "hooks/usePreventRefresh";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ElementId from "types/enums/ElementId";
import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
import { ChangePriceForEditionsModal_MetadataAccount$key } from "components/modal/__generated__/ChangePriceForEditionsModal_MetadataAccount.graphql";
import ChangePriceForEditionsModalContent from "components/listing/ChangePriceForEditionsModalContent";

const fragment = graphql`
  fragment ChangePriceForEditionsModal_MetadataAccount on MetadataAccount {
    ...ChangePriceForEditionsModalContent_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: ChangePriceForEditionsModal_MetadataAccount$key;
  onHide: () => void;
};

export default function ChangePriceForEditionsModal({
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
            message: "Please wait for the price change to finish processing",
            type: "info",
          });
          return;
        }

        setPriceFunctionType(null);
        onHide();
      }}
      title="Change price"
    >
      <ChangePriceForEditionsModalContent
        isLoading={isLoading}
        metadataAccount={metadataAccountData}
        onHide={() => {
          onHide();
          setPriceFunctionType(null);
        }}
        priceFunctionType={priceFunctionType}
        setIsLoading={setIsLoading}
        setPriceFunctionType={setPriceFunctionType}
      />
    </GenericModal>
  );
}
