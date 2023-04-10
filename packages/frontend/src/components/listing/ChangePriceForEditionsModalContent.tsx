import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
import EditionsChoosePriceFunctionType from "components/listing/EditionsChoosePriceFunctionType";
import { ChangePriceForEditionsModalContent_MetadataAccount$key } from "components/listing/__generated__/ChangePriceForEditionsModalContent_MetadataAccount.graphql";
import ChangePriceForEditionsConstantOrMinimumPrice from "components/listing/ChangePriceForEditionsConstantOrMinimumPrice";
import ChangePriceForEditionsLinearPrice from "components/listing/ChangePriceForEditionsLinearPrice";

const fragment = graphql`
  fragment ChangePriceForEditionsModalContent_MetadataAccount on MetadataAccount {
    ...ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount
    ...ChangePriceForEditionsLinearPrice_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ChangePriceForEditionsModalContent_MetadataAccount$key;
  onHide: () => void;
  priceFunctionType: Maybe<PriceFunctionType>;
  setIsLoading: (val: boolean) => void;
  setPriceFunctionType: (val: PriceFunctionType) => void;
};

export default function ChangePriceForEditionsModalContent({
  isLoading,
  metadataAccount,
  onHide,
  priceFunctionType,
  setIsLoading,
  setPriceFunctionType,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  switch (priceFunctionType) {
    case PriceFunctionType.Constant:
    case PriceFunctionType.Minimum:
      return (
        <ChangePriceForEditionsConstantOrMinimumPrice
          isLoading={isLoading}
          metadataAccount={metadataAccountData}
          onHide={onHide}
          priceFunctionType={priceFunctionType}
          setIsLoading={setIsLoading}
        />
      );
    case PriceFunctionType.Linear:
      return (
        <ChangePriceForEditionsLinearPrice
          isLoading={isLoading}
          metadataAccount={metadataAccountData}
          onHide={onHide}
          setIsLoading={setIsLoading}
        />
      );
    case null:
      return (
        <EditionsChoosePriceFunctionType
          setPriceFunctionType={setPriceFunctionType}
        />
      );
    default:
      return assertUnreachable(priceFunctionType);
  }
}
