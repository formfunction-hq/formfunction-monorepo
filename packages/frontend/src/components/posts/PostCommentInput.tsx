import TextInput from "components/input/TextInput";
import FlexBox from "components/layout/FlexBox";
import { useState } from "react";
import styles from "css/posts/PostCommentInput.module.css";
import ColorValue from "types/enums/ColorValue";
import graphql from "babel-plugin-relay/macro";
import { PostCommentInputMutation } from "components/posts/__generated__/PostCommentInputMutation.graphql";
import { useMutation } from "react-relay";
import PlainButton from "components/buttons/PlainButton";
import LoadingSpinner from "components/loading/LoadingSpinner";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import logError from "utils/analytics/logError";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import PaperAirplaneIcon from "components/icons/PaperAirplaneIcon";
import notifyErrorMessageFromError from "components/toast/notifyErrorMessageFromError";

type Props = {
  onCompleted?: () => void;
  postId: string;
};

const mutation = graphql`
  mutation PostCommentInputMutation(
    $connections: [ID!]!
    $input: CreateCommentForPostInput!
  ) {
    CommentMutations {
      createCommentForPost(input: $input) {
        comment
          @appendNode(connections: $connections, edgeTypeName: "CommentsEdge") {
          id
          ...PostCommentForCommentExpress_CommentExpress
        }
      }
    }
  }
`;

function PostCommentInputButton({
  onSubmit,
  inFlight,
}: {
  inFlight: boolean;
  onSubmit: () => void;
}) {
  return !inFlight ? (
    <PlainButton
      onClick={onSubmit}
      disabled={inFlight}
      className={styles.submitButton}
    >
      <PaperAirplaneIcon colorValue={ColorValue.Primary} />
    </PlainButton>
  ) : (
    <LoadingSpinner size={24} colorValue={ColorValue.Secondary} />
  );
}

export default function PostCommentInput({ onCompleted, postId }: Props) {
  const [comment, setComment] = useState("");
  const [commit, inFlight] = useMutation<PostCommentInputMutation>(mutation);
  const {
    PostComments: { getConnectionId },
  } = useRelayConnectionIdsContext();
  const onSubmit = () => {
    commit({
      onCompleted: () => {
        setComment("");
        if (onCompleted != null) {
          onCompleted();
        }
      },
      onError: notifyErrorMessageFromError,
      updater: (store, data) => {
        const postStore = store.get(postId);

        const postComments = postStore?.getLinkedRecord("comments");
        const postCommentsTotalCount = postComments?.getValue("totalCount");
        const postPreviewComments =
          postComments?.getLinkedRecords("previewComments");
        const newRecord = store.get(
          data.CommentMutations.createCommentForPost.comment.id
        );
        if (postComments == null) {
          logError(
            AnalyticsEvent.RelayUpdaterError,
            "postComments was null in PostCommentInput mutation updater when it shouldn't be",
            { postComments, postId, postPreviewComments, postStore }
          );
        }
        postComments?.setLinkedRecords(
          [
            ...(postPreviewComments ?? []),
            ...(newRecord != null ? [newRecord] : []),
          ],
          "previewComments"
        );
        postComments?.setValue(
          Number(postCommentsTotalCount) + 1,
          "totalCount"
        );
      },
      variables: {
        connections: [getConnectionId(postId) ?? ""],
        input: {
          comment,
          postId,
        },
      },
    });
  };

  return (
    <FlexBox flexDirection="row" gap={8} alignItems="center">
      <TextInput
        className={inFlight ? styles.loading : undefined}
        disabled={inFlight}
        onChange={setComment}
        onPressEnter={onSubmit}
        placeholder="Add a comment..."
        value={comment}
        buttonInner={
          comment.length > 0 ? (
            <PostCommentInputButton onSubmit={onSubmit} inFlight={inFlight} />
          ) : undefined
        }
      />
    </FlexBox>
  );
}
