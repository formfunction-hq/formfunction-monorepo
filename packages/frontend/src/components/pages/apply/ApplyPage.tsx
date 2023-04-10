import styles from "css/pages/apply/ApplyPage.module.css";
import dayjs from "utils/dates/dayjsex";
import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import ApplyForm from "components/pages/apply/ApplyForm";
import ApplyHeader from "components/pages/apply/ApplyHeader";
import graphql from "babel-plugin-relay/macro";
import useSolanaContext from "hooks/useSolanaContext";
import { useLazyLoadQuery } from "react-relay";
import { ApplyPageQuery } from "components/pages/apply/__generated__/ApplyPageQuery.graphql";
import { Suspense, useState } from "react";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import getImgixUrl from "utils/getImgixUrl";
import Header2 from "components/text/Header2";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import { Dayjs } from "dayjs";
import useLogPageView from "hooks/useLogPageView";
import useSetPageTitle from "hooks/useSetPageTitle";
import getSafetyCheckReopenDate from "formfn-shared/dist/utils/safety-check/getSafetyCheckReopenDate";

const query = graphql`
  query ApplyPageQuery($id: String!) {
    User_by_pk(id: $id) {
      # eslint-disable-next-line relay/unused-fields
      id
      isWhitelisted

      ArtistSubmissions(order_by: { timeCreated: desc }) {
        # eslint-disable-next-line relay/unused-fields
        id
        status

        Votes(
          where: { voteType: { _in: [PrescreenReject, Reject] } }
          order_by: { timeCreated: desc }
          limit: 1
        ) {
          # eslint-disable-next-line relay/unused-fields
          id
          timeCreated
        }
      }

      ...ApplyForm_User
    }
  }
`;

function Rejected({ timeOfRejection }: { timeOfRejection: Dayjs }) {
  return (
    <div className={styles.submitted}>
      <Header2 colorClass={ColorClass.Primary} textAlign="center">
        Thanks for applying to Formfunction!
      </Header2>
      <Body1
        className={styles.rejectedDescription}
        colorClass={ColorClass.Secondary}
        textAlign="center"
      >
        Unfortunately, your application was not approved. We&apos;d love for you
        to apply again in the future with new work.
        <br />
        <br />
        This application form will re-open on{" "}
        {getSafetyCheckReopenDate(timeOfRejection).format("MMMM D, YYYY")}.
      </Body1>
      <img
        className={styles.submittedImage}
        src={getImgixUrl("illustrations/no-auctions-cropped.png")}
      />
    </div>
  );
}

function Submitted() {
  return (
    <div className={styles.submitted}>
      <Header2 colorClass={ColorClass.Primary} textAlign="center">
        Your application has been submitted!
      </Header2>
      <Body1
        colorClass={ColorClass.Primary}
        className={styles.submittedDescription}
      >
        You should hear back from us via email in 1 to 2 weeks.
      </Body1>
      <img
        className={styles.submittedImage}
        src={getImgixUrl("illustrations/no-auctions-cropped.png")}
      />
    </div>
  );
}

function Whitelisted() {
  return (
    <div className={styles.submitted}>
      <Header2 colorClass={ColorClass.Primary} textAlign="center">
        You are already a verified creator!
      </Header2>
      <img
        className={styles.submittedImage}
        src={getImgixUrl("illustrations/no-auctions-cropped.png")}
      />
    </div>
  );
}

function Form({ onSubmitted }: { onSubmitted: () => void }) {
  const { anchorWallet } = useSolanaContext();
  const data = useLazyLoadQuery<ApplyPageQuery>(query, {
    id: anchorWallet!.publicKey.toString(),
  });
  const artistSubmissionArr = data.User_by_pk?.ArtistSubmissions ?? [];
  const artistSubmission =
    artistSubmissionArr.length > 0 ? artistSubmissionArr[0] : null;

  if (data.User_by_pk?.isWhitelisted) {
    return <Whitelisted />;
  }

  if (artistSubmission != null && artistSubmission.status !== "Rejected") {
    return <Submitted />;
  }

  if (artistSubmission?.status === "Rejected") {
    const timeOfRejection = dayjs(artistSubmission.Votes[0].timeCreated);
    const reopenDate = getSafetyCheckReopenDate(timeOfRejection);

    if (dayjs().isBefore(reopenDate)) {
      return <Rejected timeOfRejection={timeOfRejection} />;
    }
  }

  return (
    <>
      <ApplyHeader />
      <div className={styles.form}>
        <ApplyForm onSubmitted={onSubmitted} user={data.User_by_pk!} />
      </div>
    </>
  );
}

export default function ApplyPage() {
  useLogPageView();
  useSetPageTitle("Apply");
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <DisconnectedPageContainer disconnectedMessage="Sign in with your wallet to apply to be a creator">
      <PageWithHeaderAndFooter>
        <ResponsivePageBody>
          {isSubmitted ? (
            <Submitted />
          ) : (
            <Suspense
              fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
            >
              <Form onSubmitted={() => setIsSubmitted(true)} />
            </Suspense>
          )}
        </ResponsivePageBody>
      </PageWithHeaderAndFooter>
    </DisconnectedPageContainer>
  );
}
