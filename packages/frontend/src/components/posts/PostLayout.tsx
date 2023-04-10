import FlexBox from "components/layout/FlexBox";
import Divider from "components/misc/Divider";
import styles from "css/posts/Post.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ColorClass from "types/enums/ColorClass";

type Props = {
  asset?: Maybe<JSX.Element>;
  body: Maybe<JSX.Element>;
  bottomLink?: Maybe<JSX.Element>;
  comments: Maybe<JSX.Element>;
  postCommentInput?: JSX.Element;
  postEngagementSection: JSX.Element;
  postHeader: JSX.Element;
  title: Maybe<JSX.Element>;
  topLink?: Maybe<JSX.Element>;
  topSection?: JSX.Element;
};

export default function PostLayout({
  asset,
  body,
  comments,
  topSection,
  topLink,
  bottomLink,
  postCommentInput,
  postEngagementSection,
  postHeader,
  title,
}: Props) {
  return (
    <FlexBox flexDirection="column" gap={32} className={styles.container}>
      {topSection != null ? (
        <>
          {topSection}
          <Divider colorClass={ColorClass.Tertiary} />
        </>
      ) : null}
      {postHeader}
      {(title != null || body != null || topLink != null) && (
        <FlexBox flexDirection="column" gap={16}>
          {title}
          {body}
          {topLink}
        </FlexBox>
      )}
      {asset != null ? (
        <div className={styles.assetContainer}>{asset}</div>
      ) : null}
      {bottomLink}
      <Divider colorClass={ColorClass.Tertiary} />
      {postEngagementSection}
      {comments}
      {postCommentInput}
    </FlexBox>
  );
}
