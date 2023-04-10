import graphql from "babel-plugin-relay/macro";
import Body1 from "components/text/Body1";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/pages/vote/SubmissionCard.module.css";
import dayjs from "utils/dates/dayjsex";
import { useEffect, useState } from "react";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import joinClasses from "utils/joinClasses";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import axios from "axios";
import { UserV2Result } from "twitter-api-v2";
import LoadingSpinner from "components/loading/LoadingSpinner";
import getRestUrl from "utils/env/getRestUrl";
import { SubmissionCardTwitterStatsTable_ArtistSubmission$key } from "components/pages/vote/__generated__/SubmissionCardTwitterStatsTable_ArtistSubmission.graphql";
import ColorValue from "types/enums/ColorValue";

const fragment = graphql`
  fragment SubmissionCardTwitterStatsTable_ArtistSubmission on ArtistSubmission {
    twitterName
  }
`;

type Props = {
  artistSubmission: SubmissionCardTwitterStatsTable_ArtistSubmission$key;
};

const FOLLOWER_COUNT_SUSPICIOUS_THRESHOLD = 100;
const FOLLOWING_COUNT_SUSPICIOUS_THRESHOLD = 10;
const TWEET_COUNT_SUSPICIOUS_THRESHOLD = 10;

type CountViewModel = Maybe<{ colorClass: ColorClass; count: number }>;

function getCountViewModel(
  count: Undef<number>,
  threshold: number
): CountViewModel {
  if (count == null) {
    return null;
  }

  return {
    colorClass: count < threshold ? ColorClass.Red : ColorClass.Primary,
    count,
  };
}

export default function SubmissionCard({ artistSubmission }: Props) {
  const artistSubmissionData = useFragment(fragment, artistSubmission);
  const [twitterStats, setTwitterStats] = useState<
    Maybe<{
      createdAt: dayjs.Dayjs;
      followerCount: CountViewModel;
      followingCount: CountViewModel;
      notFound: boolean;
      tweetCount: CountViewModel;
    }>
  >(null);

  useEffect(() => {
    async function run() {
      setTwitterStats(null);
      const twitterUsername = artistSubmissionData.twitterName;
      const {
        data: { user },
      } = await axios.get<{ user: UserV2Result }>(
        getRestUrl(`twitter/${twitterUsername}`)
      );
      if (user.errors != null && user.errors.length > 0) {
        setTwitterStats({
          createdAt: dayjs(),
          followerCount: null,
          followingCount: null,
          notFound: true,
          tweetCount: null,
        });
      }
      const {
        followers_count: followerCount,
        following_count: followingCount,
        tweet_count: tweetCount,
      } = user.data?.public_metrics ?? {};
      setTwitterStats({
        createdAt: dayjs(user.data.created_at),
        followerCount: getCountViewModel(
          followerCount,
          FOLLOWER_COUNT_SUSPICIOUS_THRESHOLD
        ),
        followingCount: getCountViewModel(
          followingCount,
          FOLLOWING_COUNT_SUSPICIOUS_THRESHOLD
        ),
        notFound: false,
        tweetCount: getCountViewModel(
          tweetCount,
          TWEET_COUNT_SUSPICIOUS_THRESHOLD
        ),
      });
    }

    run();
  }, [artistSubmissionData]);

  const twitterAccountAge =
    twitterStats == null ? null : dayjs().diff(twitterStats.createdAt, "day");

  return (
    <div className={styles.tableContainer}>
      <TinyLabel
        colorClass={ColorClass.Secondary}
        textAlign="center"
        textTransform="uppercase"
      >
        Twitter Stats
      </TinyLabel>
      {twitterStats == null && (
        <LoadingSpinner
          colorValue={ColorValue.BrightPurple}
          style={{ marginTop: "16px" }}
        />
      )}
      {twitterStats != null &&
        (twitterStats.notFound ? (
          <Body1 colorClass={null} className={styles.notFound}>
            Could not find user @{artistSubmissionData.twitterName}
          </Body1>
        ) : (
          <table
            className={joinClasses(
              styles.table,
              FontClass.Body1,
              ColorClass.Primary
            )}
          >
            <tr>
              <th># Followers</th>
              <th># Following</th>
              <th># Tweets</th>
              <th>Created</th>
            </tr>
            <tr>
              <td>
                <Body1 colorClass={twitterStats.followerCount!.colorClass}>
                  {twitterStats.followerCount!.count}
                </Body1>
              </td>
              <td>
                <Body1 colorClass={twitterStats.followingCount!.colorClass}>
                  {twitterStats.followingCount!.count}
                </Body1>
              </td>
              <td>
                <Body1 colorClass={twitterStats.tweetCount!.colorClass}>
                  {twitterStats.tweetCount!.count}
                </Body1>
              </td>
              <td>
                <Body1
                  colorClass={
                    twitterAccountAge! < 60
                      ? ColorClass.Red
                      : ColorClass.Primary
                  }
                >{`${twitterAccountAge} days ago`}</Body1>
              </td>
            </tr>
          </table>
        ))}
    </div>
  );
}
