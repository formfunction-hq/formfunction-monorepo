import GenericModal from "components/modal/GenericModal";
import ArtName from "components/text/ArtName";
import Body1 from "components/text/Body1";
import styles from "css/modal/HowToVoteModal.module.css";
import ColorClass from "types/enums/ColorClass";

function Section({ children, title }: { children: any; title: string }) {
  return (
    <div className={styles.section}>
      <ArtName colorClass={ColorClass.Primary}>{title}</ArtName>
      <Body1 colorClass={ColorClass.Secondary}>{children}</Body1>
    </div>
  );
}

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function HowToVoteModal({
  isShown,
  onHide,
}: Props): JSX.Element {
  const body = (
    <div className={styles.sections}>
      <Body1 colorClass={ColorClass.Secondary} textAlign="center">
        Formfunction is community-governed, and our verified artists and
        collectors help us decide which new artists to onboard next.
      </Body1>
      <Section title="How to vote">
        You must be signed in to participate in voting. Applications are
        displayed one at a time to reduce bias and give every application equal
        visibility.
        <br /> When reviewing applications, please consider all aspects—the art,
        the provided social media links, and the artist statement.
      </Section>
      <Section title="How do artists hear back from Formfunction?">
        Accepted artists will receive an email letting them know that they can
        now mint pieces on Formfunction. Artists who are not accepted will
        receive an email encouraging to apply again in the future, with new
        work.
        <br />
        We will not disclose who voted for what.
      </Section>
    </div>
  );

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHide}
      title="How does voting work?"
    >
      {body}
    </GenericModal>
  );
}
