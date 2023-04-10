import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import GenericModal from "components/modal/GenericModal";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import styles from "css/pages/campaign/campaign-generic/CampaignIntroductionModal.module.css";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import Imgix from "react-imgix";
import getImgixUrl from "utils/getImgixUrl";
import FlexBox from "components/layout/FlexBox";
import CircleArrowButton from "components/buttons/CircleArrowButton";
import { useState } from "react";
import joinClasses from "utils/joinClasses";

const IMAGE_SRCS = [
  "campaigns/create/campaign-intro-calder2.jpg",
  "campaigns/create/campaign-intro-culturehacker2.jpg",
  "campaigns/create/campaign-intro-luke.jpg",
  "campaigns/create/campaign-intro-4.jpg",
  "campaigns/create/campaign-intro-5.jpg",
];

function Images() {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <FlexBox alignItems="center" flexDirection="row" gap={24}>
      <div className={styles.circleArrowButton}>
        <CircleArrowButton
          direction="left"
          disabled={imageIndex === 0}
          onClick={() => setImageIndex((val) => val - 1)}
        />
      </div>
      {/* Render this way instead of one at a time so that all the images load
      in parallel, which means navigating from one image to the next will be smoother */}
      {IMAGE_SRCS.map((src, index) => (
        <Imgix
          key={src}
          src={getImgixUrl(src)}
          className={joinClasses(
            styles.img,
            index === imageIndex ? null : styles.imgHidden
          )}
          width={1000}
        />
      ))}
      <div className={styles.circleArrowButton}>
        <CircleArrowButton
          direction="right"
          disabled={imageIndex === IMAGE_SRCS.length - 1}
          onClick={() => setImageIndex((val) => val + 1)}
        />
      </div>
    </FlexBox>
  );
}

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function CampaignIntroductionModal({
  isShown,
  onHide,
}: Props): Maybe<JSX.Element> {
  return (
    <GenericModal
      isShown={isShown}
      onHide={onHide}
      title="Introducing Campaigns"
    >
      <div className={styles.container}>
        <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
          Campaigns on Formfunction let you sell NFTs to fundraise for your
          dream creative project—whether you want to make a short film, raise
          funds for a good cause, create your own line of merch, or open a
          coffee shop for local artists.
        </Body1>
        <Images />
        <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
          Set a goal, write about why this project is important to you, and
          submit it for approval. We can&apos;t wait to see the creative
          projects you bring into the world through campaigns!
        </Body1>

        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          onClick={onHide}
        >
          Check it out
        </ButtonWithText>
      </div>
    </GenericModal>
  );
}
