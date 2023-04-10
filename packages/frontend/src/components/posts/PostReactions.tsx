import graphql from "babel-plugin-relay/macro";
import PlainButton from "components/buttons/PlainButton";
import HeartFilledIcon from "components/icons/HeartFilledIcon";
import HeartIcon from "components/icons/HeartIcon";
import FlexBox from "components/layout/FlexBox";
import { PostReactionsCreateReactionMutation } from "components/posts/__generated__/PostReactionsCreateReactionMutation.graphql";
import { PostReactionsDeleteReactionMutation } from "components/posts/__generated__/PostReactionsDeleteReactionMutation.graphql";
import Body1 from "components/text/Body1";
import notifyErrorMessageFromError from "components/toast/notifyErrorMessageFromError";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import pluralize from "formfn-shared/dist/utils/pluralize";
import useBreakpoint from "hooks/useBreakpoint";
import { useMutation } from "react-relay";
import { RecordSourceProxy } from "relay-runtime";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import ReactionTypeExpress_enum from "types/relay/ReactionTypeExpress_enum";
import logError from "utils/analytics/logError";

const createMutation = graphql`
  mutation PostReactionsCreateReactionMutation(
    $input: CreateReactionForPostInput!
  ) {
    ReactionMutations {
      createReactionForPost(input: $input) {
        type
      }
    }
  }
`;

const deleteMutation = graphql`
  mutation PostReactionsDeleteReactionMutation(
    $input: DeleteReactionForPostInput!
  ) {
    ReactionMutations {
      deleteReactionForPost(input: $input) {
        type
      }
    }
  }
`;

export type PostReactionInfo = {
  totalCount: number;
  viewerReactionType: Maybe<ReactionTypeExpress_enum>;
};

type Props = {
  postId: string;
  reactionInfo: PostReactionInfo;
};

function PostReactionIcon({
  postId,
  viewerReacted,
}: {
  postId: string;
  viewerReacted: boolean;
}) {
  const [createReaction, createReactionInFlight] =
    useMutation<PostReactionsCreateReactionMutation>(createMutation);
  const [deleteReaction, deleteReactionInFlight] =
    useMutation<PostReactionsDeleteReactionMutation>(deleteMutation);

  const reactionMutationUpdater =
    (create: boolean) => (store: RecordSourceProxy) => {
      const postObject = store.get(postId);
      const reactions = postObject?.getLinkedRecord("reactions");
      const reactionsTotalCount = reactions?.getValue("totalCount");
      if (reactions == null) {
        logError(
          AnalyticsEvent.RelayUpdaterError,
          "reactions was null in PostReactionIcon mutation updater when it shouldn't be",
          { postId, postObject, reactions }
        );
      }
      reactions?.setValue(
        create === true ? "Like" : null,
        "viewerReactionType"
      );
      reactions?.setValue(
        Number(reactionsTotalCount) + (create === true ? 1 : -1),
        "totalCount"
      );
    };

  return viewerReacted === true ? (
    <PlainButton
      disabled={createReactionInFlight}
      onClick={() => {
        deleteReaction({
          onCompleted: emptyFunction,
          onError: notifyErrorMessageFromError,
          optimisticUpdater: reactionMutationUpdater(false),
          updater: reactionMutationUpdater(false),
          variables: { input: { postId } },
        });
      }}
    >
      <FlexBox alignItems="center">
        <HeartFilledIcon colorValue={ColorValue.Red} size={20} />
      </FlexBox>
    </PlainButton>
  ) : (
    <PlainButton
      disabled={deleteReactionInFlight}
      onClick={() => {
        createReaction({
          onCompleted: emptyFunction,
          onError: notifyErrorMessageFromError,
          optimisticUpdater: reactionMutationUpdater(true),
          updater: reactionMutationUpdater(true),
          variables: { input: { postId, type: "Like" } },
        });
      }}
    >
      <FlexBox alignItems="center">
        <HeartIcon colorValue={ColorValue.Primary} size={20} />
      </FlexBox>
    </PlainButton>
  );
}

export default function PostReactions({
  postId,
  reactionInfo: { totalCount, viewerReactionType },
}: Props) {
  const { isMobileBreakpoint } = useBreakpoint();
  return (
    <FlexBox flexDirection="row" gap={8} alignItems="center">
      <PostReactionIcon
        postId={postId}
        viewerReacted={viewerReactionType != null}
      />
      <Body1 colorClass={ColorClass.Primary}>
        {totalCount}
        {isMobileBreakpoint ? "" : pluralize(" heart", totalCount)}
      </Body1>
    </FlexBox>
  );
}
