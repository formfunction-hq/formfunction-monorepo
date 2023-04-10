import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import isNumber from "formfn-shared/dist/utils/numbers/isNumber";

function getSorted(
  order: Maybe<Array<string>>,
  nfts: Array<ConvertNftToMetadataAccountType>
) {
  if (order == null) {
    return nfts;
  }

  const orderAsObject = Object.fromEntries(order.map((mint, i) => [mint, i]));
  return nfts.sort((a, b) => orderAsObject[a.mint] - orderAsObject[b.mint]);
}

export default function getSortedNfts(
  order: Maybe<Array<string>>,
  nfts: Array<ConvertNftToMetadataAccountType>,
  after: Maybe<string>,
  first: number,
  shouldLoop?: boolean
) {
  const sorted = getSorted(order, nfts);
  // If we're looping, take at most 1 less than the number of NFTs in the series
  // OR the `first` that was specified, whichever is smaller
  const take = shouldLoop === true ? Math.min(nfts.length - 1, first) : first;

  // If we should loop, just append the sorted list to the end of itself
  // and the remainder of the logic can stay the same
  const sortedNfts = shouldLoop === true ? [...sorted, ...sorted] : sorted;

  const afterNumber = after == null ? 0 : Number(after);
  if (isNumber(afterNumber)) {
    // After is either, a) null -- return everything
    //                  b) a number, return slice
    return sortedNfts.slice(afterNumber, afterNumber + take);
  }

  // Otherwise, after is a mint
  const afterIndex = sorted.findIndex(
    (metadataAccount) => metadataAccount.mint === after
  );

  return afterIndex !== -1
    ? sortedNfts.slice(afterIndex + 1, afterIndex + 1 + take)
    : sortedNfts.slice(0, take);
}
