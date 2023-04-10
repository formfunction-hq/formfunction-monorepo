import styles from "css/pages/vote/VotePage.module.css";
import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import Page404 from "components/pages/errors/Page404";
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
import { VotePageQuery } from "components/pages/vote/__generated__/VotePageQuery.graphql";
import SubmissionCard from "components/pages/vote/SubmissionCard";
import SubmissionCardButtons from "components/pages/vote/SubmissionCardButtons";
import ShadowButton from "components/buttons/ShadowButton";
import Body2 from "components/text/Body2";
import QuestionCircleIcon from "components/icons/QuestionCircleIcon";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import HowToVoteModal from "components/modal/HowToVoteModal";
import useArrowNav from "hooks/useArrowNav";
import useFlagsTyped from "hooks/useFlagsTyped";
import useLogPageView from "hooks/useLogPageView";
import useSetPageTitle from "hooks/useSetPageTitle";
import ReportArtistSubmissionModal from "components/modal/ReportArtistSubmissionModal";
import isEmployee from "utils/isEmployee";

const query = graphql`
  query VotePageQuery($where: ArtistSubmission_bool_exp!) {
    ArtistSubmission(where: $where, order_by: { timeCreated: asc }) {
      id

      Votes_aggregate(where: { voteType: { _in: [Skip, Upvote] } }) {
        aggregate {
          count
        }
      }

      ...SubmissionCard_ArtistSubmission
      ...SubmissionCardButtons_ArtistSubmission
      ...ReportArtistSubmissionModal_ArtistSubmission
    }
  }
`;

function Content() {
  const flags = useFlagsTyped();
  const { user } = useUserContext();
  const [index, setIndex] = useState(0);
  const [isReportModalShown, setIsReportModalShown] = useState(false);
  const data = useLazyLoadQuery<VotePageQuery>(
    query,
    {
      where: {
        _not: {
          Votes: {
            userId: {
              _eq: user!.id,
            },
            voteType: {
              _neq: "PrescreenApprove",
            },
          },
        },
        status: {
          _eq: "VoteActive",
        },
        userId: {
          _neq: user!.id,
        },
      },
    },
    {
      fetchPolicy: "network-only",
    }
  );

  const filtered = data.ArtistSubmission.filter(
    (submission) =>
      (submission.Votes_aggregate.aggregate?.count ?? 0) <
      (flags.numVotesRequired ?? 40)
  );

  const onNext = () =>
    setIndex((curr) => (curr >= filtered.length ? curr : curr + 1));
  const onPrevious = () => setIndex((curr) => (curr > 0 ? curr - 1 : curr));
  useArrowNav(
    onNext,
    onPrevious,
    !isEmployee(user?.id ?? "") || isReportModalShown
  );

  if (index >= filtered.length) {
    return (
      <Header3 colorClass={ColorClass.Primary} textAlign="center">
        Done! There are no more submissions to vote on.
      </Header3>
    );
  }

  return (
    <>
      <ReportArtistSubmissionModal
        isShown={isReportModalShown}
        artistSubmission={filtered[index]}
        onHide={() => setIsReportModalShown(false)}
        onSuccess={onNext}
      />
      <SubmissionCard
        artistSubmission={filtered[index]}
        buttons={
          <SubmissionCardButtons
            artistSubmission={filtered[index]}
            onNext={onNext}
          />
        }
        currentIndex={index}
        setIsReportModalShown={setIsReportModalShown}
        totalCount={filtered.length}
      />
    </>
  );
}

export default function VotePage() {
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const [isHowToVoteModalShown, setIsHowToVoteModalShown] = useState(false);
  const { user } = useUserContext();
  useLogPageView();
  useSetPageTitle("Vote");

  if (user != null && !user.isWhitelisted && !user.isCollector) {
    return <Page404 />;
  }

  if (
    !user?.isWhitelisted &&
    !user?.isCollector &&
    !isEmployee(user?.id ?? "")
  ) {
    return <Page404 />;
  }

  const shadowButton = (
    <ShadowButton
      className={styles.shadowButton}
      onClick={() => setIsHowToVoteModalShown(true)}
      type="button"
    >
      <QuestionCircleIcon colorValue={ColorValue.Primary} />
      <Body2 colorClass={ColorClass.Primary}>How to vote</Body2>
    </ShadowButton>
  );

  return (
    <DisconnectedPageContainer>
      <PageWithHeaderAndFooter>
        <ResponsivePageBody>
          <HowToVoteModal
            isShown={isHowToVoteModalShown}
            onHide={() => setIsHowToVoteModalShown(false)}
          />
          <div className={styles.body}>
            <div className={styles.header}>
              <div
                style={{ visibility: isBottomTabsWidth ? "hidden" : "visible" }}
              >
                {shadowButton}
              </div>
              <Header2 colorClass={ColorClass.Primary} textAlign="center">
                Community Vote
              </Header2>
              <div style={{ visibility: "hidden" }}>{shadowButton}</div>
            </div>
            <div
              style={
                isBottomTabsWidth
                  ? {
                      alignSelf: "center",
                      marginTop: 24,
                      visibility: "visible",
                    }
                  : { display: "none" }
              }
            >
              {shadowButton}
            </div>
            <Body1
              className={styles.description}
              colorClass={ColorClass.Secondary}
              textAlign="center"
            >
              Formfunction is community-governed, and every week our community
              of artists and collectors helps us decide which applications to
              accept. Please consider all aspects of the application when
              deciding whether to upvote.
            </Body1>
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
