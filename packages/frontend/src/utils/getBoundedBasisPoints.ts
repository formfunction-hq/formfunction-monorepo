import isNumber from "formfn-shared/dist/utils/numbers/isNumber";

export default function getBoundedBasisPoints(royalties: string) {
  // Default is 5%
  const defaultBp = 500;

  if (!isNumber(royalties)) {
    return defaultBp;
  }

  const royaltiesNum = Number(royalties);
  if (royaltiesNum < 0) {
    return defaultBp;
  }
  if (royaltiesNum > 20) {
    return defaultBp;
  }
  return Math.trunc(royaltiesNum * 100);
}
