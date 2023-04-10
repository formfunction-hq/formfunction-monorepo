import graphql from "babel-plugin-relay/macro";
import { PriceFunctionTypeExpress_enum } from "types/relay/__generated__/PriceFunctionTypeExpressEnum_NftExpress.graphql";

const _fragment = graphql`
  fragment PriceFunctionTypeExpressEnum_NftExpress on NftExpress {
    # eslint-disable-next-line relay/unused-fields
    editionPriceInfo {
      priceFunctionType
    }
  }
`;

export default PriceFunctionTypeExpress_enum;
