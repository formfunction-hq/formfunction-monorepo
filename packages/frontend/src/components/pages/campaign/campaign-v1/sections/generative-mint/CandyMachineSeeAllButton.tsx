import graphql from "babel-plugin-relay/macro";
import useCandyMachineMintPhase from "hooks/candy-machine/useCandyMachineMintPhase";
import { useFragment } from "react-relay";
import { CandyMachineSeeAllButton_CandyMachineExpress$key } from "components/pages/campaign/campaign-v1/sections/generative-mint/__generated__/CandyMachineSeeAllButton_CandyMachineExpress.graphql";
import ButtonWithText from "components/buttons/ButtonWithText";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ColorValue from "types/enums/ColorValue";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import useSeriesLinkRelativeForSeriesExpress from "hooks/useSeriesLinkRelativeForSeriesExpress";
import { CandyMachineMintPhase } from "@formfunction-hq/formfunction-candy-machine";
import useCandyMachineIsSoldOut from "hooks/candy-machine/useCandyMachineIsSoldOut";

const candyMachineFragment = graphql`
  fragment CandyMachineSeeAllButton_CandyMachineExpress on CandyMachineExpress {
    Series {
      ...useSeriesLinkRelativeForSeriesExpress_SeriesExpress
    }
    ...useCandyMachineIsSoldOut_CandyMachineExpress
    ...useCandyMachineMintPhase_CandyMachineExpress
  }
`;

type Props = {
  candyMachine: CandyMachineSeeAllButton_CandyMachineExpress$key;
};

export default function CandyMachineSeeAllButton({ candyMachine }: Props) {
  const candyMachineData = useFragment(candyMachineFragment, candyMachine);
  const seriesLink = useSeriesLinkRelativeForSeriesExpress(
    candyMachineData.Series
  );
  const isSoldOut = useCandyMachineIsSoldOut(candyMachineData);
  const mintPhase = useCandyMachineMintPhase(candyMachineData);
  const isSaleExpired = mintPhase === CandyMachineMintPhase.Expired;
  const soldOutOrExpired = isSoldOut || isSaleExpired;

  return (
    <ButtonWithText
      icon={
        soldOutOrExpired ? undefined : (
          <ArrowRightIcon colorValue={ColorValue.BrightPurple} size={24} />
        )
      }
      buttonTheme={
        soldOutOrExpired || isSoldOut
          ? ButtonTheme.PurpleGradient
          : ButtonTheme.BrightPurpleOutline
      }
      fontClass={FontClass.NavLink}
      href={seriesLink}
      type="link_internal"
    >
      Buy on secondary
    </ButtonWithText>
  );
}
