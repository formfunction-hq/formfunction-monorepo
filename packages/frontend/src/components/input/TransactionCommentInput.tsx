import TextArea from "components/input/TextArea";
import TextButton from "components/buttons/TextButton";
import ChevronRightIcon from "components/icons/ChevronRightIcon";
import Body2 from "components/text/Body2";
import styles from "css/input/TransactionCommentInput.module.css";
import { useState } from "react";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import ChevronDownIcon from "components/icons/ChevronDownIcon";

export type Props = {
  buttonText: string;
  comment: string;
  setComment: (val: string) => void;
};

export default function TransactionCommentInput({
  buttonText,
  comment,
  setComment,
}: Props) {
  const [isCommentInputShown, setIsCommentInputShown] = useState(false);
  const commentInput = (
    <div className={styles.commentInput}>
      <Body2 colorClass={ColorClass.Primary}>
        This will be visible to everyone.
      </Body2>
      <div className={styles.commentTextArea}>
        <TextArea
          value={comment}
          onChange={setComment}
          maxLength={100}
          placeholder="Add a comment"
        />
      </div>
    </div>
  );

  return (
    <div className={styles.comment}>
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Primary}
        className={styles.button}
        fontClass={FontClass.Body1Medium}
        icon={
          isCommentInputShown ? (
            <ChevronDownIcon colorValue={ColorValue.Secondary} size={24} />
          ) : (
            <ChevronRightIcon colorValue={ColorValue.Secondary} />
          )
        }
        iconPosition="right"
        onClick={() => setIsCommentInputShown((curr) => !curr)}
      >
        {buttonText}
      </TextButton>
      {isCommentInputShown && commentInput}
    </div>
  );
}
