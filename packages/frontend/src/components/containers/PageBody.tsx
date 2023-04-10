import ResponsiveContainer from "components/containers/ResponsiveContainer";
import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import styles from "css/containers/PageBody.module.css";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";

export type PageBodyProps = {
  children: any;
  className?: string;
  description?: JSX.Element | string;
  hasBottomPadding?: boolean;
  hasHorizontalPadding?: boolean;
  hasTopPadding?: boolean;
  header?: JSX.Element | string;
};

function HeaderAndDescription({
  description,
  header,
}: {
  description?: JSX.Element | string;
  header?: JSX.Element | string;
}) {
  if (header == null && description == null) {
    return null;
  }

  const headerElem =
    typeof header === "string" ? (
      <Header2 colorClass={ColorClass.Primary} textAlign="center">
        {header}
      </Header2>
    ) : (
      header
    );

  const descriptionElem =
    typeof description === "string" ? (
      <Body1 colorClass={ColorClass.Secondary} textAlign="center">
        {description}
      </Body1>
    ) : (
      description
    );

  return (
    <div className={styles.headerAndDescription}>
      {headerElem}
      {descriptionElem}
    </div>
  );
}

export default function PageBody({
  children,
  className,
  description,
  hasBottomPadding = true,
  hasHorizontalPadding = false,
  hasTopPadding = true,
  header,
}: PageBodyProps): JSX.Element {
  const classNameToUse = joinClasses(
    hasBottomPadding ? styles.bottom : null,
    hasTopPadding ? styles.top : null
  );

  if (hasHorizontalPadding) {
    return (
      <ResponsiveContainer className={classNameToUse}>
        <HeaderAndDescription description={description} header={header} />
        <div className={className}>{children}</div>
      </ResponsiveContainer>
    );
  }

  return (
    <div className={classNameToUse}>
      <HeaderAndDescription description={description} header={header} />
      <div className={className}>{children}</div>
    </div>
  );
}
