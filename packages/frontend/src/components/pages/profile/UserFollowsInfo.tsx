import graphql from "babel-plugin-relay/macro";
import PlainButton from "components/buttons/PlainButton";
import Divider from "components/misc/Divider";
import UserFollowsModal from "components/modal/UserFollowsModal";
import { UserFollowsInfo_User$key } from "components/pages/profile/__generated__/UserFollowsInfo_User.graphql";
import ArtName from "components/text/ArtName";
import Body1Medium from "components/text/Body1Medium";
import styles from "css/pages/profile/UserFollowsInfo.module.css";
import { useState } from "react";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";

const fragment = graphql`
  fragment UserFollowsInfo_User on User {
    id

    Followed_aggregate {
      aggregate {
        count
      }
    }

    Followers_aggregate {
      aggregate {
        count
      }
    }
  }
`;

type Props = {
  user: UserFollowsInfo_User$key;
};

function Section({ count, label }: { count: number; label: string }) {
  return (
    <div className={styles.section}>
      <ArtName colorClass={ColorClass.Primary}>{count}</ArtName>
      <Body1Medium colorClass={ColorClass.Secondary}>{label}</Body1Medium>
    </div>
  );
}

export default function UserFollowsInfo({ user }: Props) {
  const userData = useFragment(fragment, user);
  const [which, setWhich] = useState<"followers" | "following">("followers");
  const [isModalShown, setIsModalShown] = useState(false);

  const followerCount = userData.Followers_aggregate?.aggregate?.count ?? 0;
  const followingCount = userData.Followed_aggregate?.aggregate?.count ?? 0;

  if (followerCount === 0 && followingCount === 0) {
    return null;
  }

  const followersSection = <Section count={followerCount} label="followers" />;

  const followingSection = <Section count={followingCount} label="following" />;

  return (
    <>
      <UserFollowsModal
        followerCount={followerCount}
        followingCount={followingCount}
        isShown={isModalShown}
        onHide={() => setIsModalShown(false)}
        userId={userData.id}
        which={which}
      />
      <div className={styles.container}>
        <PlainButton
          onClick={() => {
            setWhich("followers");
            setIsModalShown(true);
          }}
        >
          {followersSection}
        </PlainButton>
        <Divider colorClass={ColorClass.Tertiary} direction="vertical" />
        <PlainButton
          onClick={() => {
            setWhich("following");
            setIsModalShown(true);
          }}
        >
          {followingSection}
        </PlainButton>
      </div>
    </>
  );
}
