import UsernameLink from "components/buttons/UsernameLink";
import ProfilePhotoCircle from "components/images/ProfilePhotoCircle";
import PostCommentLayout from "components/posts/PostCommentLayout";
import Body1 from "components/text/Body1";
import Body2 from "components/text/Body2";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import dayjs from "utils/dates/dayjsex";
import formatDayjsDateAsDateAtTime from "utils/dates/formatDayjsDateAsDateAtTime";

type Props = {
  comment: string;
  commenterInfo: {
    profilePhotoSrc: Maybe<string>;
    username: string;
  };
  timeCreated: dayjs.Dayjs;
};

export default function PostComment({
  comment,
  commenterInfo,
  timeCreated,
}: Props) {
  const { profilePhotoSrc, username } = commenterInfo;

  return (
    <PostCommentLayout
      comment={<Body1 colorClass={ColorClass.Primary}>{comment}</Body1>}
      profilePicCircle={
        <ProfilePhotoCircle src={profilePhotoSrc} username={username} />
      }
      timeCreated={
        <Body2 colorClass={ColorClass.Secondary}>
          {formatDayjsDateAsDateAtTime(timeCreated)}
        </Body2>
      }
      usernameLink={
        <UsernameLink
          buttonTheme={TextButtonTheme.Primary}
          fontClass={FontClass.Body1Medium}
          username={username}
        />
      }
    />
  );
}
