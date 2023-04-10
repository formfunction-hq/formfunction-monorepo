import graphql from "babel-plugin-relay/macro";
import YouTubeVideo from "components/assets/YouTubeVideo";
import LinkWithIconForLink from "components/link/LinkWithIconForLink";
import { PostLink_IPost$key } from "components/posts/__generated__/PostLink_IPost.graphql";
import { useFragment } from "react-relay";
import isYouTubeUrl from "utils/you-tube/isYouTubeUrl";

type Props = {
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  post: PostLink_IPost$key;
};

const fragment = graphql`
  fragment PostLink_IPost on IPost {
    link {
      href

      ...LinkWithIconForLink_Link
    }
  }
`;

export default function PostLink({ icon, iconPosition, post }: Props) {
  const postData = useFragment(fragment, post);
  if (postData.link == null) {
    return null;
  }

  return isYouTubeUrl(postData.link.href) ? (
    <YouTubeVideo
      width="100%"
      height={400}
      youTubeUrl={postData.link.href}
      objectFit="cover"
    />
  ) : (
    <LinkWithIconForLink
      icon={icon}
      iconPosition={iconPosition}
      link={postData.link}
    />
  );
}
