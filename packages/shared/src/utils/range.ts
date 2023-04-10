/* eslint-disable no-redeclare */

export function range(stop: number, _unused?: undefined): Array<number>;
export function range(start: number, stop: number): Array<number>;
export function range(stopOrStart: number, stop?: number): Array<number> {
  if (stop == null) {
    // stopOrStart is stop
    return [...Array(stopOrStart).keys()];
  }

  // stopOrStart is start
  if (stop <= stopOrStart) {
    return [];
  }

  return [...Array(stop - stopOrStart).keys()].map((num) => num + stopOrStart);
}
