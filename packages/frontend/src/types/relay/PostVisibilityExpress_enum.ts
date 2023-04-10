import graphql from "babel-plugin-relay/macro";
import { PostVisibilityExpress_enum } from "types/relay/__generated__/PostVisibilityExpressEnum_IPost.graphql";

const _fragment = graphql`
  fragment PostVisibilityExpressEnum_IPost on IPost {
    # eslint-disable-next-line relay/unused-fields
    visibility
  }
`;

export default PostVisibilityExpress_enum;
