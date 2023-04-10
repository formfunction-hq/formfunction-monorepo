import { useMutation } from "react-relay";
import graphql from "babel-plugin-relay/macro";

import ButtonWithText from "components/buttons/ButtonWithText";
import { notify } from "components/toast/notifications";
import PlusIcon from "components/icons/PlusIcon";
import styles from "css/buttons/FollowButtonControlled.module.css";

import ColorValue from "types/enums/ColorValue";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { RecordProxy } from "relay-runtime";
import useUserContext from "hooks/useUserContext";
import { FollowButtonControlledFollowMutation } from "components/buttons/__generated__/FollowButtonControlledFollowMutation.graphql";
import { FollowButtonControlledUnfollowMutation } from "components/buttons/__generated__/FollowButtonControlledUnfollowMutation.graphql";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import CheckmarkSquareIcon from "components/icons/CheckmarkSquareIcon";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import NotifyErrorDescription from "types/enums/NotifyErrorDescription";

export type Props = {
  followCallback?: () => void;
  followedId: string;
  followedName: string | null;
  followerId: string;
  hideIcons?: boolean;
  isFollowed: boolean;
  unfollowCallback?: () => void;
};

const followMutation = graphql`
  mutation FollowButtonControlledFollowMutation(
    $object: UserFollows_insert_input!
  ) {
    insert_UserFollows_one(object: $object) {
      id
    }
  }
`;

const unfollowMutation = graphql`
  mutation FollowButtonControlledUnfollowMutation(
    $where: UserFollows_bool_exp!
  ) {
    delete_UserFollows(where: $where) {
      returning {
        id
      }
    }
  }
`;

function getFollowerOrFollowedCount(
  which: "Followers_aggregate" | "Followed_aggregate",
  userRecord: RecordProxy<unknown> | null | undefined
) {
  return userRecord
    ?.getLinkedRecord(which)
    ?.getLinkedRecord("aggregate")
    ?.getValue("count");
}

function setFollowerOrFollowedCount(
  which: "Followers_aggregate" | "Followed_aggregate",
  userRecord: RecordProxy<unknown> | null | undefined,
  value: number
) {
  userRecord
    ?.getLinkedRecord(which)
    ?.getLinkedRecord("aggregate")
    ?.setValue(value, "count");
}

const getFollowerCount = getFollowerOrFollowedCount.bind(
  null,
  "Followers_aggregate"
);
const getFollowedCount = getFollowerOrFollowedCount.bind(
  null,
  "Followed_aggregate"
);

const setFollowerCount = setFollowerOrFollowedCount.bind(
  null,
  "Followers_aggregate"
);
const setFollowedCount = setFollowerOrFollowedCount.bind(
  null,
  "Followed_aggregate"
);

export default function FollowButtonControlled({
  followCallback = emptyFunction,
  followedName,
  followedId,
  followerId,
  hideIcons = false,
  isFollowed,
  unfollowCallback = emptyFunction,
}: Props): Maybe<JSX.Element> {
  const { user: viewer } = useUserContext();
  const [commitFollow, followInFlight] =
    useMutation<FollowButtonControlledFollowMutation>(followMutation);
  const [commitUnfollow, unfollowInFlight] =
    useMutation<FollowButtonControlledUnfollowMutation>(unfollowMutation);

  const unfollow = () => {
    commitUnfollow({
      onError: () => {
        notifyUnexpectedError(
          NotifyErrorDescription.UnexpectedErrorPleaseRefresh
        );
      },
      updater: (store) => {
        const userRecordFollowed = store.get(followedId);
        const userRecordFollower = store.get(followerId);

        // Needed to make state of FollowButton change
        store.getRoot().setLinkedRecords([], "UserFollows", {
          where: {
            followedId: { _eq: followedId },
            followerId: { _eq: followerId },
          },
        });

        // Change number on followed account
        const followerCount = getFollowerCount(userRecordFollowed);
        if (followerCount != null) {
          setFollowerCount(userRecordFollowed, (followerCount as number) - 1);
        }

        // Change number on follower account
        const followedCount = getFollowedCount(userRecordFollower);
        if (followedCount != null) {
          setFollowedCount(userRecordFollower, (followedCount as number) - 1);
        }

        unfollowCallback();

        notify({
          description: `You'll no longer be notified when ${followedName} lists a new piece or one of their pieces goes on secondary sale`,
          duration: 6,
          message: `You unfollowed ${followedName}`,
          type: "info",
        });
      },
      variables: {
        where: {
          followedId: { _eq: followedId },
          followerId: { _eq: followerId },
        },
      },
    });
  };

  const follow = () => {
    commitFollow({
      onError: () => {
        notifyUnexpectedError(
          NotifyErrorDescription.UnexpectedErrorPleaseRefresh
        );
      },
      updater: (store, data) => {
        const userRecordFollowed = store.get(followedId);
        const userRecordFollower = store.get(followerId);

        // Needed to make state of FollowButton change
        const newRecord = store.get(data.insert_UserFollows_one!.id);
        store.getRoot().setLinkedRecords([newRecord!], "UserFollows", {
          where: {
            followedId: { _eq: followedId },
            followerId: { _eq: followerId },
          },
        });

        // Change number on followed account
        const followerCount = getFollowerCount(userRecordFollowed);
        if (followerCount != null) {
          setFollowerCount(userRecordFollowed, (followerCount as number) + 1);
        }

        // Change number on follower account
        const followedCount = getFollowedCount(userRecordFollower);
        if (followedCount != null) {
          setFollowedCount(userRecordFollower, (followedCount as number) + 1);
        }

        followCallback();

        notify({
          description: `You'll be notified via email when ${followedName} lists a new piece or one of their pieces goes on secondary sale`,
          duration: 6,
          message: `You followed ${followedName}!`,
          type: "info",
        });
      },
      variables: { object: { followedId, followerId } },
    });
  };

  if (followerId === followedId) {
    return null;
  }

  return (
    <ButtonWithText
      buttonTheme={
        isFollowed
          ? ButtonTheme.BrightPurpleOutlineWebsiteBackground
          : ButtonTheme.PurpleGradient
      }
      className={hideIcons ? styles.buttonHideIcons : styles.button}
      fontClass={FontClass.NavLink}
      type="button"
      isLoading={followInFlight || unfollowInFlight}
      onClick={() => {
        if (viewer == null) {
          notify({
            description: "You cannot follow people unless you are signed in",
            message: "Please sign in",
            type: "warning",
          });
          return;
        }

        if (isFollowed) {
          unfollow();
          return;
        }
        follow();
      }}
      icon={
        hideIcons ? undefined : isFollowed ? (
          <CheckmarkSquareIcon colorValue={ColorValue.BrightPurple} />
        ) : (
          <PlusIcon colorValue={ColorValue.White} />
        )
      }
      iconPosition="left"
    >
      {isFollowed ? "Following" : "Follow"}
    </ButtonWithText>
  );
}
