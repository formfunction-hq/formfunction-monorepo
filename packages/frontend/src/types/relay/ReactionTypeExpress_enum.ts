import graphql from "babel-plugin-relay/macro";
import { ReactionTypeExpress_enum } from "types/relay/__generated__/ReactionTypeExpressEnum_IPost.graphql";

const _fragment = graphql`
  fragment ReactionTypeExpressEnum_IPost on IPost {
    # eslint-disable-next-line relay/unused-fields
    reactions {
      viewerReactionType
    }
  }
`;

export default ReactionTypeExpress_enum;
