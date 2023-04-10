import Subheader from "components/text/Subheader";
import ColorClass from "types/enums/ColorClass";

type Props = {
  children: string | JSX.Element | Array<string | JSX.Element>;
};

export default function CampaignHeroTagline({ children }: Props) {
  return (
    <Subheader
      colorClass={ColorClass.Primary}
      style={{ maxWidth: 992 }}
      textAlign="center"
    >
      {children}
    </Subheader>
  );
}
