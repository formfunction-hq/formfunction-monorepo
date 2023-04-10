import CreatorStory from "components/misc/CreatorStory";
import GenericModal from "components/modal/GenericModal";
import styles from "css/modal/CreatorStoryModal.module.css";
import ColorScheme from "types/ColorScheme";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

type Props = {
  colorScheme: ColorScheme;
  displayName?: MaybeUndef<string>;
  goals: string;
  headline: string;
  inspiration: string;
  isShown: boolean;
  onHide: () => void;
  process: string;
  profilePhotoSrc: Maybe<string>;
  username: string;
};

export default function CreatorStoryModal({
  colorScheme,
  displayName,
  goals,
  headline,
  inspiration,
  isShown,
  onHide,
  process,
  profilePhotoSrc,
  username,
}: Props): JSX.Element {
  const body = (
    <div className={styles.body}>
      <CreatorStory
        colorScheme={colorScheme}
        displayName={displayName}
        goals={goals}
        headline={headline}
        inspiration={inspiration}
        process={process}
        profilePhotoSrc={profilePhotoSrc}
        username={username}
      />
    </div>
  );

  return (
    <GenericModal className={styles.modal} isShown={isShown} onHide={onHide}>
      {body}
    </GenericModal>
  );
}
