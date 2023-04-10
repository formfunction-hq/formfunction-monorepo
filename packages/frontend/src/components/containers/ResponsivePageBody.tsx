import PageBody, { PageBodyProps } from "components/containers/PageBody";

export default function ResponsivePageBody(props: PageBodyProps): JSX.Element {
  return (
    <PageBody {...props} hasHorizontalPadding>
      {props.children}
    </PageBody>
  );
}
