import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import styles from "css/pages/apply/ApplyHeader.module.css";
import ColorClass from "types/enums/ColorClass";

export default function ApplyHeader() {
  return (
    <div className={styles.container}>
      <Header2 colorClass={ColorClass.Primary} textAlign="center">
        Submit artist profile
      </Header2>
      <Body1
        className={styles.description}
        colorClass={ColorClass.Secondary}
        textAlign="center"
      >
        Thank you for your interest in Formfunction! These applications help us
        keep Formfunction a trustworthy platform for high-quality 1/1 art.
        Formfunction is community-governed, and your submission here will be
        reviewed by artists and community members, who help us decide which
        applications to accept.
        <br />
        <br />
        The timeline to a decision may vary depending on the volume of
        submissions, but usually you will hear back from us within 2-3 weeks.
        All decisions will be communicated through email. Thank you for sharing
        your art with us!
      </Body1>
    </div>
  );
}
