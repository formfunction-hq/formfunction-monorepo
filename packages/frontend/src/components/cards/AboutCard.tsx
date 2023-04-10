import Divider from "components/misc/Divider";
import Body1 from "components/text/Body1";
import Header3 from "components/text/Header3";
import styles from "css/cards/AboutCard.module.css";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import ReactMarkdownLazy from "components/markdown/ReactMarkdownLazy";

type Props = {
  backgroundColorClass?: BackgroundColorClass;
  description: string | JSX.Element;
  editAboutButton?: JSX.Element;
  title: string;
};

export default function AboutCard({
  backgroundColorClass = BackgroundColorClass.Shader,
  description,
  editAboutButton,
  title,
}: Props): JSX.Element {
  return (
    <div className={joinClasses(styles.container, backgroundColorClass)}>
      <Header3 colorClass={ColorClass.Primary}>{title}</Header3>
      <Divider className={styles.divider} colorClass={ColorClass.Secondary} />
      <Body1 className={styles.description} colorClass={ColorClass.Primary}>
        {typeof description === "string" ? (
          <ReactMarkdownLazy className={styles.markdown}>
            {description}
          </ReactMarkdownLazy>
        ) : (
          description
        )}
      </Body1>
      {editAboutButton != null && editAboutButton}
    </div>
  );
}
