import { lazy, Suspense } from "react";
import styles from "css/pages/campaign/basic-info/EmojiInput.module.css";
import joinClasses from "utils/joinClasses";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import inputStyles from "css/input/InputStyles.module.css";
import PlainButton from "components/buttons/PlainButton";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

type EmojiClickData = {
  emoji: string;
};

type Props = {
  emoji: string;
  hasError?: boolean;
  isPickerShown: boolean;
  onEmojiClick: () => void;
  onSetEmoji: (emoji: string) => void;
};

export default function EmojiInput({
  emoji,
  hasError,
  isPickerShown,
  onEmojiClick,
  onSetEmoji,
}: Props) {
  return (
    <div>
      {emoji !== "" && (
        <PlainButton
          className={joinClasses(
            styles.emojiContainer,
            BackgroundColorClass.LightPurpleGradient
          )}
          type="button"
          onClick={onEmojiClick}
        >
          {emoji}
        </PlainButton>
      )}
      {isPickerShown && (
        <Suspense
          fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
        >
          <div
            className={joinClasses(
              styles.emojiPickerContainer,
              hasError ? inputStyles.textInputError : null
            )}
          >
            <EmojiPicker
              autoFocusSearch={false}
              onEmojiClick={(emojiData: EmojiClickData) => {
                onSetEmoji(emojiData.emoji);
              }}
              width="100%"
              previewConfig={{ showPreview: false }}
            />
          </div>
        </Suspense>
      )}
    </div>
  );
}
