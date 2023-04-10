import graphql from "babel-plugin-relay/macro";
import FlagIcon from "components/icons/FlagIcon";
import Body1 from "components/text/Body1";
import styles from "css/pages/vote/SubmissionCardReportCard.module.css";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import Body1Bold from "components/text/Body1Bold";
import {
  TWITTER_ACCOUNT_TOO_NEW,
  VERY_FEW_FOLLOWERS,
  ART_SAMPLES_DO_NOT_MATCH,
  ARTIST_NOT_APPLICANT,
  OTHER_REASON_PREFIX,
} from "constants/ArtistSubmissionReportLabels";
import { SubmissionCardReportCard_ArtistSubmission$key } from "components/pages/vote/__generated__/SubmissionCardReportCard_ArtistSubmission.graphql";

const fragment = graphql`
  fragment SubmissionCardReportCard_ArtistSubmission on ArtistSubmission {
    id

    reportCountTwitterAccountTooNew: Votes_aggregate(
      where: {
        _and: [
          { voteType: { _eq: ReportSubmission } }
          { reportReasons: { _contains: $twitterAccountTooNew } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }

    reportCountVeryFewFollowers: Votes_aggregate(
      where: {
        _and: [
          { voteType: { _eq: ReportSubmission } }
          { reportReasons: { _contains: $veryFewFollowers } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }

    reportCountArtSamplesDoNotMatch: Votes_aggregate(
      where: {
        _and: [
          { voteType: { _eq: ReportSubmission } }
          { reportReasons: { _contains: $artSamplesDoNotMatch } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }

    reportCountArtistNotApplicant: Votes_aggregate(
      where: {
        _and: [
          { voteType: { _eq: ReportSubmission } }
          { reportReasons: { _contains: $artistNotApplicant } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }

    reportsWithOtherReason: Votes(
      where: {
        _and: [
          { voteType: { _eq: ReportSubmission } }
          { reportReasons: { _contains: $otherReason } }
        ]
      }
    ) {
      id
      reportReasons
    }
  }
`;

type Props = {
  artistSubmission: SubmissionCardReportCard_ArtistSubmission$key;
};

export default function SubmissionCardReportCard({ artistSubmission }: Props) {
  const artistSubmissionData = useFragment(fragment, artistSubmission);

  const reportCounts = [
    {
      count:
        artistSubmissionData.reportCountTwitterAccountTooNew.aggregate?.count ??
        0,
      label: TWITTER_ACCOUNT_TOO_NEW,
    },
    {
      count:
        artistSubmissionData.reportCountVeryFewFollowers.aggregate?.count ?? 0,
      label: VERY_FEW_FOLLOWERS,
    },
    {
      count:
        artistSubmissionData.reportCountArtSamplesDoNotMatch.aggregate?.count ??
        0,
      label: ART_SAMPLES_DO_NOT_MATCH,
    },
    {
      count:
        artistSubmissionData.reportCountArtistNotApplicant.aggregate?.count ??
        0,
      label: ARTIST_NOT_APPLICANT,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.header}>
          <FlagIcon colorValue={ColorValue.Red} />
          <Body1Bold colorClass={ColorClass.Red}>Voter reports</Body1Bold>
        </div>
        <ul className={styles.list}>
          {reportCounts
            .filter((item) => item.count > 0)
            .map((item) => (
              <li key={item.label}>
                <Body1
                  colorClass={ColorClass.Red}
                  display="inline"
                >{`(${item.count}) ${item.label}`}</Body1>
              </li>
            ))}
          {artistSubmissionData.reportsWithOtherReason != null &&
            artistSubmissionData.reportsWithOtherReason.map((item) => (
              <li key={String(item.id)}>
                <Body1 colorClass={ColorClass.Red} display="inline">
                  {
                    (item.reportReasons as Array<string>).find((reason) =>
                      reason.includes(`${OTHER_REASON_PREFIX}:`)
                    )!
                  }
                </Body1>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
