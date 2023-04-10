import { useLazyLoadQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { FollowButtonFollowQuery } from "components/buttons/__generated__/FollowButtonFollowQuery.graphql";
import FollowButtonControlled from "components/buttons/FollowButtonControlled";

type Props = {
  followedId: string;
  followedName: string | null;
  followerId: string;
};

const query = graphql`
  query FollowButtonFollowQuery($followerId: String!, $followedId: String!) {
    UserFollows(
      where: {
        followedId: { _eq: $followedId }
        followerId: { _eq: $followerId }
      }
    ) {
      # eslint-disable-next-line relay/unused-fields
      id
    }
  }
`;

export default function FollowButton({
  followedName,
  followedId,
  followerId,
}: Props): JSX.Element {
  const { UserFollows } = useLazyLoadQuery<FollowButtonFollowQuery>(query, {
    followedId,
    followerId,
  });
  const isFollowed = UserFollows.some((el) => el !== null);

  return (
    <FollowButtonControlled
      followedName={followedName}
      followedId={followedId}
      followerId={followerId}
      isFollowed={isFollowed}
    />
  );
}
