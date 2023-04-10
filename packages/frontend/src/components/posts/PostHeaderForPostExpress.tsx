import graphql from "babel-plugin-relay/macro";
import ArtistPillButtonForUserExpress from "components/buttons/ArtistPillButtonForUserExpress";
import PostHeaderLayout from "components/posts/PostHeaderLayout";
import PostVisibilitySection from "components/posts/PostVisibilitySection";
import { PostHeaderForPostExpress_PostExpress$key } from "components/posts/__generated__/PostHeaderForPostExpress_PostExpress.graphql";
import Body1 from "components/text/Body1";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import dayjs from "utils/dates/dayjsex";
import formatDayjsDateAsDateAtTime from "utils/dates/formatDayjsDateAsDateAtTime";

type Props = {
  post: PostHeaderForPostExpress_PostExpress$key;
};

const fragment = graphql`
  fragment PostHeaderForPostExpress_PostExpress on IPost {
    timeCreated

    creator {
      ...ArtistPillButtonForUserExpress_UserExpress
    }

    ...PostVisibilitySection_IPost
  }
`;

export default function PostHeaderForPostExpress({ post }: Props) {
  const postData = useFragment(fragment, post);
  const { timeCreated, creator } = postData;

  return (
    <PostHeaderLayout
      artistPillButton={<ArtistPillButtonForUserExpress user={creator} />}
      postVisibilitySection={<PostVisibilitySection post={postData} />}
      postTimeCreated={
        <Body1 colorClass={ColorClass.Secondary}>
          {formatDayjsDateAsDateAtTime(dayjs(timeCreated))}
        </Body1>
      }
    />
  );
}
