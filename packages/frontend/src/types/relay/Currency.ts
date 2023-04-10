import graphql from "babel-plugin-relay/macro";
import { CurrencyNameExpress_enum } from "types/relay/__generated__/Currency_Price.graphql";

const _fragment = graphql`
  fragment Currency_Price on Price {
    # eslint-disable-next-line relay/unused-fields
    currencyInfo {
      name
    }
  }
`;

export default CurrencyNameExpress_enum;
