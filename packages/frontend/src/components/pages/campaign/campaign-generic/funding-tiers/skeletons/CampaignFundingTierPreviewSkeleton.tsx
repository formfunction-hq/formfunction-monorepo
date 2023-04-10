import SquareContainer from "components/containers/SquareContainer";
import CampaignFundingTierPreview from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierPreview";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { range } from "formfn-shared/dist/utils/range";
import Skeleton from "react-loading-skeleton";

export default function CampaignFundingTierPreviewSkeleton(): JSX.Element {
  const assets = range(3).map((i: number) => (
    <SquareContainer key={i}>
      <Skeleton height="100%" width="100%" />
    </SquareContainer>
  ));
  const description = (
    <>
      <Skeleton width="100%" />
      <Skeleton width="100%" />
    </>
  );
  const title = <Skeleton width="75%" />;

  return (
    <CampaignFundingTierPreview
      assets={assets}
      campaignSectionId=""
      description={description}
      title={title}
      setCampaignTab={emptyFunction}
    />
  );
}
