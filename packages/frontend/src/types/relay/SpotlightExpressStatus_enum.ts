/* eslint-disable relay/unused-fields */
import graphql from "babel-plugin-relay/macro";
import { SpotlightExpressStatus_enum } from "types/relay/__generated__/SpotlightExpressStatusEnum_SpotlightExpress.graphql";

const _fragment = graphql`
  fragment SpotlightExpressStatusEnum_SpotlightExpress on SpotlightExpress {
    spotlightInfo {
      status
    }
  }
`;

export default SpotlightExpressStatus_enum;
