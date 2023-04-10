/* eslint-disable no-await-in-loop */
import { PublicKey } from "@solana/web3.js";
import {
  Maybe,
  MaybeUndef,
  Undef,
} from "formfn-shared/dist/types/UtilityTypes";
import arrayLast from "formfn-shared/dist/utils/array/arrayLast";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

export const CONFIRMED_SIGNATURES_LIMIT = 1_000;
export const MAX_ITERS = 1_000;

async function getConfirmedSignaturesBefore(
  address: PublicKey,
  before: Undef<string>,
  includeFailedTransactions: boolean
): Promise<{
  lastSignature: Maybe<string>;
  signatures: Array<string>;
}> {
  const sigs = (
    await ConnectionWrapper.getConfirmedSignaturesForAddress2(address, {
      before,
      limit: CONFIRMED_SIGNATURES_LIMIT,
    })
  ).filter((sig) => (includeFailedTransactions ? true : sig.err == null));

  return {
    lastSignature: arrayLast(sigs)?.signature ?? null,
    signatures: sigs.map(({ signature }) => signature),
  };
}

export default async function getConfirmedSignaturesForAddress(
  address: PublicKey,
  limit = 1000,
  includeFailedTransactions = false,
  beforeInitial?: MaybeUndef<string>
): Promise<Array<string>> {
  if (limit > MAX_ITERS * CONFIRMED_SIGNATURES_LIMIT) {
    // If we find a limit that is too big, it is not a critical error, so just log it instead
    // of throwing.
    logError(
      AnalyticsEvent.GetConfirmedSignaturesForAddressLimitExceeded,
      `limit cannot exceed ${
        MAX_ITERS * CONFIRMED_SIGNATURES_LIMIT
      } (found limit = ${limit})`,
      null,
      {
        address: address.toString(),
        beforeInitial,
        includeFailedTransactions,
        limit,
      }
    );
  }

  let before: MaybeUndef<string> = beforeInitial;
  const signatures: Array<string> = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < MAX_ITERS; i++) {
    const { signatures: signaturesInner, lastSignature } =
      await getConfirmedSignaturesBefore(
        address,
        before ?? undefined,
        includeFailedTransactions
      );

    if (signaturesInner.length === 0) {
      return signatures;
    }

    signatures.push(...signaturesInner);

    if (signatures.length >= limit) {
      return signatures.slice(0, limit);
    }

    before = lastSignature;
  }

  return signatures;
}
