import graphql from "babel-plugin-relay/macro";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/pages/vote/SubmissionCard.module.css";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import joinClasses from "utils/joinClasses";
import SubmissionCardTwitterStatsTable from "components/pages/vote/SubmissionCardTwitterStatsTable";
import SubmissionCardReportCard from "components/pages/vote/SubmissionCardReportCard";
import { ManualApprovalSubmissionCard_ArtistSubmission$key } from "components/pages/vote/manual-approval/__generated__/ManualApprovalSubmissionCard_ArtistSubmission.graphql";
import SubmissionCard from "components/pages/vote/SubmissionCard";

const fragment = graphql`
  fragment ManualApprovalSubmissionCard_ArtistSubmission on ArtistSubmission {
    # eslint-disable-next-line relay/unused-fields
    id

    skipCount: Votes_aggregate(where: { voteType: { _eq: Skip } }) {
      aggregate {
        count
      }
    }

    skipCountCreators: Votes_aggregate(
      where: { voteType: { _eq: Skip }, User: { isWhitelisted: { _eq: true } } }
    ) {
      aggregate {
        count
      }
    }

    skipCountCollectors: Votes_aggregate(
      where: {
        voteType: { _eq: Skip }
        User: { isWhitelisted: { _eq: false }, isCollector2: { _eq: true } }
      }
    ) {
      aggregate {
        count
      }
    }

    upvoteCount: Votes_aggregate(where: { voteType: { _eq: Upvote } }) {
      aggregate {
        count
      }
    }

    upvoteCountCreators: Votes_aggregate(
      where: {
        voteType: { _eq: Upvote }
        User: { isWhitelisted: { _eq: true } }
      }
    ) {
      aggregate {
        count
      }
    }

    upvoteCountCollectors: Votes_aggregate(
      where: {
        voteType: { _eq: Upvote }
        User: { isWhitelisted: { _eq: false }, isCollector2: { _eq: true } }
      }
    ) {
      aggregate {
        count
      }
    }

    reportCount: Votes_aggregate(
      where: { voteType: { _eq: ReportSubmission } }
    ) {
      aggregate {
        count
      }
    }

    ...SubmissionCard_ArtistSubmission
    ...SubmissionCardReportCard_ArtistSubmission
    ...SubmissionCardTwitterStatsTable_ArtistSubmission
    ...SubmissionCardAssets_ArtistSubmission
  }
`;

type Props = {
  artistSubmission: ManualApprovalSubmissionCard_ArtistSubmission$key;
  buttons: JSX.Element;
  currentIndex: number;
  setIsReportModalShown?: (val: boolean) => void;
  totalCount: number;
};

export default function ManualApprovalSubmissionCard({
  artistSubmission,
  buttons,
  currentIndex,
  setIsReportModalShown,
  totalCount,
}: Props) {
  const artistSubmissionData = useFragment(fragment, artistSubmission);

  const skipCount = artistSubmissionData.skipCount.aggregate?.count ?? 0;
  const skipCountCreators =
    artistSubmissionData.skipCountCreators.aggregate?.count ?? 0;
  const skipCountCollectors =
    artistSubmissionData.skipCountCollectors.aggregate?.count ?? 0;

  const upvoteCount = artistSubmissionData.upvoteCount.aggregate?.count ?? 0;
  const upvoteCountCreators =
    artistSubmissionData.upvoteCountCreators.aggregate?.count ?? 0;
  const upvoteCountCollectors =
    artistSubmissionData.upvoteCountCollectors.aggregate?.count ?? 0;
  const reportCount = artistSubmissionData.reportCount.aggregate?.count ?? 0;

  const sumCountCreators = skipCountCreators + upvoteCountCreators;
  const sumCountCollectors = skipCountCollectors + upvoteCountCollectors;
  const sumCount = skipCount + upvoteCount;

  const voteCounts = (
    <div className={styles.tableContainer}>
      <TinyLabel
        colorClass={ColorClass.Secondary}
        textAlign="center"
        textTransform="uppercase"
      >
        Vote Counts
      </TinyLabel>
      <table
        className={joinClasses(
          styles.table,
          FontClass.Body1,
          ColorClass.Primary
        )}
      >
        <tr>
          <td />
          <th>Creators</th>
          <th>Collectors</th>
          <th>Total</th>
        </tr>
        <tr>
          <th>Upvote Count</th>
          <td>{upvoteCountCreators}</td>
          <td>{upvoteCountCollectors}</td>
          <td>{upvoteCount}</td>
        </tr>
        <tr>
          <th>Downvote Count</th>
          <td>{skipCountCreators}</td>
          <td>{skipCountCollectors}</td>
          <td>{skipCount}</td>
        </tr>
        <tr>
          <th>% Upvoted</th>
          <td>
            {sumCountCreators === 0
              ? "NaN"
              : ((upvoteCountCreators / sumCountCreators) * 100).toFixed(0)}
            %
          </td>
          <td>
            {sumCountCollectors === 0
              ? "NaN"
              : ((upvoteCountCollectors / sumCountCollectors) * 100).toFixed(0)}
            %
          </td>
          <td>
            {sumCount === 0
              ? "NaN"
              : ((upvoteCount / sumCount) * 100).toFixed(0)}
            %
          </td>
        </tr>
      </table>
    </div>
  );

  const extraContent = (
    <>
      {voteCounts}
      <SubmissionCardTwitterStatsTable
        artistSubmission={artistSubmissionData}
      />
      {reportCount > 0 && (
        <SubmissionCardReportCard artistSubmission={artistSubmissionData} />
      )}
    </>
  );

  return (
    <SubmissionCard
      artistSubmission={artistSubmissionData}
      buttons={buttons}
      currentIndex={currentIndex}
      extraContent={extraContent}
      setIsReportModalShown={setIsReportModalShown}
      showReverseImageSearchIcon
      totalCount={totalCount}
    />
  );
}
