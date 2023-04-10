import PlainButton from "components/buttons/PlainButton";
import styles from "css/buttons/ShadowButton.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "link_external";
};

export default function ShadowButton({
  children,
  className,
  href,
  onClick,
  type = "button",
}: Props): JSX.Element {
  if (type === "button") {
    return (
      <PlainButton
        className={joinClasses(styles.button, className)}
        onClick={onClick}
        transparentBg={false}
      >
        {children}
      </PlainButton>
    );
  }

  return (
    <a
      href={href}
      className={joinClasses(styles.button, className)}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}
