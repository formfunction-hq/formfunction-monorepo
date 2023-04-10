import Header2 from "components/text/Header2";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";

type Props = {
  children: string;
  logoAsset?: MaybeUndef<JSX.Element>;
};

export default function CampaignHeroTitle({ children, logoAsset }: Props) {
  const colorScheme = useCampaignColorScheme();
  return logoAsset == null ? (
    <Header2
      colorClass={colorScheme.foreground.colorClass}
      style={{ maxWidth: 900 }}
      textAlign="center"
    >
      {children}
    </Header2>
  ) : (
    logoAsset
  );
}
