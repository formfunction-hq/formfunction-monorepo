import styles from "css/pages/vote/prescreen/PrescreenPage.module.css";
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
import { PrescreenPageQuery } from "components/pages/vote/prescreen/__generated__/PrescreenPageQuery.graphql";
import useUserContext from "hooks/useUserContext";
import { Suspense, useState } from "react";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import SubmissionCard from "components/pages/vote/SubmissionCard";
import PrescreenSubmissionCardButtons from "components/pages/vote/prescreen/PrescreenSubmissionCardButtons";
import useArrowNav from "hooks/useArrowNav";
import isEmployee from "utils/isEmployee";

const query = graphql`
  query PrescreenPageQuery($where: ArtistSubmission_bool_exp!) {
    ArtistSubmission(where: $where) {
      id

      ...SubmissionCard_ArtistSubmission
      ...PrescreenSubmissionCardButtons_ArtistSubmission
    }
  }
`;

function PrescreenInfo() {
  return (
    <div className={styles.prescreenInfo}>
      <Header3
        colorClass={ColorClass.Primary}
        textAlign="center"
        textTransform="uppercase"
      >
        PRE-SCREEN
      </Header3>
      <Body1
        className={styles.prescreenInfoDescription}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        This is pre-screening, available to the team only. These votes may
        exclude applications from being passed to artists for voting, if they
        break our community guidelines. Quality does not factor into
        pre-screening, only the community guidelines. Only one pre-screen vote
        per application is needed.
      </Body1>
    </div>
  );
}

function Content() {
  const { user } = useUserContext();
  const [index, setIndex] = useState(0);
  const data = useLazyLoadQuery<PrescreenPageQuery>(query, {
    where: {
      _not: {
        Votes: {
          userId: {
            _eq: user!.id,
          },
        },
      },
      _or: [
        {
          status: {
            _is_null: true,
          },
        },
        {
          status: {
            _eq: "Pending",
          },
        },
      ],
      userId: {
        _neq: user!.id,
      },
    },
  });

  const onNext = () =>
    setIndex((curr) =>
      curr >= data.ArtistSubmission.length ? curr : curr + 1
    );
  const onPrevious = () => setIndex((curr) => (curr > 0 ? curr - 1 : curr));
  useArrowNav(onNext, onPrevious);

  if (index >= data.ArtistSubmission.length) {
    return (
      <Header3 colorClass={ColorClass.Primary} textAlign="center">
        Done! There are no more submissions to vote on.
      </Header3>
    );
  }

  return (
    <SubmissionCard
      artistSubmission={data.ArtistSubmission[index]}
      buttons={
        <PrescreenSubmissionCardButtons
          artistSubmission={data.ArtistSubmission[index]}
          onNext={onNext}
        />
      }
      currentIndex={index}
      totalCount={data.ArtistSubmission.length}
    />
  );
}

export default function PrescreenPage() {
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
            <PrescreenInfo />
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
