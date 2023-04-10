import graphql from "babel-plugin-relay/macro";
import { NftTransactionTypeExpress_enum } from "types/relay/__generated__/NftTransactionTypeExpressEnum_NftTransactionExpress.graphql";

const _fragment = graphql`
  fragment NftTransactionTypeExpressEnum_NftTransactionExpress on NftTransactionExpress {
    # eslint-disable-next-line relay/unused-fields
    type
  }
`;

export default NftTransactionTypeExpress_enum;
