import { lazy, Suspense } from "react";
import { Options } from "react-markdown";
import joinClasses from "utils/joinClasses";
import styles from "css/markdown/ReactMarkdownLazy.module.css";

const ReactMarkdown = lazy(() => import("react-markdown"));

type Props = Options;

export default function ReactMarkdownLazy(props: Props) {
  return (
    <Suspense fallback={<div {...props} />}>
      <ReactMarkdown
        {...props}
        className={joinClasses(styles.markdown, props.className)}
      />
    </Suspense>
  );
}
