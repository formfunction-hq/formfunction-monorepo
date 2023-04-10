import styles from "css/pages/vote/manual-approval/ManualApprovalPage.module.css";
import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import Page404 from "components/pages/errors/Page404";
import useSolanaContext from "hooks/useSolanaContext";
import Header2 from "components/text/Header2";
import ColorClass from "types/enums/ColorClass";
import Header3 from "components/text/Header3";
import Body1 from "components/text/Body1";
import graphql from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import useUserContext from "hooks/useUserContext";
import { Suspense, useState } from "react";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import { ManualApprovalPageQuery } from "components/pages/vote/manual-approval/__generated__/ManualApprovalPageQuery.graphql";
import ManualApprovalSubmissionCardButtons from "components/pages/vote/manual-approval/ManualApprovalSubmissionCardButtons";
import { useParams } from "react-router-dom";
import useArrowNav from "hooks/useArrowNav";
import ManualApprovalSubmissionCard from "components/pages/vote/manual-approval/ManualApprovalSubmissionCard";
import isEmployee from "utils/isEmployee";

const query = graphql`
  query ManualApprovalPageQuery(
    $where: ArtistSubmission_bool_exp!
    $twitterAccountTooNew: jsonb!
    $veryFewFollowers: jsonb!
    $artSamplesDoNotMatch: jsonb!
    $artistNotApplicant: jsonb!
    $otherReason: jsonb!
  ) {
    # Ideally, we would order by number of votes (descending), but that is super slow. timeCreated asc is a reasonable proxy.
    ArtistSubmission(limit: 50, where: $where, order_by: { timeCreated: asc }) {
      id

      ...ManualApprovalSubmissionCard_ArtistSubmission
      ...ManualApprovalSubmissionCardButtons_ArtistSubmission
    }
  }
`;

function ManualApprovalInfo() {
  return (
    <div className={styles.prescreenInfo}>
      <Header3
        colorClass={ColorClass.Primary}
        textAlign="center"
        textTransform="uppercase"
      >
        Manual Approval
      </Header3>
      <Body1
        className={styles.prescreenInfoDescription}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        This is manual approval, available to the team only. Each submission
        needs to receive manual approval from the team before the submission is
        accepted, in order to ensure that it meets Formfunction&apos;s community
        guidelines.
      </Body1>
    </div>
  );
}

function Content() {
  const { user } = useUserContext();
  const [index, setIndex] = useState(0);
  const params = useParams();
  const data = useLazyLoadQuery<ManualApprovalPageQuery>(query, {
    artSamplesDoNotMatch: "ArtSamplesDoNotMatch",
    artistNotApplicant: "ArtistNotApplicant",
    otherReason: "OtherReason",
    twitterAccountTooNew: "TwitterAccountTooNew",
    veryFewFollowers: "VeryFewFollowers",
    where: {
      id:
        params.submission == null
          ? undefined
          : {
              _eq: params.submission,
            },
      status: {
        _eq: "VoteActive",
      },
      userId: {
        _neq: user!.id,
      },
    },
  });

  // const filtered = data.ArtistSubmission.filter(
  //   (submission) =>
  //     (submission.Votes_aggregate.aggregate?.count ?? 0) >= VOTES_REQUIRED
  // );
  // Don't filter for now
  const filtered = data.ArtistSubmission;

  const onNext = () =>
    setIndex((curr) => (curr >= filtered.length ? curr : curr + 1));
  const onPrevious = () => setIndex((curr) => (curr > 0 ? curr - 1 : curr));
  useArrowNav(onNext, onPrevious);

  if (index >= filtered.length) {
    return (
      <Header3 colorClass={ColorClass.Primary} textAlign="center">
        Done! There are no more submissions to manually approve.
      </Header3>
    );
  }

  return (
    <ManualApprovalSubmissionCard
      artistSubmission={filtered[index]}
      buttons={
        <ManualApprovalSubmissionCardButtons
          artistSubmission={filtered[index]}
          onNext={onNext}
        />
      }
      currentIndex={index}
      totalCount={filtered.length}
    />
  );
}

export default function ManualApprovalPage() {
  const { anchorWallet } = useSolanaContext();

  if (anchorWallet != null && !isEmployee(anchorWallet.publicKey.toString())) {
    return <Page404 />;
  }

  return (
    <DisconnectedPageContainer>
      <PageWithHeaderAndFooter>
        <ResponsivePageBody>
          <div className={styles.body}>
            <Header2 colorClass={ColorClass.Primary} textAlign="center">
              Community Vote
            </Header2>
            <ManualApprovalInfo />
            <div className={styles.content}>
              <Suspense
                fallback={
                  <LoadingSpinner colorValue={ColorValue.BrightPurple} />
                }
              >
                <Content />
              </Suspense>
            </div>
          </div>
        </ResponsivePageBody>
      </PageWithHeaderAndFooter>
    </DisconnectedPageContainer>
  );
}
