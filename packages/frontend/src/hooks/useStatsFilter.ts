import { Dispatch, SetStateAction, useState } from "react";
import { Duration } from "dayjs/plugin/duration";
import { useNavigate } from "react-router-dom";
import getUrlWithParam from "utils/getUrlWithParam";
import getUrlParam from "utils/getUrlParam";
import useListenForParamChange from "hooks/useListenForParamChange";
import StatsDuration from "types/enums/StatsDuration";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

const URL_PARAM_KEY = "timeSpan";

function getDurationFromStatsDurationEnum(
  durations: Array<Duration>,
  statsDuration: StatsDuration
) {
  switch (statsDuration) {
    case StatsDuration.OneDay:
      return durations[0];
    case StatsDuration.SevenDays:
      return durations[1];
    case StatsDuration.ThirtyDays:
      return durations[2];
    case StatsDuration.AllTime:
      return durations[3];
    default:
      return assertUnreachable(statsDuration);
  }
}

export default function useStatsFilter(
  durations: Array<Duration>,
  initialDuration: StatsDuration
): [Duration, number, Dispatch<SetStateAction<string>>] {
  const navigate = useNavigate();
  // The duration url param is the `.toJSON()` code (P1D, P1M, etc)
  const initialFilter = getUrlParam(URL_PARAM_KEY) ?? "";
  const defaultFilter = getDurationFromStatsDurationEnum(
    durations,
    initialDuration
  );
  const [filter, setFilter] = useState(initialFilter ?? defaultFilter.toJSON());
  const durationsJsonMap = durations.reduce<
    Map<string, { duration: Duration; index: number }>
  >((durationMap, duration, index) => {
    durationMap.set(duration.toJSON(), { duration, index });
    return durationMap;
  }, new Map());

  useListenForParamChange({
    defaultValue: defaultFilter.toJSON(),
    onChange: setFilter,
    paramKey: URL_PARAM_KEY,
    validValues: [...durationsJsonMap.keys()],
  });

  return [
    durationsJsonMap.get(filter)?.duration ?? defaultFilter,
    durationsJsonMap.get(filter)?.index ?? 3,
    (val) => {
      navigate(getUrlWithParam(URL_PARAM_KEY, val as string));
    },
  ];
}
