import ExploreAvailabilityV2 from "types/enums/ExploreAvailabilityV2";

export default function getAvailabilitySetFromUrlParam(
  urlParamVal: string
): Set<ExploreAvailabilityV2> {
  const availabilityList = urlParamVal.split(",") || [];
  return new Set(
    availabilityList.filter(
      (val) => val in ExploreAvailabilityV2
    ) as Array<ExploreAvailabilityV2>
  );
}
