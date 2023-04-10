import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { PriceFunctionType } from "@formfunction-hq/formfunction-auction-house";
import EditionsChoosePriceFunctionType from "components/listing/EditionsChoosePriceFunctionType";
import { ListEditionsModalContent_MetadataAccount$key } from "components/listing/__generated__/ListEditionsModalContent_MetadataAccount.graphql";
import ListEditionsConstantOrMinimumPrice from "components/listing/ListEditionsConstantOrMinimumPrice";
import ListEditionsLinearPrice from "components/listing/ListEditionsLinearPrice";

const fragment = graphql`
  fragment ListEditionsModalContent_MetadataAccount on MetadataAccount {
    ...ListEditionsConstantOrMinimumPrice_MetadataAccount
    ...ListEditionsLinearPrice_MetadataAccount
  }
`;

type Props = {
  isLoading: boolean;
  metadataAccount: ListEditionsModalContent_MetadataAccount$key;
  onHide: () => void;
  priceFunctionType: Maybe<PriceFunctionType>;
  setIsLoading: (val: boolean) => void;
  setPriceFunctionType: (val: PriceFunctionType) => void;
};

export default function ListEditionsModalContent({
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
        <ListEditionsConstantOrMinimumPrice
          isLoading={isLoading}
          metadataAccount={metadataAccountData}
          onHide={onHide}
          priceFunctionType={priceFunctionType}
          setIsLoading={setIsLoading}
        />
      );
    case PriceFunctionType.Linear:
      return (
        <ListEditionsLinearPrice
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
