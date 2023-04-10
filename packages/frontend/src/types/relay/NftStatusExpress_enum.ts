import graphql from "babel-plugin-relay/macro";
import { NftStatusExpress_enum } from "types/relay/__generated__/NftStatusExpressEnum_NftExpress.graphql";

const _fragment = graphql`
  fragment NftStatusExpressEnum_NftExpress on NftExpress {
    # eslint-disable-next-line relay/unused-fields
    status
  }
`;

export default NftStatusExpress_enum;
