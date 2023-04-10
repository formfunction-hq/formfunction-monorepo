import styles from "css/pages/about/AboutTitleAndContent.module.css";
import Header2 from "components/text/Header2";
import ColorClass from "types/enums/ColorClass";

type Props = {
  content: JSX.Element;
  title: string;
};

export default function AboutTitleAndContent({ content, title }: Props) {
  return (
    <div className={styles.container}>
      <Header2 colorClass={ColorClass.Primary} textAlign="center">
        {title}
      </Header2>
      {content}
    </div>
  );
}
