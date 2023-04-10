import ShadowButton from "components/buttons/ShadowButton";
import QuestionCircleIcon from "components/icons/QuestionCircleIcon";
import HowInvitesWorkModal from "components/modal/HowInvitesWorkModal";
import Body1 from "components/text/Body1";
import Body2 from "components/text/Body2";
import Header2 from "components/text/Header2";
import styles from "css/pages/invites/InvitesHeader.module.css";
import { useState } from "react";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

export default function InvitesHeader() {
  const [isHowInvitesWorkModalShown, setIsHowInvitesWorkModalShown] =
    useState(false);
  return (
    <>
      <HowInvitesWorkModal
        isShown={isHowInvitesWorkModalShown}
        onHide={() => setIsHowInvitesWorkModalShown(false)}
      />
      <div>
        <ShadowButton
          className={styles.button}
          onClick={() => setIsHowInvitesWorkModalShown(true)}
          type="button"
        >
          <QuestionCircleIcon colorValue={ColorValue.Primary} />
          <Body2 colorClass={ColorClass.Primary}>How invites work</Body2>
        </ShadowButton>
        <div className={styles.header}>
          <Header2 colorClass={ColorClass.Primary} textAlign="center">
            Invites
          </Header2>
          <Body1
            className={styles.description}
            colorClass={ColorClass.Secondary}
            textAlign="center"
          >
            Formfunction&apos;s community decides how it grows—in addition to
            our voting system, we are piloting an invite model that lets our
            most active artists and collectors invite new creators to mint on
            Formfunction.
          </Body1>
          <Body1
            className={styles.description}
            colorClass={ColorClass.Secondary}
            textAlign="center"
          >
            Enter the email of the person you want to invite, and they&apos;ll
            receive an invite to join Formfunction as an artist.
          </Body1>
        </div>
      </div>
    </>
  );
}
