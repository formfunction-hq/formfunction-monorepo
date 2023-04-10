import styles from "css/posts/PostBody.module.css";
import ReactMarkdownLazy from "components/markdown/ReactMarkdownLazy";
import Body1 from "components/text/Body1";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import ColorClass from "types/enums/ColorClass";

type Props = {
  children: Maybe<string>;
};

export default function PostBody({ children }: Props) {
  if (isEmptyString(children)) {
    return null;
  }
  return (
    <Body1 className={styles.body} colorClass={ColorClass.Primary}>
      <ReactMarkdownLazy>{children!}</ReactMarkdownLazy>
    </Body1>
  );
}
