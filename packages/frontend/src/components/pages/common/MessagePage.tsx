import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import Header3 from "components/text/Header3";
import ColorClass from "types/enums/ColorClass";

type Props = {
  children: any;
};

export default function MessagePage({ children }: Props): JSX.Element {
  return (
    <PageWithHeaderAndFooter>
      <ResponsivePageBody>
        <Header3 colorClass={ColorClass.Primary} textAlign="center">
          {children}
        </Header3>
      </ResponsivePageBody>
    </PageWithHeaderAndFooter>
  );
}
