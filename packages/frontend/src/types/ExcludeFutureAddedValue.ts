import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";

export type ExcludeFutureAddedValue<T> = Exclude<
  T,
  typeof RELAY_FUTURE_ADDED_VALUE
>;
