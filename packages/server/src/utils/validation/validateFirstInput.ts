// TODO: lower this
// We currently query for 1000 editions
const MAX_FIRST = 1001;

/**
 * NOTE: for future connections, should use graphql-input-number
 */
export default function validateFirstInput(
  first: number,
  maxFirst = MAX_FIRST
): void {
  if (first > maxFirst) {
    throw new Error(`Found first = ${first}; cannot be more than ${maxFirst}`);
  }
}
