import { UnlockableCategory } from "hooks/__generated__/useListNftForSaleMutation.graphql";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";

export type UnlockableCategoryType = Exclude<
  UnlockableCategory,
  typeof RELAY_FUTURE_ADDED_VALUE
>;
