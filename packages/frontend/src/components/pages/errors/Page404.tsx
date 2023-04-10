import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import Page404Content from "components/pages/errors/Page404Content";

type Props = {
  message?: string;
};

export default function Page404({ message }: Props) {
  return (
    <PageWithHeaderAndFooter>
      <ResponsivePageBody>
        <Page404Content message={message} />
      </ResponsivePageBody>
    </PageWithHeaderAndFooter>
  );
}
