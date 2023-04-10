import graphql from "babel-plugin-relay/macro";
import FlexBox from "components/layout/FlexBox";
import Body1 from "components/text/Body1";
import Body1Medium from "components/text/Body1Medium";
import styles from "css/posts/PollOptionForPollOptionExpress.module.css";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";
import { useFragment, useMutation } from "react-relay";
import { PollOptionForPollOptionExpress_PollOptionExpress$key } from "components/posts/__generated__/PollOptionForPollOptionExpress_PollOptionExpress.graphql";
import PlainButton from "components/buttons/PlainButton";
import { PollOptionForPollOptionExpressMutation } from "components/posts/__generated__/PollOptionForPollOptionExpressMutation.graphql";
import useColorModeContext from "hooks/useColorModeContext";
import notifyErrorMessageFromError from "components/toast/notifyErrorMessageFromError";
import { PollOptionForPollOptionExpress_PollExpress$key } from "components/posts/__generated__/PollOptionForPollOptionExpress_PollExpress.graphql";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { useEffect, useState } from "react";

const pollFragment = graphql`
  fragment PollOptionForPollOptionExpress_PollExpress on PollExpress {
    id
    totalResponses
    viewerRespondedToPoll
    isMultiSelect
  }
`;

const fragment = graphql`
  fragment PollOptionForPollOptionExpress_PollOptionExpress on PollOptionExpress {
    id
    text
    responseCount
    viewerRespondedToPollOption
  }
`;

const mutation = graphql`
  mutation PollOptionForPollOptionExpressMutation($input: RespondToPollInput!) {
    PostNamespace {
      respondToPoll(input: $input) {
        poll {
          id
          options {
            id
            ...PollOptionForPollOptionExpress_PollOptionExpress
          }
          totalResponses
          viewerRespondedToPoll
        }
      }
    }
  }
`;

type Props = {
  poll: PollOptionForPollOptionExpress_PollExpress$key;
  pollOption: PollOptionForPollOptionExpress_PollOptionExpress$key;
};

export default function PollOptionForPollOptionExpress({
  poll,
  pollOption,
}: Props) {
  const pollData = useFragment(pollFragment, poll);
  const pollOptionData = useFragment(fragment, pollOption);
  const [commit] =
    useMutation<PollOptionForPollOptionExpressMutation>(mutation);
  const { isDarkMode } = useColorModeContext();

  const {
    id: pollId,
    viewerRespondedToPoll,
    totalResponses,
    isMultiSelect,
  } = pollData;
  const {
    id: pollOptionId,
    text,
    responseCount,
    viewerRespondedToPollOption,
  } = pollOptionData;

  const [responsePercentage, setResponsePercentage] = useState(0);
  useEffect(() => {
    if (viewerRespondedToPoll) {
      setResponsePercentage(Math.floor((responseCount / totalResponses) * 100));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewerRespondedToPoll]);

  const showPurple =
    !viewerRespondedToPoll ||
    (viewerRespondedToPoll && viewerRespondedToPollOption === true);

  const purpleCssClass = isDarkMode
    ? styles.purpleDarkModeBorder
    : styles.purpleBorder;
  const greyCssClass = isDarkMode
    ? styles.greyDarkModeBorder
    : styles.greyBorder;

  const canRespondToPollOption =
    (isMultiSelect && !viewerRespondedToPollOption) ||
    (!isMultiSelect && !viewerRespondedToPoll);
  return (
    <PlainButton
      className={joinClasses(
        styles.container,
        showPurple ? purpleCssClass : greyCssClass
      )}
      // For higher specificity
      style={{ cursor: !canRespondToPollOption ? "default" : undefined }}
      onClick={() => {
        if (!canRespondToPollOption) {
          // Don't allow people to retract their poll selections for now
          return;
        }

        commit({
          onCompleted: emptyFunction,
          onError: (e) => {
            notifyErrorMessageFromError(e);
          },
          optimisticUpdater: (store) => {
            const pollRecord = store.get(pollId);
            const pollOptionRecord = store.get(pollOptionId);
            pollRecord?.setValue(true, "viewerRespondedToPoll");
            pollRecord?.setValue(totalResponses + 1, "totalResponses");
            pollOptionRecord?.setValue(true, "viewerRespondedToPollOption");
            pollOptionRecord?.setValue(responseCount + 1, "responseCount");
          },
          variables: {
            input: {
              pollOptionId,
              responseValue: true,
            },
          },
        });
      }}
    >
      <div
        id={pollOptionId}
        className={joinClasses(
          styles.progressBar,
          showPurple
            ? BackgroundColorClass.PurpleGradient
            : BackgroundColorClass.Primary
        )}
        style={{ width: `${responsePercentage}%` }}
      />
      <FlexBox alignItems="flex-start" gap={12}>
        {viewerRespondedToPoll && (
          <Body1Medium
            className={styles.votePercentage}
            textAlign="right"
            colorClass={
              showPurple ? ColorClass.BrightPurple : ColorClass.Primary
            }
          >
            {(responsePercentage ?? 0).toString()}%
          </Body1Medium>
        )}
        <Body1
          textAlign="left"
          colorClass={showPurple ? ColorClass.BrightPurple : ColorClass.Primary}
        >
          {text}
        </Body1>
      </FlexBox>
    </PlainButton>
  );
}
