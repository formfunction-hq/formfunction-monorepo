import CampaignHeroAssetsAndActivity from "components/pages/campaign/campaign-generic/hero/CampaignHeroAssetsAndActivity";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

type Props = {
  activity: MaybeUndef<JSX.Element>;
  assets: Maybe<JSX.Element>;
  progressTowardsGoal: JSX.Element;
  top: JSX.Element;
};

export default function CampaignHero({
  activity,
  assets,
  progressTowardsGoal,
  top,
}: Props) {
  return (
    <div>
      {top}
      <CampaignHeroAssetsAndActivity
        activity={activity}
        assets={assets}
        progressTowardsGoal={progressTowardsGoal}
      />
    </div>
  );
}
