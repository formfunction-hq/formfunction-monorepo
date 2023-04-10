import graphql from "babel-plugin-relay/macro";
import FollowButtonControlled, {
  Props as FollowButtonProps,
} from "components/buttons/FollowButtonControlled";
import ProfilePhotoCircle from "components/images/ProfilePhotoCircle";
import LoadingSpinner from "components/loading/LoadingSpinner";
import GenericModal from "components/modal/GenericModal";
import { UserFollowsModalQuery } from "components/modal/__generated__/UserFollowsModalQuery.graphql";
import Body1Medium from "components/text/Body1Medium";
import styles from "css/modal/UserFollowsModal.module.css";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import useUserContext from "hooks/useUserContext";
import { Suspense, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { Link } from "react-router-dom";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

const query = graphql`
  query UserFollowsModalQuery($userId: String!, $viewerId: String!) {
    User_by_pk(id: $userId) {
      id

      Followed {
        id
        Followed {
          id
          username

          ProfilePhoto {
            photoUrl
          }

          Followers(where: { followerId: { _eq: $viewerId } }) {
            id
          }
        }
      }

      Followers {
        id
        Follower {
          id
          username

          ProfilePhoto {
            photoUrl
          }

          Followers(where: { followerId: { _eq: $viewerId } }) {
            id
          }
        }
      }
    }
  }
`;

function Row({
  followButtonProps,
  onHide,
  profilePhotoUrl,
  username,
}: {
  followButtonProps: FollowButtonProps;
  onHide: () => void;
  profilePhotoUrl: string;
  username: string;
}) {
  const [isFollowed, setIsFollowed] = useState(followButtonProps.isFollowed);

  return (
    <div className={styles.row}>
      <Link
        className={styles.rowUser}
        onClick={onHide}
        to={getUserProfileLinkRelative(username)}
      >
        <ProfilePhotoCircle src={profilePhotoUrl} />
        <Body1Medium colorClass={ColorClass.Primary}>@{username}</Body1Medium>
      </Link>
      <FollowButtonControlled
        {...{ ...followButtonProps, isFollowed }}
        followCallback={() => setIsFollowed(true)}
        unfollowCallback={() => setIsFollowed(false)}
      />
    </div>
  );
}

type Props = {
  followerCount: number;
  followingCount: number;
  isShown: boolean;
  onHide: () => void;
  userId: string;
  which: "followers" | "following";
};

function Inner({
  followerCount,
  followingCount,
  isShown,
  onHide,
  userId,
  which,
}: Props) {
  const { user: viewer } = useUserContext();
  const data = useLazyLoadQuery<UserFollowsModalQuery>(
    query,
    {
      userId,
      viewerId: viewer?.id ?? "",
    },
    {
      fetchKey: Number(isShown),
      fetchPolicy: "network-only",
    }
  );
  const followersData = data.User_by_pk!.Followers;
  const followingData = data.User_by_pk!.Followed;

  const followers =
    followersData.length > 0 ? (
      <div className={styles.rows}>
        {followersData.map((follower) => (
          <Row
            key={follower.id}
            followButtonProps={{
              followedId: follower.Follower.id,
              followedName: follower.Follower.username,
              followerId: viewer?.id ?? "",
              hideIcons: true,
              isFollowed: follower.Follower.Followers.length > 0,
            }}
            onHide={onHide}
            profilePhotoUrl={follower.Follower.ProfilePhoto?.photoUrl ?? ""}
            username={follower.Follower.username}
          />
        ))}
      </div>
    ) : null;

  const following =
    followingData.length > 0 ? (
      <div className={styles.rows}>
        {followingData.map((followed) => (
          <Row
            key={followed.id}
            followButtonProps={{
              followedId: followed.Followed.id,
              followedName: followed.Followed.username,
              followerId: viewer?.id ?? "",
              hideIcons: true,
              isFollowed: followed.Followed.Followers.length > 0,
            }}
            onHide={onHide}
            profilePhotoUrl={followed.Followed.ProfilePhoto?.photoUrl ?? ""}
            username={followed.Followed.username}
          />
        ))}
      </div>
    ) : null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Body1Medium colorClass={ColorClass.Primary}>
          {which === "followers" ? "Followers" : "Following"}
        </Body1Medium>
        <Body1Medium colorClass={ColorClass.Secondary}>
          {which === "followers" ? followerCount : followingCount}
        </Body1Medium>
      </div>
      {which === "followers" ? followers : following}
    </div>
  );
}

export default function UserFollowsModal({
  followerCount,
  followingCount,
  isShown,
  onHide,
  userId,
  which,
}: Props): JSX.Element {
  const fallback = <LoadingSpinner colorValue={ColorValue.BrightPurple} />;

  return (
    <GenericModal isShown={isShown} onHide={onHide}>
      <Suspense fallback={fallback}>
        <Inner
          followerCount={followerCount}
          followingCount={followingCount}
          isShown={isShown}
          onHide={onHide}
          userId={userId}
          which={which}
        />
      </Suspense>
    </GenericModal>
  );
}
