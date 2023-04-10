import PlainButton from "components/buttons/PlainButton";
import styles from "css/buttons/OverlayButton.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "link_external";
};

export default function OverlayButton({
  children,
  className,
  onClick,
  href,
  type = "button",
}: Props): JSX.Element {
  const classNameJoined = joinClasses(styles.button, className);
  if (type === "link_external") {
    return (
      <a
        className={classNameJoined}
        href={href ?? ""}
        onClick={onClick}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <PlainButton
      className={joinClasses(styles.button, className)}
      onClick={onClick}
    >
      {children}
    </PlainButton>
  );
}
