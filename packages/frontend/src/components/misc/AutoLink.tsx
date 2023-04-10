import { Link } from "react-router-dom";
import isInternalLink from "utils/isInternalLink";

function getUrlPath(url: string) {
  try {
    return new URL(url).pathname;
  } catch {
    // Assume URL is already a path.
    return url;
  }
}

type Props = {
  children: any;
  url: string;
};

// Use Link if the link is internal, otherwise open up a new tab.
export default function AutoLink({ children, url }: Props) {
  const styles = { display: "block", overflow: "hidden" };
  if (isInternalLink(url)) {
    return (
      <Link style={styles} to={getUrlPath(url)}>
        {children}
      </Link>
    );
  }

  return (
    <a style={styles} target="_blank" href={url} rel="noreferrer">
      {children}
    </a>
  );
}
